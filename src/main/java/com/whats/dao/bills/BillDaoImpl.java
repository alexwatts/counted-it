package com.whats.dao.bills;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.whats.counter.ShardedCounter;
import com.whats.service.bills.Bill;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BillDaoImpl implements BillDao {


    public void saveBill(Bill bill) {

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

        Entity employee = new Entity("Bill");

        employee.setProperty("currentHouse", bill.getCurrentHouse());
        employee.setProperty("name", bill.getName());
        employee.setProperty("lastUpdated", bill.getLastUpdated());

        datastore.put(employee);

    }

    public boolean checkExists(Bill bill) {

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

        Query.Filter houseFilter =
                new Query.FilterPredicate("currentHouse",
                        Query.FilterOperator.EQUAL,
                        bill.getCurrentHouse());

        Query.Filter nameFilter =
                new Query.FilterPredicate("name",
                        Query.FilterOperator.EQUAL,
                        bill.getName());

        Query.Filter existsFilter =
                Query.CompositeFilterOperator.and(houseFilter, nameFilter);

        Query q = new Query("Bill").setFilter(existsFilter);

        PreparedQuery pq = datastore.prepare(q);

        List<Entity> results = pq.asList(FetchOptions.Builder.withLimit(1));

        return results.size() > 0;
    }

    public Bill getBill(Long id) {

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        try {
            Entity bill = datastore.get(KeyFactory.createKey("Bill", id));

            long forCount = new ShardedCounter(
                    Bill.FOR_PREFIX, new Long(bill.getKey().getId()).toString()).getCount();
            long againstCount = new ShardedCounter(
                    Bill.AGAINST_PREFIX, new Long(bill.getKey().getId()).toString()).getCount();

            return new Bill(
                    bill.getKey().getId(),
                    (String)bill.getProperty("currentHouse"),
                    (String)bill.getProperty("name"),
                    (String)bill.getProperty("lastUpdated"),
                    forCount,
                    againstCount);

        } catch (EntityNotFoundException e) {
            throw new RuntimeException("Bill was not found", e);
        }



    }

    public List<Bill> getBills() {

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

        List<Bill> bills = new ArrayList<>();

        Query q = new Query("Bill");
        PreparedQuery pq = datastore.prepare(q);
        List<Entity> results = pq.asList(FetchOptions.Builder.withLimit(1000));
        for (Entity entity: results) {
            Bill bill =
                    new Bill(
                            entity.getKey().getId(),
                            (String)entity.getProperty("currentHouse"),
                            (String)entity.getProperty("name"),
                            (String)entity.getProperty("lastUpdated"));
            bills.add(bill);
        }
        return bills;
    }

}
