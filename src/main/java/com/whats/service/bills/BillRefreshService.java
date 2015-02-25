package com.whats.service.bills;

import com.whats.dao.bills.BillDao;
import com.whats.service.htmlparse.HtmlParseService;
import com.whats.service.urlfetch.URLFetchService;

import java.util.List;

public interface BillRefreshService {

    void refreshBills(String location) ;

    void setBillImporterService(BillImporterService billImporterService);

    void setBillDao(BillDao billDao);

}
