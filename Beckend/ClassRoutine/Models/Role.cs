using System.ComponentModel.DataAnnotations;

namespace ClassRoutine.Models
{
    public class Role
    {
        [Key]
        public int Id { get; set; }
        public string? Name{ get; set; }
    }

}
