export class ProdInfo {


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
  cartProduct:
    {
      cartProductId: number,
      productId: number,
      customerId: number,
      quantity: number
    }

  subTotal: number

}
