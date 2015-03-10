package service.countdetails;

import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalMemcacheServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.util.Closeable;
import com.whats.model.Count;
import com.whats.model.CountDetails;
import com.whats.model.CountDetailsValue;
import com.whats.model.User;
import com.whats.service.countdetails.CountDetailsServiceImpl;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.util.Assert;

public class CountDetailsServiceTest {

    //Instance under test
    private CountDetailsServiceImpl countDetailsService = new CountDetailsServiceImpl();

    private Objectify objectify;

    private Closeable objectifyClosable;

    private final LocalServiceTestHelper helper = new LocalServiceTestHelper(
            new LocalDatastoreServiceTestConfig(),
            new LocalMemcacheServiceTestConfig());

    public CountDetailsServiceTest() {
        ObjectifyService.register(Count.class);
        ObjectifyService.register(User.class);
        ObjectifyService.register(CountDetails.class);
    }

    @Before
    public void setUp() {
        helper.setUp();
        objectifyClosable = ObjectifyService.begin();
        objectify = ObjectifyService.ofy();
        countDetailsService.setObjectify(objectify);
    }

    @After
    public void tearDown() {
        helper.tearDown();
        objectifyClosable.close();
    }

    @Test
    public void testThatNewCountDetailsCanCreatedAndCanBeRetrieved() {
        //GIVEN
        Long countId = countDetailsService.createCountDetails().getId();

        //WHEN
        CountDetails countDetails = countDetailsService.getCountDetails(countId);

        //THEN
        Assert.notNull(countDetails, "Count Details was not retrieved");
    }

    @Test
    public void testThatCountDetailsValueCanBeAddedToCountDetails() {
        //GIVEN
        CountDetails countDetails = countDetailsService.createCountDetails();
        countDetailsService.addCountDetailsValueKeyToCountDetails(countDetails, Key.create(CountDetailsValue.class, 1L));

        //WHEN
        CountDetails countDetailsToTest = countDetailsService.getCountDetails(countDetails.getId());

        //THEN
        Assert.notEmpty(countDetailsToTest.getCountDetailsValueKeys(), "Count Details was not retrieved");
        Assert.state(countDetailsToTest.getCountDetailsValueKeys().get(0).getId() == 1L, "Key ID was not 1");
    }


    @Test
    public void testThatCountDetailsValueCanBeDeleted() {
        //GIVEN
        CountDetails countDetails = countDetailsService.createCountDetails();
        countDetailsService.addCountDetailsValueKeyToCountDetails(countDetails, Key.create(CountDetailsValue.class, 1L));
        countDetailsService.deleteCountDetailsValue(Key.create(CountDetails.class, countDetails.getId()), Key.create(CountDetailsValue.class, 1L));

        //WHEN
        CountDetails countDetailsToTest = countDetailsService.getCountDetails(countDetails.getId());

        //THEN
        Assert.state(!countDetailsToTest.getCountDetailsValueKeys().contains(Key.create(CountDetailsValue.class, 1L)), "Value Key is still Present");
    }

}
