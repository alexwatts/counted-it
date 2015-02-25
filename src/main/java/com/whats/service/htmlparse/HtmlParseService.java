package com.whats.service.htmlparse;

import org.jsoup.nodes.Element;

import java.util.List;

public interface HtmlParseService {

    List<Element> parseAndSelectElementsFromHTML(String html, String selector);

}
