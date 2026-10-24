export interface CheckoutResponse {
  success: boolean;
  code: number;
  data: {
    checkout_url: string;
  };
}
