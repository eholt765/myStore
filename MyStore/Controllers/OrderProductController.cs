using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyStore.Models;
using MyStore.BDContext;
using Microsoft.EntityFrameworkCore;

namespace MyStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderProductController : ControllerBase
    {
        public static List<OrderProduct> orderProducts = new List<OrderProduct>();
        private readonly DataContext _context;
        public OrderProductController(DataContext context)
        {
            _context = context;
        }

        
        [HttpGet("{customerId}")]
        public async Task<ActionResult<IEnumerable<OrderProduct>>> GetCustomersOrderItems(int customerId)
        {
            Customer customer = _context.Customer.FirstOrDefault(x => x.CustomerId == customerId);
            if (customer != null)
            {
                orderProducts = await _context.OrderProduct.Where(op => op.CustomerId == customer.CustomerId).ToListAsync();
                if (orderProducts != null)
                {
                    return orderProducts;
                }
                else
                {
                    List<OrderProduct> emptyUsersProducts = new List<OrderProduct>();
                    return emptyUsersProducts;
                }
            }
            else
            {
                return NotFound("Customer Not Found!");
            }
        }


        //add cart_products to customer cart
        [HttpPost("addtoorder")]
        public async Task<ActionResult> AddToOrder([FromBody] OrderProductDTO request)
        {
            OrderProduct op = new OrderProduct();
            op.ProductId = request.ProductId;
            op.OrderId = request.OrderId;
            op.CustomerId = request.CustomerId;
            op.Quantity = request.Quantity;
            _context.OrderProduct.Add(op);
            await _context.SaveChangesAsync();

            return Ok(op);
        }

    }
}
