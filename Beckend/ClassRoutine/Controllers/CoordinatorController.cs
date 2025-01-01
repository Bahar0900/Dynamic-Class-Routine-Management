using ClassRoutine.Models;
using Microsoft.EntityFrameworkCore; // Make sure this is present
using System.Linq; // Add this if missing
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization; // Import for the Authorize attribute

namespace ClassRoutine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Coordinator, Admin")]  // Ensure only Coordinators and Admins can access these actions
    public class CoordinatorController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public CoordinatorController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("assign-lab")]
        public async Task<IActionResult> AssignLab([FromBody] LabAssignmentRequest request)
        {
            var lab = await _dbContext.Labs.FindAsync(request.LabId);
            if (lab == null) return NotFound("Lab not found.");

            // Check if LabAssistant exists
            var labAssistant = await _dbContext.Users.FindAsync(request.LabAssistantId);
            if (labAssistant == null || labAssistant.Role != "LabAssistant")
                return BadRequest("Invalid Lab Assistant.");

            lab.LabAssistantId = request.LabAssistantId;
            await _dbContext.SaveChangesAsync();

            return Ok("Lab assigned.");
        }

        [HttpPost("add-routine")]
        public async Task<IActionResult> AddRoutine([FromBody] Routine routine)
        {
            // Validate if the routine has valid data (e.g., valid subject, lab, and batch IDs)
            var subjectExists = await _dbContext.Subjects.AnyAsync(s => s.Id == routine.SubjectId);
            var labExists = await _dbContext.Labs.AnyAsync(l => l.Id == routine.LabId);
            var batchExists = await _dbContext.Batches.AnyAsync(b => b.Id == routine.BatchId);

            if (!subjectExists || !labExists || !batchExists)
                return BadRequest("Invalid subject, lab, or batch.");

            _dbContext.Routines.Add(routine);
            await _dbContext.SaveChangesAsync();
            return Ok("Routine added.");
        }
    }
}
