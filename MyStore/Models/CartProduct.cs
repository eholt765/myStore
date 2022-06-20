using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyStore.Models
{
	public class CartProduct
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int CartProductId { get; set; }
		[Required]
		public int ProductId { get; set; }
		[Required]
		public int CustomerId { get; set; }
		[Required]
		public int Quantity { get; set; }
	}
}

