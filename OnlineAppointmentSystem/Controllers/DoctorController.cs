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
  public class DoctorController : ControllerBase
  {
    public OnlineAppointmentDbContext onlineAppointmentDbContext = new OnlineAppointmentDbContext();
    // GET: api/<DoctorController>
    [HttpGet]
    public IActionResult Get()
    {
      var doctorCollection = (from d in onlineAppointmentDbContext.doctorModels
                              where d.IsActive == true
                              select d);

      return Ok(doctorCollection);

    }

    // GET api/<DoctorController>/5
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
      var doctorCollection = (from d in onlineAppointmentDbContext.doctorModels
                              where d.IsActive == true && d.id == id
                              select d);

      return Ok(doctorCollection);
    }

    [Route("~/api/getDoctorByDepartmentName/{departmentName}")]
    [HttpGet]
    public IActionResult GetDoctorByDepartmentName(string departmentName)
    {
      var doctorCollection = (from d in onlineAppointmentDbContext.doctorModels
                              where  d.DepartmentName == departmentName && d.IsActive == true
                              select d);

      return Ok(doctorCollection);
    }

    // POST api/<DoctorController>
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/<DoctorController>/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/<DoctorController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
