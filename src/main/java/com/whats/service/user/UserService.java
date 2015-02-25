package com.whats.service.user;

import com.whats.dao.users.UserDao;

public interface UserService {

    void registerUser(User registration) throws UsernameExistsException;

    void setUserDao(UserDao userDao);

}
