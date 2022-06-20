using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyStore.Models
{
    public class OrderProduct
    {
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int OrderProductId { get; set; }
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
