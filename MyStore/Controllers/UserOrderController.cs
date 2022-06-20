using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyStore.Models;
using MyStore.BDContext;
using Microsoft.EntityFrameworkCore;

namespace MyStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserOrderController : ControllerBase
    {

        public static List<UserOrder> orders = new List<UserOrder>();
        private readonly DataContext _context;

        public UserOrderController(DataContext context)
        {
            _context = context;
        }



        [HttpGet("{customerId}")]
        public async Task<ActionResult<IEnumerable<UserOrder>>> GetCustomersOrders(int customerId)
        {
            Customer customer = _context.Customer.FirstOrDefault(x => x.CustomerId == customerId);
            if (customer != null)
            {
                orders = await _context.UserOrder.Where(op => op.CustomerId == customer.CustomerId).ToListAsync();
                if (orders != null)
                {
                    return orders;
                }
                else
                {
                    List<UserOrder> emptyUsersProducts = new List<UserOrder>();
                    return emptyUsersProducts;
                }
            }
            else
            {
                return NotFound("Customer Not Found!");
            }
        }

        // takes in customer id (id) and User Order information (request) to submit new user order to DB
        [HttpPost("submitOrder")]
        public async Task<ActionResult<UserOrder>> SubmitOrder([FromBody] UserOrderDTO request)
        {
            UserOrder order = new UserOrder();
            var customer = _context.Customer.FirstOrDefault(acc => acc.CustomerId == request.CustomerId);
            if (customer == null)
            {
                return Ok("USER NOT FOUND");
            }
            int OrderCartID = customer.CustomerId;
            order.CustomerId = OrderCartID;
            order.Name = request.Name;
            order.Street = request.Street;
            order.City = request.City;
            order.State = request.State;
            order.Zip = request.Zip;
            order.FourCard = request.FourCard;
            order.Cost = request.Cost;
            order.ItemCount = request.ItemCount;



            _context.UserOrder.Add(order);
            await _context.SaveChangesAsync();

            return Ok(order);
        }


        

        

    }
}
        