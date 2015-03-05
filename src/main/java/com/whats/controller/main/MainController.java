package com.whats.controller.main;

import com.whats.login.JanrainAuth;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.logging.Logger;

@Controller
@RequestMapping("/")
public class MainController {

    Logger LOGGER = Logger.getLogger(this.getClass().getName());

    private ObjectMapper objectMapper;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView refresh(HttpServletRequest request) {

        ModelAndView modelAndView = new ModelAndView("index");

        try {
            modelAndView.addObject("auth",
                    objectMapper.writeValueAsString(request.getSession().getAttribute("auth")));
        } catch (Exception e) {

        }

        return modelAndView;
    }

    @RequestMapping(value = "profile", method = RequestMethod.GET)
    @ResponseBody
    public JanrainAuth getAuth(HttpServletRequest request) {

        return (JanrainAuth) request.getSession().getAttribute("auth");

    }

    @RequestMapping(value = "login", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView login() {
        return new ModelAndView("login");
    }

    @RequestMapping(value = "count", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView count() {
        return new ModelAndView("index");
    }

    @RequestMapping(value = "my-counts", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView myCounts() {
        return new ModelAndView("index");
    }

    @RequestMapping(value = "my-profile", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView myProfile() {
        return new ModelAndView("index");
    }

    @RequestMapping(value = "shared-counts", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView sharedCounts() {
        return new ModelAndView("index");
    }

    public void setObjectMapper(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

}