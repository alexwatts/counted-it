package com.whats.service.urlfetch;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

public class URLFetchServiceImpl implements URLFetchService {

    /**
     * Uses a URL object to obtain a docuemnt from an external URI
     * @param location the location of the external document
     * @return a String based representation of the document
     */
    public String getDocumentAsString(String location) {

        try {
            URL url = new URL(location);
            BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));
            String line;

            String document = "";
            while ((line = reader.readLine()) != null) {
                document += line;
            }
            reader.close();
            return document;

        } catch (MalformedURLException e) {
            throw new RuntimeException("Was unable to fetch bills URL", e);

        } catch (IOException e) {
            throw new RuntimeException("Was unable to read bills data", e);
        }

    }
}
