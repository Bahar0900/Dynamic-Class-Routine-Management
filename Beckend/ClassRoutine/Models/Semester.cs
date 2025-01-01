using System.ComponentModel.DataAnnotations;

namespace ClassRoutine.Models
{
    public class Semester
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
    }

}
