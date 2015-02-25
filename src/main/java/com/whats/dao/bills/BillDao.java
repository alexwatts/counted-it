package com.whats.dao.bills;

import com.whats.service.bills.Bill;

import java.util.List;

public interface BillDao {

    void saveBill(Bill bill);

    boolean checkExists(Bill bill);

    List<Bill> getBills();

    Bill getBill(Long id);

}
