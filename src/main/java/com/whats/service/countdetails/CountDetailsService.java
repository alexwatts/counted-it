package com.whats.service.countdetails;

import com.googlecode.objectify.Key;
import com.whats.model.CountDetails;
import com.whats.model.CountDetailsValue;

import java.util.Collection;
import java.util.List;

public interface CountDetailsService {

    CountDetails createCountDetails();

    CountDetailsValue createCountDetailsValue(String date, String value);

    CountDetails getCountDetails(Long id);

    void addCountDetailsValueKeyToCountDetails(
            CountDetails creatingCountDetails, Key<CountDetailsValue> countDetailsValueKey);

    Collection<CountDetailsValue> getCountDetailsValueList(List<Key<CountDetailsValue>> keys);

    CountDetails deleteCountDetailsValue(
            Key<CountDetails> countDetailsKey,
            Key<CountDetailsValue> keyToDelete);

}
