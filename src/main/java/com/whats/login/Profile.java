package com.whats.login;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Profile {

    public Profile() {

    }

    private String identifier;

    private String email;

    private String preferredUserName;

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPreferredUserName() {
        return preferredUserName;
    }

    public void setPreferredUserName(String preferredUserName) {
        this.preferredUserName = preferredUserName;
    }
}
