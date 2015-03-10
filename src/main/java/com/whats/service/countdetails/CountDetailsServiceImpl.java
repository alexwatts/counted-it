package com.whats.service.countdetails;

import com.googlecode.objectify.Key;
import com.whats.model.CountDetails;
import com.whats.model.CountDetailsValue;
import com.whats.service.BaseObjectifyService;

import java.util.Collection;
import java.util.List;

public class CountDetailsServiceImpl extends BaseObjectifyService implements CountDetailsService {

    public CountDetails createCountDetails() {
        CountDetails countDetails = new CountDetails();
        getObjectify().save().entity(countDetails).now();
        return countDetails;
    }

    public CountDetailsValue createCountDetailsValue(String date, String value) {
        CountDetailsValue countDetailsValue = new CountDetailsValue();
        countDetailsValue.setDate(date);
        countDetailsValue.setValue(value);
        getObjectify().save().entity(countDetailsValue).now();
        return countDetailsValue;
    }

    public Collection<CountDetailsValue> getCountDetailsValueList(List<Key<CountDetailsValue>> keys) {
        Collection<CountDetailsValue> countDetailsValues = getObjectify().load().keys(keys).values();
        return countDetailsValues;
    }

    public CountDetails getCountDetails(Long id) {
        //Load existing user with its key
        Key<CountDetails> rootKey = Key.create(CountDetails.class, id);
        CountDetails countdetails = getObjectify().load().key(rootKey).now();
        return countdetails;
    }

    public void addCountDetailsValueKeyToCountDetails(
            CountDetails creatingCountDetails, Key<CountDetailsValue> countDetailsValueKey) {

        CountDetails countDetails = getCountDetails(creatingCountDetails.getId());
        countDetails.addCountDetailsValue(countDetailsValueKey);
        getObjectify().save().entity(countDetails).now();
    }

    public CountDetails deleteCountDetailsValue(
            Key<CountDetails> countDetailsKey,
            Key<CountDetailsValue> keyToDelete) {

        getObjectify().delete().key(keyToDelete).now();

        CountDetails countDetails = getObjectify().load().key(countDetailsKey).now();
        countDetails.getCountDetailsValueKeys().remove(keyToDelete);
        getObjectify().save().entity(countDetails).now();

        return getObjectify().load().key(countDetailsKey).now();
    }

}
