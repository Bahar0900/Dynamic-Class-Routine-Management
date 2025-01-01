using Microsoft.AspNetCore.Authorization; // Import this namespace for the Authorize attribute
using ClassRoutine.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClassRoutine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]  // Ensure only users with the "Admin" role can access this controller
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public AdminController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _dbContext.Users.ToListAsync();
            return Ok(users);
        }

        [HttpPost("add-role")]
        public async Task<IActionResult> AddRole([FromBody] string roleName)
        {
            if (await _dbContext.Roles.AnyAsync(r => r.Name == roleName))
                return BadRequest("Role already exists.");

            _dbContext.Roles.Add(new Role { Name = roleName });
            await _dbContext.SaveChangesAsync();
            return Ok("Role added.");
        }

        [HttpPut("update-user/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user == null) return NotFound("User not found.");

            user.Name = updatedUser.Name;
            user.Email = updatedUser.Email;
            user.Role = updatedUser.Role;
            await _dbContext.SaveChangesAsync();

            return Ok("User updated.");
        }

        [HttpDelete("delete-user/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user == null) return NotFound("User not found.");

            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
            return Ok("User deleted.");
        }
    }
}
