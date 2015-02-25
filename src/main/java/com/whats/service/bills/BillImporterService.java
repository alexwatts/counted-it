package com.whats.service.bills;

import com.whats.service.htmlparse.HtmlParseService;
import com.whats.service.urlfetch.URLFetchService;

import java.util.List;

public interface BillImporterService {

    List<Bill> getBillsInSchedule(String location);

    void setUrlFetchService(URLFetchService urlFetchService);

    void setHtmlParseService(HtmlParseService htmlParseService);

}
