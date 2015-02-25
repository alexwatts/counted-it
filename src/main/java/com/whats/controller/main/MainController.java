package com.whats.controller.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import java.util.logging.Logger;

@Controller
@RequestMapping("/")
public class MainController {

    Logger LOGGER = Logger.getLogger(this.getClass().getName());

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView refresh() {
        return new ModelAndView("index");
    }

    @RequestMapping(value = "login", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView login() {
        return new ModelAndView("login");
    }

}