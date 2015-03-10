package com.whats.service.user;

import com.googlecode.objectify.Key;

import com.whats.model.User;
import com.whats.service.BaseObjectifyService;

public class UserServiceImpl extends BaseObjectifyService implements UserService {

    public User createUser(String identifier) {
        User newUser = new User();
        newUser.setId(identifier);
        getObjectify().save().entity(newUser).now();
        return newUser;
    }

    public User getUser(String identifier) {
        //Load existing user with its key
        Key<User> rootKey = Key.create(User.class, identifier);
        User user = getObjectify().load().key(rootKey).now();
        return user;
    }

    public void addCountKeyToUser(User creatingUser, Key countKey) {
        User user = getUser(creatingUser.getId());
        user.addCount(countKey);
        getObjectify().save().entity(user).now();
    }

}
