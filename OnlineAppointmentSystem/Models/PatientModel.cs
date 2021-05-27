using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineAppointmentSystem.Models
{
  public class PatientModel
  {
   
    public int id { get; set; }

    public string PatientName { get; set; }

    public string Gender { get; set; }

    public string BloodGroup { get; set; }

    public string Mobile { get; set; }

    public string Email { get; set; }

    public Boolean IsActive { get; set; }

    public List<Appointment> appointment { get; set; }
    public PatientModel()
    {
      IsActive = true;
      appointment = new List<Appointment>()
;    }



  }
}
