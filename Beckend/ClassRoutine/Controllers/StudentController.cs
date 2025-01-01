using ClassRoutine.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization; // Import for Authorize attribute

namespace ClassRoutine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Student")] // Ensure only authenticated students can access this endpoint
    public class StudentController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public StudentController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("schedule/{batchId}")]
        public async Task<IActionResult> GetSchedule(int batchId)
        {
            // Check if the batch exists
            var batchExists = await _dbContext.Batches.AnyAsync(b => b.Id == batchId);
            if (!batchExists)
                return NotFound("Batch not found.");

            // Fetch routines for the specified batch, along with associated subjects and labs
            var routines = await _dbContext.Routines
                .Include(r => r.Subject)
                .Include(r => r.Lab)
                .Where(r => r.BatchId == batchId)
                .ToListAsync();

            // Handle case where no routines are found for the batch
            if (routines == null || routines.Count == 0)
                return NotFound("No schedule found for this batch.");

            return Ok(routines);
        }
    }
}
