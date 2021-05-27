using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using OnlineAppointmentSystem.Controllers.DataAccess;
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
  public class PatientController : ControllerBase
  {
    public OnlineAppointmentDbContext onlineAppointmentDbContext = new OnlineAppointmentDbContext();
   
    // GET: api/<PatientController>
    [HttpGet]
    public IActionResult Get()
    {
      var patientCollection = (from p in onlineAppointmentDbContext.patientModels
                                   where p.IsActive == true
                                   select p);

      return Ok(patientCollection);
    }

    // GET api/<PatientController>/5
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
      var patientCollection = (from p in onlineAppointmentDbContext.patientModels
                               where p.IsActive == true && p.id== id
                               select p);

      return Ok(patientCollection);
    }


    [HttpGet("PatientName")]
    public IActionResult Get(string PatientName)
    {
      var patientCollection = (from p in onlineAppointmentDbContext.patientModels
                               where p.IsActive == true && p.PatientName == PatientName
                               select p);

      return Ok(patientCollection);
    }

    // POST api/<PatientController>
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/<PatientController>/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/<PatientController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }

    [Route("~/api/countpatient")]
    [HttpGet]
    public IActionResult CountPatient()
    {
      var patientCollection = (from p in onlineAppointmentDbContext.patientModels
                                   where p.IsActive == true

                                   select p);
      var count = patientCollection.Count();

      return Ok(count);
    }
  }
 
}
