using System.ComponentModel.DataAnnotations;

namespace MyStore.Models
{
    public class Cart
    {
        [Key]
        public int CartId { get; set; }
        [Required]
        public int CustomerId { get; set; }
    }
}
