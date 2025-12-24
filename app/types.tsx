export interface AnalyticsData {
  summary: {
    totalOrders: number;
    totalCustomers: number;
    pendingOrders: number;
    confirmedOrders: number;
    dispatchOrders: number;
    cancelledOrders: number;
    deliveredOrders: number;
    salesToday: number;
    salesMonth: number;
    salesYear: number;
  };

  productSales: {
    productName: string;
    totalOrders: number;
  }[];

  citySales: {
    city: string;
    totalOrders: number;
  }[];

  financials: {
    payableToDeliveryPartner: number;   // COD to transfer
    receivableFromDeliveryPartner: number; // COD collected by rider
    onlinePayments: number;
    pendingValue: number;
    confirmedValue: number;
    cancelledValue: number;
    deliveredRevenue: number;
    totalSales: number;  // Completed
  };

  salesTrend: {
    date: string; // e.g. "2025-01-12"
    total: number;
  }[];
}
