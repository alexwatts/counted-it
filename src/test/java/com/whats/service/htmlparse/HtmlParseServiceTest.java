package com.whats.service.htmlparse;

import com.whats.service.urlfetch.URLFetchService;
import com.whats.service.urlfetch.URLFetchServiceImpl;
import org.jsoup.nodes.Element;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.List;

@RunWith(MockitoJUnitRunner.class)
public class HtmlParseServiceTest {

    //Instance under test
    private HtmlParseService htmlParseService = new HtmlParseServiceImpl();

    @Test
    public void testThatWhenGetDocumentCalledThatDocumentRetreived() {

        String htmlDoc = "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head>\n" +
                "<title>Title of the document</title>\n" +
                "</head>\n" +
                "\n" +
                "<body>\n" +
                "<li class='alex'>\n" +
                "<li class='alex'>\n" +
                "<li class='alex'>\n" +
                "<li class='alex'>\n" +
                "<li class='alex'>\n" +
                "The content of the document......\n" +
                "</body>\n" +
                "\n" +
                "</html>";

        List<Element> elements = htmlParseService.parseAndSelectElementsFromHTML(htmlDoc, ".alex");

        Assert.assertEquals("Should be 5 elements", 5, elements.size());

    }

}
