using System.ComponentModel.DataAnnotations;

namespace MyStore.Models
{
    public class CustomerDTO_Login
    {
        [Required]
        public string Email_or_Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
