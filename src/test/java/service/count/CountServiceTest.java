package service.count;

import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalMemcacheServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.util.Closeable;
import com.whats.model.Count;
import com.whats.model.CountDetails;
import com.whats.model.User;
import com.whats.service.count.CountServiceImpl;
import com.whats.service.user.UserServiceImpl;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.util.Assert;

import java.util.Arrays;
import java.util.Collection;


public class CountServiceTest {

    //Instance under test
    private CountServiceImpl countService = new CountServiceImpl();

    private Objectify objectify;

    private Closeable objectifyClosable;

    private final LocalServiceTestHelper helper = new LocalServiceTestHelper(
            new LocalDatastoreServiceTestConfig(),
            new LocalMemcacheServiceTestConfig());

    public CountServiceTest() {
        ObjectifyService.register(Count.class);
        ObjectifyService.register(User.class);
    }

    @Before
    public void setUp() {
        helper.setUp();
        objectifyClosable = ObjectifyService.begin();
        objectify = ObjectifyService.ofy();
        countService.setObjectify(objectify);
    }

    @After
    public void tearDown() {
        helper.tearDown();
        objectifyClosable.close();
    }

    @Test
    public void testThatNewCountCanBeCreatedAndCanBeRetrieved() {

        //GIVEN
        Long countId = countService.createCount("test-type", "test-name").getId();

        //WHEN
        Count count = countService.getCount(countId);

        //THEN
        Assert.notNull(count, "Count was not retrieved");
    }

    @Test
    public void testThatNewCountListCanBeRetrieved() {

        //GIVEN
        Long countId = countService.createCount("test-type", "test-name").getId();

        //WHEN
        Collection<Count> counts = countService.getCountList(Arrays.asList(Key.create(Count.class, countId)));

        //THEN
        Assert.notEmpty(counts, "Count was not retrieved");
    }

    @Test
    public void testThatCountDetailsKeysAreAddedToCount() {

        //GIVEN
        Count count = countService.createCount("test", "alex");
        countService.addCountDetailsKeyToCount(count, Key.create(CountDetails.class, 1L) );

        //WHEN
        Count countToTest = countService.getCount(count.getId());

        //THEN
        Assert.notNull(countToTest.getCountDetailsKey(), "Key was not retrieved");
        Assert.state(countToTest.getCountDetailsKey().getId() == 1L, "Key ID was not 1L");

    }


}
