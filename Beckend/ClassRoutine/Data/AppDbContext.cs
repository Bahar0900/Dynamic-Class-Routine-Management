using ClassRoutine.Models;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext() : base()
    {
    }
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Semester> Semesters { get; set; }
    public DbSet<Subject> Subjects { get; set; }
    public DbSet<Lab> Labs { get; set; }
    public DbSet<Batch> Batches { get; set; }
    public DbSet<Routine> Routines { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Subject>()
            .HasOne(s => s.Semester)
            .WithMany()
            .HasForeignKey(s => s.SemesterId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Lab>()
            .HasOne(l => l.LabAssistant)
            .WithMany()
            .HasForeignKey(l => l.LabAssistantId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Routine>()
            .HasOne(r => r.Batch)
            .WithMany()
            .HasForeignKey(r => r.BatchId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Routine>()
            .HasOne(r => r.Subject)
            .WithMany()
            .HasForeignKey(r => r.SubjectId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Routine>()
            .HasOne(r => r.Lab)
            .WithMany()
            .HasForeignKey(r => r.LabId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
