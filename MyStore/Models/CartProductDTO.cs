//This class is used for sending cart data. DTO = Data Transfer Object


namespace MyStore.Models
{
    public class CartProductDTO
    {
        public int CustomerId { get; set; }

        public int ProductId { get; set; }

        public int Quantity { get; set; }
    }
}
