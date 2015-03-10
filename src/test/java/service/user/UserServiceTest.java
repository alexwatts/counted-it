package service.user;

import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalMemcacheServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.util.Closeable;
import com.whats.model.Count;
import com.whats.model.User;
import com.whats.service.user.UserServiceImpl;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.util.Assert;

public class UserServiceTest {

    //Instance under test
    private UserServiceImpl userService = new UserServiceImpl();

    private Objectify objectify;

    private Closeable objectifyClosable;

    private final LocalServiceTestHelper helper = new LocalServiceTestHelper(
            new LocalDatastoreServiceTestConfig(),
            new LocalMemcacheServiceTestConfig());

    public UserServiceTest() {
        ObjectifyService.register(User.class);
    }

    @Before
    public void setUp() {
        helper.setUp();
        objectifyClosable = ObjectifyService.begin();
        objectify = ObjectifyService.ofy();
        userService.setObjectify(objectify);
    }

    @After
    public void tearDown() {
        helper.tearDown();
        objectifyClosable.close();
    }

    @Test
    public void testThatNewUserCreatedAndCanBeRetrieved() {

        //GIVEN
        userService.createUser("new-user");

        //WHEN
        User user = userService.getUser("new-user");

        //THEN
        Assert.notNull(user, "User was not retrieved");

    }

    @Test
    public void testThatCountKeysAreAddedToUser() {

        //GIVEN
        User alex = userService.createUser("alex");
        userService.addCountKeyToUser(alex, Key.create(Count.class, 1L));

        //WHEN
        User user = userService.getUser("alex");

        //THEN
        Assert.state(user.getCountKeys().size() == 1L, "Key was not retrieved");
        Assert.state(user.getCountKeys().get(0).getId() == 1L, "Key ID was not 1L");

    }

}
