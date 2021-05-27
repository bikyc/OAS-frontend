using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineAppointmentSystem.Models
{
  public class Appointment
  {

  
    public int id { get; set; }



    public string DepartmentName { get; set; }


    public DateTime AppointmentDate { get; set; }

    public string Symptoms { get; set; }

    public Boolean IsCancel { get; set; }

    public DateTime CreatedOn { get; set; }

    [ForeignKey("PatinetModel")]
    public int PatientModelId { get; set; }

    [ForeignKey("DoctorModel")]
    public int DoctorModelId { get; set; }
    public Boolean IsActive { get; set; }

    public Appointment()
    {
      IsActive = true;
      IsCancel = false;
    }
  }
}
