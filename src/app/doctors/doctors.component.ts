import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../_service/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  searchDoctor:any;

  doctorCollection:any[] = [];

  constructor(private doctorService:DoctorService) { }

  ngOnInit(): void {
    this.doctorService.getAllDoctor().subscribe(
      (res:any) =>{
        console.log(res);
        this.doctorCollection = res;
      },
      err =>{
        console.log(err);
      }
    );
}

  search(){
    if(this.searchDoctor == ""){
      this.ngOnInit();
    }else{
      this.doctorCollection=this.doctorCollection.filter(res =>{
        //console.log(res);

        if(res.doctorName.toLocaleLowerCase().match(this.searchDoctor.toLocaleLowerCase())){
        return res.doctorName.toLocaleLowerCase().match(this.searchDoctor.toLocaleLowerCase());
        }
        if(res.departmentName.toLocaleLowerCase().match(this.searchDoctor.toLocaleLowerCase())){
          return res.departmentName.toLocaleLowerCase().match(this.searchDoctor.toLocaleLowerCase())
        }
        if(res.education.toLocaleLowerCase().match(this.searchDoctor.toLocaleLowerCase())){
          return res.education.toLocaleLowerCase().match(this.searchDoctor.toLocaleLowerCase())
        }
          if(res.experience.toLocaleLowerCase().match(this.searchDoctor.toLocaleLowerCase())){
            return res.experience.toLocaleLowerCase().match(this.searchDoctor.toLocaleLowerCase())
          }
          if(res.mobile.toLocaleLowerCase().match(this.searchDoctor.toLocaleLowerCase())){
            return res.mobile.toLocaleLowerCase().match(this.searchDoctor.toLocaleLowerCase())
          }
      });
    }
  }
}
