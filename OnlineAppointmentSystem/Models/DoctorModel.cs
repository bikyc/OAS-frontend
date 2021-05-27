using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineAppointmentSystem.Models
{
  public class DoctorModel
  {
    
    public int id { get; set; }

    public string DoctorName { get; set; }

    public string Gender { get; set; }

    public string Education { get; set; }

    public string DepartmentName { get; set; }

    public string Experience { get; set; }

    public string Mobile { get; set; }

    public Boolean IsActive { get; set; }

    public List<Appointment> appointment { get; set; }

    public DoctorModel()
    {
      IsActive = true;
      appointment = new List<Appointment>();
    }

  }
}
