import { Component, OnInit } from '@angular/core';
import { PatientService } from '../_service/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  searchPatient:any;
  patientCollection:any[] = [];

  constructor(private patientService:PatientService) { }

  ngOnInit(): void {
    this.patientService.getAllPatient().subscribe(
      (res:any) =>{
        console.log(res);
        this.patientCollection = res;
      },
      err =>{
        console.log(err);
      }
    );
  }
  search(){
    if(this.searchPatient == ""){
      this.ngOnInit();
    }else{
      this.patientCollection=this.patientCollection.filter(res =>{
        //console.log(res);

        if(res.patientName.toLocaleLowerCase().match(this.searchPatient.toLocaleLowerCase())){
        return res.patientName.toLocaleLowerCase().match(this.searchPatient.toLocaleLowerCase());
        }
        if(res.gender.toLocaleLowerCase().match(this.searchPatient.toLocaleLowerCase())){
          return res.gender.toLocaleLowerCase().match(this.searchPatient.toLocaleLowerCase())
        }
        if(res.bloodGroup.toLocaleLowerCase().match(this.searchPatient.toLocaleLowerCase())){
          return res.bloodGroup.toLocaleLowerCase().match(this.searchPatient.toLocaleLowerCase())
        }
          if(res.mobile.toLocaleLowerCase().match(this.searchPatient.toLocaleLowerCase())){
            return res.mobile.toLocaleLowerCase().match(this.searchPatient.toLocaleLowerCase())
          }
          if(res.email.toLocaleLowerCase().match(this.searchPatient.toLocaleLowerCase())){
            return res.email.toLocaleLowerCase().match(this.searchPatient.toLocaleLowerCase())
          }
      });
    }
  }


}
