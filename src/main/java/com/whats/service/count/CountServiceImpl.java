package com.whats.service.count;

import com.googlecode.objectify.Key;
import com.whats.model.Count;
import com.whats.model.CountDetails;
import com.whats.service.BaseObjectifyService;

import java.util.Collection;
import java.util.List;

public class CountServiceImpl extends BaseObjectifyService implements CountService {

    public Count createCount(String countType, String countName) {
        Count count = new Count();
        count.setCountType(countType);
        count.setCountName(countName);
        getObjectify().save().entity(count).now();
        return count;
    }

    public void deleteCount(Long countId) {

        //This ain't transaction, but it needs to be.

        Count loadedCount = getObjectify().load().key(Key.create(Count.class, countId)).now();

        CountDetails countDetails = getObjectify().load().key(loadedCount.getCountDetailsKey()).now();

        //Delete the Value records
        if (countDetails.getCountDetailsValueKeys() != null && !countDetails.getCountDetailsValueKeys().isEmpty()) {
            getObjectify().delete().keys(countDetails.getCountDetailsValueKeys()).now();
        }

        //Delete the count detail record
        getObjectify().delete().key(loadedCount.getCountDetailsKey()).now();

        //Delete count record
        getObjectify().delete().key(Key.create(Count.class, countId)).now();

    }

    public Count getCount(Long id) {
        //Load existing user with its key
        Key<Count> rootKey = Key.create(Count.class, id);
        Count count = getObjectify().load().key(rootKey).now();
        return count;
    }

    public Collection<Count> getCountList(List<Key<Count>> keys) {
        Collection<Count> counts = getObjectify().load().keys(keys).values();
        return counts;
    }

    public void addCountDetailsKeyToCount(Count creatingCount, Key countDetailsKey) {
        Count count = getCount(creatingCount.getId());
        count.setCountDetailsKey(countDetailsKey);
        getObjectify().save().entity(count).now();
    }

}
