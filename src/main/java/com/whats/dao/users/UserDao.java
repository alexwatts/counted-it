package com.whats.dao.users;

import com.whats.service.user.User;

public interface UserDao {

    void saveUser(User user);

    boolean checkUsernameExists(String username);

}
