using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyStore.BDContext;
using MyStore.Models;

namespace MyStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartProductController : ControllerBase
    {
        private readonly DataContext _context;
        public static List<CartProduct> usersProducts = new List<CartProduct>();

        public CartProductController(DataContext context)
        {
            _context = context;
        }


        //gets all customers cart_product items and return as list
        [HttpGet("{customerId}")]
        public async Task<ActionResult<IEnumerable<CartProduct>>> GetCustomersItems(int customerId)
        {
            Customer customer = _context.Customer.FirstOrDefault(x => x.CustomerId == customerId);
            if (customer != null)
            {
                usersProducts = await _context.CartProduct.Where(cp => cp.CustomerId == customer.CustomerId).ToListAsync();
                if (usersProducts != null)
                {
                    return usersProducts;
                }
                else
                {
                    List<CartProduct>  emptyUsersProducts = new List<CartProduct>();
                    return emptyUsersProducts;
                }
            }
            else{
                return NotFound("Customer Not Found!");
            }
        }

        //add cart_products to customer cart
        [HttpPost("addtocart")]
        public async Task<ActionResult> AddToCart([FromBody] CartProductDTO request)
        {
            CartProduct cp = new CartProduct();
            cp.ProductId = request.ProductId;
            cp.CustomerId = request.CustomerId;
            cp.Quantity = request.Quantity;
            _context.CartProduct.Add(cp);
            await _context.SaveChangesAsync();

            return Ok();
        }

        //updates the product quanity in the user cart
        [HttpPost("updatecart")]
        public async Task<IActionResult> UpdateProductQuantityInCart([FromBody] CartProductDTO cp)
        {
            //int customerId = c.CustomerId;
            int customerId = cp.CustomerId;
            int productId = cp.ProductId;
            int newquantity = cp.Quantity;

            Customer customer = _context.Customer.FirstOrDefault(x => x.CustomerId == customerId);

            if (customer != null)
            {
                CartProduct cartProduct = await _context.CartProduct.FirstOrDefaultAsync(x => x.CustomerId == customer.CustomerId && x.ProductId == productId);

                if (cartProduct != null)
                {
                    cartProduct.Quantity = newquantity;

                    _context.CartProduct.Update(cartProduct);
                    _context.SaveChanges();

                    return Ok();
                }
                else
                {
                    return NotFound("No Products In Cart");
                }
            }
            else
            {
                return NotFound("Customer Not Found!");
            }
        }






















        // GET: api/CartProduct
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartProduct>>> GetCartProduct()
        {
          if (_context.CartProduct == null)
          {
              return NotFound();
          }
            return await _context.CartProduct.ToListAsync();
        }

        // GET: api/CartProduct/5
        [HttpGet("id")]
        public async Task<ActionResult<CartProduct>> GetCartProduct(int id)
        {
          if (_context.CartProduct == null)
          {
              return NotFound();
          }
            var cartProduct = await _context.CartProduct.FindAsync(id);

            if (cartProduct == null)
            {
                return NotFound();
            }

            return cartProduct;
        }

        // PUT: api/CartProduct/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCartProduct(int id, CartProduct cartProduct)
        {
            if (id != cartProduct.CartProductId)
            {
                return BadRequest();
            }

            _context.Entry(cartProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CartProduct
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CartProduct>> PostCartProduct(CartProduct cartProduct)
        {
          if (_context.CartProduct == null)
          {
              return Problem("Entity set 'DataContext.CartProduct'  is null.");
          }
            _context.CartProduct.Add(cartProduct);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCartProduct", new { id = cartProduct.CartProductId }, cartProduct);
        }

        // DELETE: api/CartProduct/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartProduct(int id)
        {
            if (_context.CartProduct == null)
            {
                return NotFound();

                
            }
            var cartProduct = await _context.CartProduct.FirstOrDefaultAsync(x => x.CartProductId == id);
            if (cartProduct == null)
            {
                return NotFound();
            }

            _context.CartProduct.Remove(cartProduct);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartProductExists(int id)
        {
            return (_context.CartProduct?.Any(e => e.CartProductId == id)).GetValueOrDefault();
        }
    }
}
