using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyStore.Models
{
	public class Product
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int ProductId { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		[Column(TypeName = "decimal(5, 2)")]
		public decimal Price { get; set; }
		[Required]
		public string Info { get; set; }
		[Required]
		public string Category { get; set; }
		[Required]
		public string Picture { get; set; }
		[Required]
		public int Quantity { get; set; }


	}
}

