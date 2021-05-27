import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../_service/appointment.service';
import { DoctorService } from '../_service/doctor.service';
import { PatientService } from '../_service/patient.service';
import { AppointmentModel } from './appointment.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointmentId:number;
  appointmentDate:any;
  appointmentTime:any;
  searchAppointment:any;
  appointmentCollection:any[] = [];
  doctorsCollection:any[] = [];
  patientsCollection:any[] = [];
  public newAppointment:AppointmentModel= new AppointmentModel();
  public editAppointment:AppointmentModel= new AppointmentModel();
  symptoms:any;

  patientDetail:any;
  doctorDetail:any;
  isEditClicked:Boolean = false;
  departmentName:any;


  

  public patientId:number;
  public doctorId:number;
  doctorsCollectionByDepartment:any[]=[];

  totalAppointment:number;
  totalPatients:number;
  todaysAppointment:number;

  constructor(private appointmentService:AppointmentService, private doctorService:DoctorService, private patientService:PatientService) { }

  ngOnInit(): void {

    this.countAppointment();
    this.countPatients();
    this.countTodaysAppointment();

    this.appointmentService.getAllAppointment().subscribe(
      (res:any) =>{
        console.log(res);
        this.appointmentCollection = res;

        for(let i = 0; i< this.appointmentCollection.length; i++){
          this.doctorService.getDoctorById(this.appointmentCollection[i].doctorModelId).subscribe(
            res =>{
                this.appointmentCollection[i].doctors = res[0];
            },
            err =>{
              console.log(err);
            }
          );

          this.patientService.getPatientById(this.appointmentCollection[i].patientModelId).subscribe(
            res =>{
              this.appointmentCollection[i].patients = res[0];
            },
             err =>{
               console.log(err);
             }
          );

        }
        console.log(this.appointmentCollection);

         
      },
      err =>{
        console.log(err);
      }
    );

  }

  createAppointment(){

    this.newAppointment.appointmentDate = this.appointmentDate+ "T"+this.appointmentTime;
    this.appointmentService.createAppointment(this.patientId,
      this.doctorId,
        this.newAppointment.appointmentDate,
        this.newAppointment.createdOn,
        this.newAppointment.symptoms,
        this.newAppointment.departmentName
        ).subscribe(
          res =>{
            alert("Success");
            //console.log(res);
            this.ngOnInit();

          },
          err =>{
                console.log(err);
          }
        );
    

  }

  changePatientsHandler(event:any){
    //alert(event.target.value);
    //this.newAppointment.PatientModelId = parseInt(event.target.vlaue);
    this.patientId = parseInt(event.target.value);

  }
  changeDoctorsHandler(event:any){
    //(event.target.value);
    //this.newAppointment.DoctorModelId = parseInt(event.target.vlaue);
    this.doctorId = parseInt(event.target.value);
  }
  changeDepartmentHandler(event:any){
   // alert(event.target.value);
    this.newAppointment.departmentName = event.target.value;
    this.departmentName = event.target.value;
    this.getDoctorsByDepartment(event.target.value);
    //console.log(this.newAppointment.DepartmentName);
  }


  getDoctorsByDepartment(departmentName:any){
      this.doctorService.getDoctorsByDepartmentName(departmentName).subscribe(
        res =>{
          console.log(res);
          this.doctorsCollectionByDepartment = res;
        },
        err =>{
          console.log(err);
        }
      );
  } 

  search(){
    if(this.searchAppointment == ""){
      this.ngOnInit();
    }else{
      this.appointmentCollection=this.appointmentCollection.filter(res =>{
        //console.log(res);

        if(res.doctors.doctorName.toLocaleLowerCase().match(this.searchAppointment.toLocaleLowerCase())){
        return res.doctors.doctorName.toLocaleLowerCase().match(this.searchAppointment.toLocaleLowerCase());
        }
        if(res.patients.patientName.toLocaleLowerCase().match(this.searchAppointment.toLocaleLowerCase())){
          return res.patients.patientName.toLocaleLowerCase().match(this.searchAppointment.toLocaleLowerCase())
        }
        
      });
    }
  }

  getAllDoctors(){
    this.doctorService.getAllDoctor().subscribe(
      res =>{
        this.doctorsCollection = res;

        this.getAllPatients();

      },
      err =>{
        console.log(err);
      }
    );
  }
  getAllPatients(){
    this.patientService.getAllPatient().subscribe(
      res =>{
        this.patientsCollection =res;
      },
       err =>{
         console.log(err);
       }
    );
  }

  cancelClicked(id:number){

    this.appointmentId = id;

  }
  deleteAppointment(id:number){
    this.appointmentService.deleteAppointment(id).subscribe(
      res =>{
        alert("deleted");
        this.ngOnInit();
      }, 
      err =>{
        console.log(err);
      }
    );
  }

  countAppointment(){
    this.appointmentService.countAppointment().subscribe(
      res =>{
        this.totalAppointment = res;
      },
      err =>{
        console.log(err);
      }
    );
  }

  countPatients(){
    this.patientService.countPatient().subscribe(
      res =>{
        this.totalPatients = res;
      },
      err =>{
        console.log(err);
      }
    );
  }

  countTodaysAppointment(){
    this.appointmentService.countTodaysAppointment().subscribe(
      res =>{
       // console.log(res);
        this.todaysAppointment = res;
      },
      err =>{
        console.log(err);
      }
    );
  }

  editAppointmentClicked(id:number){
  
  this.appointmentId = id;
  this.getAllDoctors();

    this.appointmentService.getAppointmentById(id).subscribe(
      (res:any) =>{
        console.log(res);
        this.editAppointment = res[0];
        this.symptoms = res[0].symptoms;
        this.getPatinetById(res[0].patientModelId);
        this.getDoctorById(res[0].doctorModelId);

      },
       err =>{
         console.log(err);
       }
    );
  }

  editAppointments(id:number){
    this.editAppointment.appointmentDate = this.appointmentDate+ "T"+this.appointmentTime;
    this.editAppointment.symptoms = this.symptoms;
    this.appointmentService.editAppointment(id,this.patientId,this.doctorId,this.editAppointment.symptoms,this.editAppointment.appointmentDate, this.departmentName).subscribe(
      res =>{
        console.log(res);
        alert("Updated");
        this.ngOnInit();
      },
      err =>{
        console.log(err);
      }
    );

  }

  getPatinetById(id:number){
    this.patientService.getPatientById(id).subscribe(
     (res:any) =>{
        this.patientDetail = res;
        this.editAppointment.patientName = res[0].patientName;
       // this.isEditClicked = true;
      },
      err =>{
        console.log(err);
      }
    );
  }
  
  getDoctorById(id:number){
    this.doctorService.getDoctorById(id).subscribe(
      res =>{
        this.doctorDetail = res[0];
        this.editAppointment.doctorName = res[0].doctorName;
      },
      err =>{
        console.log(err);
      }
    );
  }


  }
