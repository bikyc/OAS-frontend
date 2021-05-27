using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineAppointmentSystem.Controllers.DataAccess;
using OnlineAppointmentSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnlineAppointmentSystem.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [EnableCors("MyPolicy")]
  public class AppointmentController : ControllerBase
  {
    public OnlineAppointmentDbContext onlineAppointmentDbContext = new OnlineAppointmentDbContext();
    // GET: api/<AppointmentController>
    [HttpGet]
    public IActionResult Get()
    {
      var appointmentCollection = (from a in onlineAppointmentDbContext.appointments
                              where a.IsActive == true && a.IsCancel == false
                              select a);

      return Ok(appointmentCollection);
    }

    // GET api/<AppointmentController>/5
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
      var appointmentCollection = (from a in onlineAppointmentDbContext.appointments
                                   where a.IsActive == true && a.id==id && a.IsCancel == false
                                   select a);

      return Ok(appointmentCollection);
    }

    // POST api/<AppointmentController>
    [HttpPost]
    public IActionResult Post([FromBody] Appointment appointment)
    {
      Appointment appointmentModel = new Appointment();
      appointmentModel.CreatedOn = appointment.CreatedOn;
      appointmentModel.AppointmentDate = appointment.AppointmentDate;
      appointmentModel.DepartmentName = appointment.DepartmentName;
      appointmentModel.DoctorModelId = appointment.DoctorModelId;
      appointmentModel.PatientModelId = appointment.PatientModelId;
      appointmentModel.Symptoms = appointment.Symptoms;


      onlineAppointmentDbContext.Add(appointmentModel);
      onlineAppointmentDbContext.SaveChanges();

      var appointmentCollection = (from a in onlineAppointmentDbContext.appointments
                                   where a.IsActive == true && a.IsCancel == false

                                   select a);
      return Ok(appointmentCollection);

    }

    // PUT api/<AppointmentController>/5
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Appointment appointment)
    {

      var appointmentcollection = (from a in onlineAppointmentDbContext.appointments
                                   where a.id == id && a.IsActive == true && a.IsCancel == false
                                   select a).FirstOrDefault();

      if (appointmentcollection != null)
      {
        appointmentcollection.AppointmentDate = appointment.AppointmentDate;
        appointmentcollection.DoctorModelId = appointment.DoctorModelId;
        appointmentcollection.PatientModelId = appointment.PatientModelId;
        appointmentcollection.Symptoms = appointment.Symptoms;
        appointmentcollection.DepartmentName = appointment.DepartmentName;
        onlineAppointmentDbContext.SaveChanges();

        var data = (from a in onlineAppointmentDbContext.appointments
                    where a.IsActive == true && a.IsCancel == false
                    select a);
        return Ok(data);

      }
      else
      {
        return StatusCode(StatusCodes.Status500InternalServerError,
          "Sorry cannot update");
      }

    }

    // DELETE api/<AppointmentController>/5
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
      var appointment = (from a in onlineAppointmentDbContext.appointments
                         where a.id == id && a.IsActive == true && a.IsCancel == false
                         select a).FirstOrDefault();

      if(appointment != null)
      {
        /*Appointment obj = new Appointment();*/

        appointment.IsActive = false;
        appointment.IsCancel = true;

        onlineAppointmentDbContext.SaveChanges();

        var appointmentCollection = (from a in onlineAppointmentDbContext.appointments
                                     where a.IsActive == true && a.IsCancel == false

                                     select a);
        return Ok(appointmentCollection);


      }
      else
      {
        return StatusCode(StatusCodes.Status500InternalServerError,
          "No data found");
      }
    }

    [Route("~/api/countAppointment")]
    [HttpGet]
    public IActionResult CountAppointment()
    {
      var appointmentCollection = (from a in onlineAppointmentDbContext.appointments
                                   where a.IsActive == true && a.IsCancel == false

                                   select a);
      var count = appointmentCollection.Count();

      return Ok(count);
    }

    [Route("~/api/countTodaysAppointment")]
    [HttpGet]
    public IActionResult countTodaysAppointment()
    {
      var localDate = DateTime.Now;
      var date = localDate.Date;

      var appointmentCollection = (from a in onlineAppointmentDbContext.appointments
                                   where a.IsActive == true && a.IsCancel == false
                                          && a.AppointmentDate.Date == date
                                   select a);

                                  
      var count = appointmentCollection.Count();
      return Ok(count);


    }
  }
}
