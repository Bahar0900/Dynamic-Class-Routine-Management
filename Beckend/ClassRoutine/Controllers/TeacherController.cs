using ClassRoutine.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization; // Import for Authorize attribute

namespace ClassRoutine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Teacher")] // Ensure only authenticated teachers can access this endpoint
    public class TeacherController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public TeacherController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("assigned-classes/{teacherId}")]
        public async Task<IActionResult> GetAssignedClasses(int teacherId)
        {
            // Validate if the teacherId exists in the database
            var teacherExists = await _dbContext.Users.AnyAsync(u => u.Id == teacherId && u.Role == "Teacher");
            if (!teacherExists)
                return NotFound("Teacher not found or invalid role.");

            // Fetch labs where the LabAssistantId matches the teacherId (assuming teachers are assigned to labs)
            var labs = await _dbContext.Labs
                .Where(l => l.LabAssistantId == teacherId)
                .Include(l => l.LabAssistant) // Optionally include details of the lab assistant (teacher)
                .ToListAsync();

            // Handle case where no labs are assigned to the teacher
            if (labs == null || labs.Count == 0)
                return NotFound("No assigned classes found for this teacher.");

            return Ok(labs);
        }
    }
}
