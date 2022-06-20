using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyStore.BDContext;
using MyStore.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace MyStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        public static Customer customer = new Customer();

        private readonly IConfiguration _config;
        private readonly DataContext _context;

        public CustomerController(IConfiguration config, DataContext context)
        {
            _config = config;
            _context = context;
        }

        // GET: api/Customer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomer()
        {
            return await _context.Customer.ToListAsync();
        }
        // Takes in user email and password, hashes password, and adds new customer to DB
        [HttpPut("{id}")]
        public async Task<IActionResult> updateCustomer(int id, CustomerDTO_Register request)
        {
            Customer c = _context.Customer.FirstOrDefault(acc => acc.CustomerId == id);
            
            c.UserName = request.UserName;
            c.FirstName = request.FirstName;
            c.LastName = request.LastName;
            c.Email = request.Email;
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            c.PasswordSalt = passwordSalt;
            c.PasswordHash = passwordHash;

            _context.Entry(c).State = EntityState.Modified;
            await _context.SaveChangesAsync();

  

            return Ok(c);
        }
        


        // Takes in user email and password, hashes password, and adds new customer to DB
        [HttpPost("register")]
        public async Task<ActionResult<Customer>> Register([FromBody] CustomerDTO_Register request)
        {
            Customer c = new Customer();
            Cart crt = new Cart();
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            c.PasswordSalt = passwordSalt;
            c.PasswordHash = passwordHash;
            c.FirstName = request.FirstName;
            c.LastName = request.LastName;
            c.UserName = request.UserName;
            c.Email = request.Email;
            
            _context.Customer.Add(c);
            await _context.SaveChangesAsync();
            


            crt.CartId = c.CustomerId;
            crt.CustomerId = c.CustomerId;
            _context.Cart.Add(crt);
            await _context.SaveChangesAsync();

            return Ok();
        }



        //password hasher
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }
        }


        //Logs into system using given email and password, verifies password against encryption
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(CustomerDTO_Login request)
        {
            Customer customer = _context.Customer.FirstOrDefault(acc => acc.Email == request.Email_or_Username);


            if (customer == null)
            {
                customer = _context.Customer.FirstOrDefault(acc => acc.UserName == request.Email_or_Username);
                if (customer == null)

                {
                    return BadRequest("Email or Username not found");
                }
            }
 
            if (!VerifyPasswordHash(request.Password, customer.PasswordHash, customer.PasswordSalt))
            {
                return BadRequest("Inccorect Password");
            }

            string token = CreateToken(customer, request.Password);
            return Ok(customer);
        }

        private string CreateToken(Customer c, string pass)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, c.UserName)
               // new Claim(ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        // unencrypts given password from login
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {

            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            if (_context.Customer == null)
            {
                return NotFound();
            }
            var customer = await _context.Customer.FindAsync(id);
            var cart = await _context.Cart.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            if (cart == null)
            {
                return NotFound();
            }

            //List<CartProduct> UsersProducts = await CartProductController.GetCustomersItems(customer.CustomerId);

            _context.Cart.Remove(cart);
            await _context.SaveChangesAsync();

            _context.Customer.Remove(customer);
            await _context.SaveChangesAsync();

            
            return NoContent();
        }


    }
}
