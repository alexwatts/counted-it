package com.whats.service.bills;

import com.whats.dao.bills.BillDao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillRefreshServiceImpl implements BillRefreshService {

    private BillImporterService billImporterService;

    private BillDao billDao;

    public void refreshBills(String location) {
        List<Bill> bills = billImporterService.getBillsInSchedule(location);
        for (Bill bill: bills) {
            if (!billDao.checkExists(bill)) {
                billDao.saveBill(bill);
            }
        }
    }

    public void setBillImporterService(BillImporterService billImporterService) {
        this.billImporterService = billImporterService;
    }

    public void setBillDao(BillDao billDao) {
        this.billDao = billDao;
    }
}
