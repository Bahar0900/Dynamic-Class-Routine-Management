using ClassRoutine.Models;
using System.Security.Claims; // Add this to access FindFirstValue

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization; // Import for Authorize attribute

namespace ClassRoutine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "LabAssistant, Admin")] // Only Lab Assistants and Admins can access this
    public class LabAssistantController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public LabAssistantController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("my-labs")]
        public async Task<IActionResult> GetMyLabs()
        {
            // Get the LabAssistantId from the current logged-in user
            var labAssistantId = int.Parse(User.FindFirstValue("UserId"));

            var labs = await _dbContext.Labs
                .Where(l => l.LabAssistantId == labAssistantId)
                .ToListAsync();

            if (labs == null || labs.Count == 0)
                return NotFound("No labs assigned to this lab assistant.");

            return Ok(labs);
        }
    }
}
