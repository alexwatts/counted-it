package com.whats.model;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Ignore;
import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
public class CountDetails {

    //We want this auto-generated so use Long type
    @Id
    private
    Long id;

    @JsonIgnore
    private Key<CountDetails> countDetailsKey;

    @JsonIgnore
    private List<Key<CountDetailsValue>> countDetailsValueKeys;

    @Ignore
    private Collection<CountDetailsValue> countDetailsValues = new ArrayList<CountDetailsValue>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void addCountDetailsValue(Key<CountDetailsValue> countDetailsValue) {
        if (getCountDetailsValueKeys() == null) {
            countDetailsValueKeys = new ArrayList<Key<CountDetailsValue>>();
        }
        getCountDetailsValueKeys().add(countDetailsValue);
    }


    public List<Key<CountDetailsValue>> getCountDetailsValueKeys() {
        return countDetailsValueKeys;
    }

    public Collection<CountDetailsValue> getCountDetailsValues() {
        return countDetailsValues;
    }

    public void setCountDetailsValues(Collection<CountDetailsValue> countDetailsValues) {
        this.countDetailsValues = countDetailsValues;
    }
}
