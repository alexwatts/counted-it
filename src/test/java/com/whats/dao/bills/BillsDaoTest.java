package com.whats.dao.bills;

import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.whats.service.bills.Bill;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class BillsDaoTest {

    private final LocalServiceTestHelper helper =
            new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

    private BillDao billDao = new BillDaoImpl();

    @Before
    public void setUp() {
        helper.setUp();
    }

    @After
    public void tearDown() {
        helper.tearDown();
    }

    @Test
    public void doTest() {
        Bill bill = new Bill("test", "test", "test");
        Assert.assertFalse("Bill should not exist", billDao.checkExists(bill));
        billDao.saveBill(bill);
        Assert.assertTrue("Bill should exist", billDao.checkExists(bill));
    }

}
