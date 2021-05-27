import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {


  constructor(private http:HttpClient) { }

  getAllDoctor() : Observable<any>{
    return this.http.get(environment.apiUrl + 'Doctor', {responseType:'json'});
  }

  getDoctorById(id:number):Observable<any>{
    return this.http.get(environment.apiUrl + 'Doctor/'+id, {responseType:'json'});
  }

  getDoctorsByDepartmentName(DepartmentName:any):Observable<any>{
    return this.http.get(environment.apiUrl + 'getDoctorByDepartmentName/'+DepartmentName);
  }
}
