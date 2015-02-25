package com.whats.service.bills;

import com.whats.service.htmlparse.HtmlParseServiceImpl;
import com.whats.service.urlfetch.URLFetchServiceImpl;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.List;

@RunWith(MockitoJUnitRunner.class)
public class BillImporterServiceTest {

    private BillImporterService billImporterService = new BillImporterServiceImpl();

    @Before
    public void setUp() {
        billImporterService.setHtmlParseService(new HtmlParseServiceImpl());
        billImporterService.setUrlFetchService(new URLFetchServiceImpl());
    }

    @Test
    public void testThatWhenGetDocumentCalledThatDocumentRetreived() {

        List<Bill> bills = billImporterService.getBillsInSchedule("http://services.parliament.uk/bills");

        for (Bill billRaw: bills) {
            System.out.println(billRaw.getCurrentHouse() + " " + billRaw.getName().trim() + " " + billRaw.getLastUpdated());
        }

        Assert.assertTrue("Should be more that 5 bills", bills.size() > 5);
    }

}
