package com.whats.service;

import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyFactory;

import java.util.logging.Level;
import java.util.logging.Logger;

public class BaseObjectifyService {

    /**
     * A logger object.
     */
    private static final Logger LOG = Logger.getLogger(BaseObjectifyService.class.getName());

    private ObjectifyFactory objectifyFactory;

    private Objectify objectify;

    public Objectify getObjectify() {

        if (objectify == null) {

            try {
                objectify =  objectifyFactory.begin();
            } catch (Exception e) {
                LOG.log(Level.SEVERE, "Failed to get Objectify service", e);
            }

        }

        return objectify;
    }

    public void setObjectifyFactoryBean(ObjectifyFactory objectifyFactory) {
        this.objectifyFactory = objectifyFactory;
    }

    /**
     * For injection from tests
     */
    public void setObjectify(Objectify objectify) {
        this.objectify = objectify;
    }


}
