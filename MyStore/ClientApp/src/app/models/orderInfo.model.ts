export class OrderInfo {


  product:
    {
      productId: number,
      name: string,
      price: number,
      info : string,
      category : string,
      picture : string,
      quantity: number
    }
  orderProduct:
    {
      orderProductId: number,
      productId: number,
      orderId: number,
      customerId: number,
      quantity: number
    }

  subTotal: number

}
