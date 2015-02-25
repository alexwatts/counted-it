package com.whats.service.bills;
import java.util.ArrayList;
import java.util.List;

import com.whats.service.htmlparse.HtmlParseService;
import com.whats.service.urlfetch.URLFetchService;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

@Service
public class BillImporterServiceImpl implements BillImporterService {

    private URLFetchService urlFetchService;

    private HtmlParseService htmlParseService;

    /**
     * Uses the App Engine FetchURL API to get the list of bills from the
     * specified URL. The format of the site DOM is assumed and is coded into
     * parsing rules of this algorithm.
     * @param location the location of the URI containing the bills
     * @return
     */
    public List<Bill> getBillsInSchedule(String location) {
        return extractBillsFromDocument(urlFetchService.getDocumentAsString(location));
    }

    private List<Bill> extractBillsFromDocument(String document) {
        List<Bill> bills = new ArrayList<>();

        List<Element> billElements =
                htmlParseService.parseAndSelectElementsFromHTML(document, ".tr1, .tr2");

        for (Element billElement: billElements) {
            List<Element> fields = billElement.select("td");
            String house = fields.get(0).select("img").attr("title");
            String name = fields.get(1).select("a").html();
            String lastUpdated = fields.get(2).html();
            Bill billRaw = new Bill(house, name, lastUpdated);
            bills.add(billRaw);
        }

        return bills;
    }

    public void setUrlFetchService(URLFetchService urlFetchService) {
        this.urlFetchService = urlFetchService;
    }

    public void setHtmlParseService(HtmlParseService htmlParseService) {
        this.htmlParseService = htmlParseService;
    }
}
