using Microsoft.EntityFrameworkCore;
using OnlineAppointmentSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineAppointmentSystem.Controllers.DataAccess
{
  public class OnlineAppointmentDbContext:DbContext
  {

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlServer(@"Data Source=Dell;Initial Catalog=AppointmentDb;Integrated Security=True");

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Appointment>().ToTable("Appointment");
      modelBuilder.Entity<Appointment>().HasKey(a => a.id);

      modelBuilder.Entity<DoctorModel>().ToTable("Doctor");
      modelBuilder.Entity<DoctorModel>().HasKey(d => d.id);

      modelBuilder.Entity<PatientModel>().ToTable("Patient");
      modelBuilder.Entity<PatientModel>().HasKey(p => p.id);
    }

    public DbSet<DoctorModel> doctorModels { get; set; }
    public DbSet<Appointment> appointments { get; set; }

    public DbSet<PatientModel> patientModels { get; set; }
  }
}
