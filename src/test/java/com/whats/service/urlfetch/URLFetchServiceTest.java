package com.whats.service.urlfetch;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class URLFetchServiceTest {

    //Instance under test
    private URLFetchService billService = new URLFetchServiceImpl();

    @Test
    public void testThatWhenGetDocumentCalledThatDocumentRetreived() {
        String document = billService.getDocumentAsString("http://services.parliament.uk/bills");
        Assert.assertTrue("Document must contain some markup", document.contains("http://www.w3.org/1999/xhtml"));
    }

}
