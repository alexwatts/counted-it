package com.whats.controller.main;

import com.googlecode.objectify.Key;
import com.whats.login.JanrainAuth;
import com.whats.model.Count;
import com.whats.model.CountDetails;
import com.whats.model.CountDetailsValue;
import com.whats.model.User;
import com.whats.service.count.CountService;
import com.whats.service.countdetails.CountDetailsService;
import com.whats.service.user.UserService;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Collection;
import java.util.List;
import java.util.logging.Logger;

import static org.springframework.http.HttpStatus.OK;

@Controller
@RequestMapping("/")
public class CountController {

    Logger LOGGER = Logger.getLogger(this.getClass().getName());

    private ObjectMapper objectMapper;

    private CountService countService;

    private CountDetailsService countDetailsService;

    private UserService userService;

    @RequestMapping(value = "data/count", method = RequestMethod.POST, produces = "application/json")
    @ResponseStatus(value = OK)
    @ResponseBody
    public Count createCount(
            HttpServletRequest request,
            @RequestBody Count count) {

        JanrainAuth auth = (JanrainAuth)request.getSession().getAttribute("auth");

        //Create the count object
        Count createdCount = countService.createCount(count.getCountType(), count.getCountName());

        //Create the details object
        createdCount.setCountDetailsKey(
                Key.create(CountDetails.class,
                        countDetailsService.createCountDetails().
                                getId()));

        //Create the user count key
        User user = userService.getUser(auth.getProfile().getIdentifier());
        user.addCount(Key.create(Count.class, createdCount.getId()));

        return createdCount;

    }

    @RequestMapping(value = "data/my-counts", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    @ResponseStatus(value = OK)
    public Collection<Count> myCounts(HttpServletRequest request) {

        JanrainAuth auth = (JanrainAuth)request.getSession().getAttribute("auth");
        List<Key<Count>> myCountKeys = userService.getUser(auth.getProfile().getIdentifier()).getCountKeys();

        if (myCountKeys != null && !myCountKeys.isEmpty()) {
            return countService.getCountList(myCountKeys);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "data/count/{countId}/details", method = RequestMethod.GET)
    @ResponseBody
    public CountDetails countDetails(
            @PathVariable Long countId) {

        Count count = countService.getCount(countId);
        CountDetails countDetails = countDetailsService.getCountDetails(count.getCountDetailsKey().getId());

        if (countDetails.getCountDetailsValueKeys() != null && !countDetails.getCountDetailsValueKeys().isEmpty()) {
            Collection<CountDetailsValue> values =
                    countDetailsService.getCountDetailsValueList(countDetails.getCountDetailsValueKeys());

            countDetails.setCountDetailsValues(values);
        }

        return countDetails;
    }

    @RequestMapping(value = "data/count/{countId}/details", method = RequestMethod.POST)
    @ResponseBody
    public CountDetailsValue createCountValueForDetails(
            @PathVariable Long countId,
            @RequestBody CountDetailsValue countDetailsValue) {

        Count count = countService.getCount(countId);
        CountDetails countDetails = countDetailsService.getCountDetails(count.getCountDetailsKey().getId());
        CountDetailsValue createdCountDetailsValue = countDetailsService.createCountDetailsValue(countDetailsValue.getDate(), countDetailsValue.getValue());
        countDetailsService.addCountDetailsValueKeyToCountDetails(
                countDetails, Key.create(CountDetailsValue.class, createdCountDetailsValue.getId()));

        return createdCountDetailsValue;

    }

    @RequestMapping(value = "data/count/{countId}/details", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteCountValueForDetails(
            @PathVariable Long countId,
            @RequestParam(required = true) Long detailsValueId) {

        Count count = countService.getCount(countId);
        CountDetails countDetails = countDetailsService.getCountDetails(count.getCountDetailsKey().getId());

        countDetailsService.deleteCountDetailsValue(count.getCountDetailsKey(),
                Key.create(CountDetailsValue.class, detailsValueId));

    }

    public void setObjectMapper(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public void setCountService(CountService countService) {
        this.countService = countService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public void setCountDetailsService(CountDetailsService countDetailsService) {
        this.countDetailsService = countDetailsService;
    }

}