package com.whats.login;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.logging.Logger;

@Controller
@RequestMapping("/api/v2/auth_info")
public class MockJanrainController {

    Logger LOGGER = Logger.getLogger(this.getClass().getName());

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET)
    public JanrainAuth login(@RequestParam String token) {

        JanrainAuth janrainAuth = new JanrainAuth();
        janrainAuth.setStat("OK");
        Profile profile = new Profile();
        profile.setEmail("alexw@gmail.com");
        profile.setIdentifier("alex@gmail.com");
        profile.setPreferredUserName("Alex");
        janrainAuth.setProfile(profile);

        return janrainAuth;

    }

}