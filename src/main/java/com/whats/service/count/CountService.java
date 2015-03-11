package com.whats.service.count;

import com.googlecode.objectify.Key;
import com.whats.model.Count;
import com.whats.model.User;

import java.util.Collection;
import java.util.List;

public interface CountService {

    Count createCount(String countType, String countName);

    Count getCount(Long id);

    Collection<Count> getCountList(List<Key<Count>> keys);

    void addCountDetailsKeyToCount(Count creatingCount, Key countDetailsKey);

    void deleteCount(Long countId);

}
