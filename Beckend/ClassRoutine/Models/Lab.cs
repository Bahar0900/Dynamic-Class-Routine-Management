using System.ComponentModel.DataAnnotations;

namespace ClassRoutine.Models
{
    public class Lab
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? LabAssistantId { get; set; }

        // Navigation Property
        public User?LabAssistant { get; set; }
    }

}
