package com.whats.service.bills;

import com.whats.dao.bills.BillDao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillServiceImpl implements BillService {

    private BillDao billDao;

    public List<Bill> getBills() {
        return billDao.getBills();
    }

    public Bill getBill(Long id) { return billDao.getBill(id); }

    public void setBillDao(BillDao billDao) {
        this.billDao = billDao;
    }
}
