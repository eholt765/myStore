using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyStore.BDContext;
using MyStore.Models;

namespace MyStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        public static Cart cart = new Cart();

        private readonly DataContext _context;

        public CartController(DataContext context)
        {
            _context = context;
        }



        //retreive a users cart based on their email address

        [HttpPost("GetCustomerCart/{id}")]
        public async Task<ActionResult<Cart>> GetCustomerCart(int id)
        {
            var cart = _context.Cart.FirstOrDefault(acc => acc.CustomerId == id);
            return Ok(cart);
        }

        // DELETE: api/Cart/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = _context.Cart.FirstOrDefault(acc => acc.CustomerId == id);
            if (cart == null)
            {
                return NotFound();
            }
            _context.Cart.Remove(cart);
            await _context.SaveChangesAsync();

            return Ok();
        }

        /*
         //create new cart after a user registers

        [HttpPost("CreateCart/{id}")]
        public async Task<ActionResult<Cart>> CreateCart(int id)
        {
            Customer customer = _context.Customer.FirstOrDefault(acc => acc.CustomerId == id);
            Cart cart = new Cart();
            cart.CustomerId = customer.CustomerId;
            _context.Cart.Add(cart);
            await _context.SaveChangesAsync();
            return Ok(cart);
        }
         */
    }
}
