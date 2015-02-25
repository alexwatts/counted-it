package com.whats.service.htmlparse;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;

import java.util.List;

public class HtmlParseServiceImpl implements HtmlParseService {

    public List<Element> parseAndSelectElementsFromHTML(String html, String selector) {
        return Jsoup.parse(html).select(selector);
    }
}
