package com.whats.service.bills;

import java.util.List;

public interface BillService {

    List<Bill> getBills();

    Bill getBill(Long id);

}
