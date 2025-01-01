using System.ComponentModel.DataAnnotations;

namespace ClassRoutine.Models
{
    public class Subject
    {
        [Key]
        public int Id { get; set; }
        public string?Name { get; set; }
        public int? SemesterId { get; set; }

        // Navigation Property
        public Semester? Semester { get; set; }
    }

}
