package com.whats.dao.users;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.whats.counter.ShardedCounter;
import com.whats.dao.bills.BillDao;
import com.whats.service.bills.Bill;
import com.whats.service.user.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDaoImpl implements UserDao {

    public void saveUser(User user) {

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

        Entity entity = new Entity("User");
        entity.setProperty("username", user.getUsername());
        entity.setProperty("password", user.getPassword());
        entity.setProperty("firstName", user.getFirstName());
        entity.setProperty("lastName", user.getLastName());
        entity.setProperty("postcode", user.getPostcode());
        entity.setProperty("social", user.getSocial());

        datastore.put(entity);

    }

    public boolean checkUsernameExists(String username) {

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

        Query.Filter userNameFilter =
                new Query.FilterPredicate("userName",
                        Query.FilterOperator.EQUAL,
                        username);

        Query q = new Query("User").setFilter(userNameFilter);

        PreparedQuery pq = datastore.prepare(q);

        List<Entity> results = pq.asList(FetchOptions.Builder.withLimit(1));

        return results.size() > 0;
    }

}
