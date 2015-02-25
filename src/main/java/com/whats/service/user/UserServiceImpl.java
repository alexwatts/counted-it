package com.whats.service.user;

import com.whats.dao.users.UserDao;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class UserServiceImpl implements UserService {

    private UserDao userDao;

    public void registerUser(User registration) throws UsernameExistsException {

        if (userDao.checkUsernameExists(registration.getUsername())) {

            throw new UsernameExistsException();

        } else {

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            User userWithDigestedPassword = new User(
                    registration.getUsername(),
                    encoder.encode(registration.getPassword()),
                    registration.getFirstName(),
                    registration.getLastName(),
                    registration.getPostcode(),
                    registration.getSocial());

            userDao.saveUser(userWithDigestedPassword);

        }
    }

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
}
