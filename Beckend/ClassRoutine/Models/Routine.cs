using System.ComponentModel.DataAnnotations;

namespace ClassRoutine.Models
{
    public class Routine
    {
        [Key]
        public int Id { get; set; }
        public int BatchId { get; set; }
        public int SubjectId { get; set; }
        public int? LabId { get; set; }

        // Navigation Properties
        public Batch? Batch { get; set; }
        public Subject?Subject { get; set; }
        public Lab?Lab { get; set; }
    }

}
