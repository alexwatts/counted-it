package com.whats.model;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Entity
public class User {

    @Id
    private
    String id;

    private List<Key<Count>> countKeys;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Key<Count>> getCountKeys() {
        return countKeys;
    }

    public void addCount(Key<Count> count) {
        if (countKeys == null) {
            countKeys = new ArrayList<Key<Count>>();
        }
        countKeys.add(count);
    }

}
