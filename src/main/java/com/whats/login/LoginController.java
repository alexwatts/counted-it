package com.whats.login;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.appengine.repackaged.org.codehaus.jackson.JsonParseException;
import com.whats.service.urlfetch.URLFetchService;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.logging.Logger;

@Controller
@RequestMapping("/janrain/token")
public class LoginController {

    private static String RPX_HOST = "http://whatswhats.rpxnow.com";

    private static String API_KEY = "5c8660f8920b9829d792b69ee84cea66fa8af25c";

    private URLFetchService urlFetchService;

    private ObjectMapper objectMapper;

    private UserService userService = UserServiceFactory.getUserService();

    Logger LOGGER = Logger.getLogger(this.getClass().getName());

    @RequestMapping(method = RequestMethod.POST)
    public ModelAndView login(HttpServletRequest request, HttpServletResponse response) {

        JanrainAuth janrainAuth = null;

        try {

            LOGGER.info("Janran login signal recieved");
            String token = request.getParameter("token");
            String janrainAuthResponse =
                    urlFetchService.getDocumentAsString(
                            RPX_HOST + "/api/v2/auth_info?token=" + token + "&apiKey=" + API_KEY);
            LOGGER.info("response from janrain: " + janrainAuthResponse);
            janrainAuth = objectMapper.readValue(janrainAuthResponse, JanrainAuth.class);

            //Do a normal login here instead
            springSecurityLogin(janrainAuth);

            //Put the Auth object in the session
            request.getSession().setAttribute("auth", janrainAuth);

            SavedRequest savedRequest =
                    new HttpSessionRequestCache().getRequest(request, response);

            if (savedRequest != null) {
                response.sendRedirect(savedRequest.getRedirectUrl());
            }

            LOGGER.info("token value was: " + token);
        } catch (JsonParseException e) {
            LOGGER.info("Failed to parse JSON Response");
            throw new RuntimeException("Login failed.", e);
        } catch (IOException e) {
            LOGGER.info("Failed to parse JSON Response");
            throw new RuntimeException("Login failed.", e);
        }

        ModelAndView modelAndView = new ModelAndView("index");

        try {
            modelAndView.addObject("auth", objectMapper.writeValueAsString(janrainAuth));
        } catch (Exception e) {

        }

        return modelAndView;

    }

    private void springSecurityLogin(JanrainAuth janrainAuth) {
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(
                        janrainAuth.getProfile().getIdentifier(),
                        "",
                        Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"))));
    }

    public void setUrlFetchService(URLFetchService urlFetchService) {
        this.urlFetchService = urlFetchService;
    }

    public void setObjectMapper(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }
}