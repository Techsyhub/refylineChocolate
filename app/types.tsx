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


// export type OrderStatus =
//   | "PENDING"
//   | "CONFIRMED"
//   | "DISPATCHED"
//   | "IN_TRANSIT"
//   | "DELIVERED"
//   | "CANCELLED"
//   | "RETURNED";

// export type Order = {
//   id: number;
//   status: OrderStatus;
//   trackingId?: string | null;
//   logisticPartner?: string | null;
// };

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "DISPATCHED"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED";

export type OrderItem = {
  id: number;
  name: string;
  qty: number;
};

export type Customer = {
  fullName: string;
  phone: string;
  city: string;
  address: string;
};

export type Order = {
  id: number;
  orderNumber?: string | null;
  status: OrderStatus;

  trackingId?: string | null;
  logisticPartner?: string | null;
  logisticPrice?: number | null;

  paymentMethod: string;
  deliveryDiscount: number;
  totalPayable: number;

  note?: string | null;

  customer: Customer;
  items: OrderItem[];
};

export type OrderUpdatePayload = {
  id: number;
  status: OrderStatus;
  trackingId?: string;
  logisticPartner?: string;
  logisticPrice?:string|number;
};