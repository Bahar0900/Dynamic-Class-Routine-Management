using System.ComponentModel.DataAnnotations;

namespace ClassRoutine.Models
{
    public class Batch
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = "";
    }

}
