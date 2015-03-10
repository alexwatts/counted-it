package com.whats.service.user;

import com.whats.model.User;

public interface UserService {

    User createUser(String identifier);

    User getUser(String identifier);

}
