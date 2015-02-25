package com.whats.controller.bills;

import com.whats.counter.ShardedCounter;
import com.whats.service.bills.Bill;
import com.whats.service.bills.BillRefreshService;
import com.whats.service.bills.BillService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.logging.Logger;

@Controller
@RequestMapping("/bills")
public class BillController {

    Logger LOGGER = Logger.getLogger(this.getClass().getName());

    private BillRefreshService billRefreshService;

    private BillService billService;

    @RequestMapping(value="/refresh", method = RequestMethod.GET)
    @ResponseBody
    public List<Bill> refresh() {

        LOGGER.info("starting refresh job.");
        billRefreshService.refreshBills("http://services.parliament.uk/bills");
        LOGGER.info("Refresh done.");
        return billService.getBills();
    }


    @RequestMapping(value="/bill/{billId}/vote", method = RequestMethod.GET)
    @ResponseBody
    public void vote(
            @PathVariable Long billId,
            @RequestParam Boolean vote) {

        LOGGER.info("Vote for bill ID-" + billId);

        ShardedCounter voteCounter =
                new ShardedCounter(vote ? Bill.FOR_PREFIX : Bill.AGAINST_PREFIX, billId.toString());
        voteCounter.increment();

        LOGGER.info("Vote Processed for bill ID-" + billId);

    }

    @RequestMapping(value="/bill/{billId}", method = RequestMethod.GET)
    @ResponseBody
    public Bill getBill(
            @PathVariable Long billId) {

        return billService.getBill(billId);

    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Bill> getBills() {
        return billService.getBills();
    }

    public void setBillRefreshService(BillRefreshService billRefreshService) {
        this.billRefreshService = billRefreshService;
    }

    public void setBillService(BillService billService) {
        this.billService = billService;
    }
}