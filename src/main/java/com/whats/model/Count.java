package com.whats.model;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import org.codehaus.jackson.annotate.JsonIgnore;

@Entity
public class Count {

    //We want this auto-generated so use Long type
    @Id
    private
    Long id;

    @JsonIgnore
    private Key<CountDetails> countDetailsKey;

    private String countType;

    private String countName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCountType() {
        return countType;
    }

    public void setCountType(String countType) {
        this.countType = countType;
    }

    public String getCountName() {
        return countName;
    }

    public void setCountName(String countName) {
        this.countName = countName;
    }

    public Key<CountDetails> getCountDetailsKey() {
        return countDetailsKey;
    }

    public void setCountDetailsKey(Key<CountDetails> countDetailsKey) {
        this.countDetailsKey = countDetailsKey;
    }
}
