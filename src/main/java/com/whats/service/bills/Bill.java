package com.whats.service.bills;

/**
 * A value object used as a transport object between the parliamentary API and the internal data store
 */
public class Bill {

    public static final String FOR_PREFIX = "For_";

    public static final String AGAINST_PREFIX = "Against_";

    public Bill(Long id, String currentHouse, String name, String lastUpdated, long forCount, long againstCount) {
        this.id = id;
        this.currentHouse = currentHouse;
        this.name = name;
        this.lastUpdated = lastUpdated;
        this.forCount = forCount;
        this.againstCount = againstCount;
    }

    public Bill(Long id, String currentHouse, String name, String lastUpdated) {
        this.id = id;
        this.currentHouse = currentHouse;
        this.name = name;
        this.lastUpdated = lastUpdated;
    }

    public Bill(String currentHouse, String name, String lastUpdated) {
        this.currentHouse = currentHouse;
        this.name = name;
        this.lastUpdated = lastUpdated;
    }

    /**
     * The ID of this bill.
     */
    private Long id;

    /**
     * The house where the bill is being debated.
     */
    private String currentHouse;

    /**
     * The name of the bull being debated.
     */
    private String name;

    /**
     * The last updated (raw string).
     */
    private String lastUpdated;

    /**
     * The number of votes processed against the bill.
     */
    private long forCount;

    /**
     * The number of votes processed for the bill.
     */
    private long againstCount;

    public String getCurrentHouse() {
        return currentHouse;
    }


    public String getName() {
        return name;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }

    public Long getId() {
        return id;
    }

    public long getForCount() {
        return forCount;
    }

    public long getAgainstCount() {
        return againstCount;
    }

}
