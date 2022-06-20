using System.ComponentModel.DataAnnotations;

namespace MyStore.Models
{
	public class OrderProductDTO
	{
		
		[Required]
		public int ProductId { get; set; }
		[Required]
		public int OrderId { get; set; }
		[Required]
		public int CustomerId { get; set; }
		[Required]
		public int Quantity { get; set; }
	}
}