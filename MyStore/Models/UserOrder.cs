using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyStore.Models
{
    public class UserOrder
    {
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int OrderId { get; set; }
		[Required]
		public int CustomerId { get; set; }
		[Required]
		public string Name { get; set; }

		[Required]
		public string Street { get; set; }
		[Required]
		public string City { get; set; }
		[Required]
		public string State { get; set; }
		[Required]
		public string Zip { get; set; }
		public string FourCard { get; set; }
		[Required]
		public string Cost { get; set; }
		[Required]
		public string ItemCount { get; set; }

	}
}

/*
[Key]
[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
public int OrderId { get; set; }
[Required]
public int CustomerId { get; set; }
[Required]
public string Name { get; set; }
[Required]
public string Street { get; set; }
[Required]
public string City { get; set; }
[Required]
public string State { get; set; }
[Required]
public string Zip { get; set; }
[Required]
public string FourCard { get; set; }
[Required]
[Column(TypeName = "decimal(6, 2)")]
public int Total { get; set; }
[Required]
public int ItemCount { get; set; }
}
}
*/
