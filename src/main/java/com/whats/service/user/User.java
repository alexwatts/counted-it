package com.whats.service.user;

public class User {

    public User(
            String username,
            String password,
            String firstName,
            String lastName,
            String postcode,
            Boolean social) {

        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.postcode = postcode;
        this.social = social;
    }

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String postcode;
    private Boolean social;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPostcode() {
        return postcode;
    }

    public Boolean getSocial() {
        return social;
    }

}
