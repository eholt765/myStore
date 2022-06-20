using Microsoft.EntityFrameworkCore;
using MyStore.Models;

namespace MyStore.BDContext
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions options) : base(options)
		{

		}
		
		public DbSet<Customer> Customer { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<CartProduct> CartProduct { get; set; }
		public DbSet<UserOrder> UserOrder { get; set; }
		public DbSet<OrderProduct> OrderProduct { get; set; }
    }
}
