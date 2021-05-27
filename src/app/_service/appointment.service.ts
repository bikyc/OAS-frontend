import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppointmentModel } from '../appointments/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient) { }

  getAllAppointment():Observable<any>{
    return this.http.get(environment.apiUrl + 'Appointment', {responseType:'json'});
  }

  createAppointment(PatientId:number,DoctorId:number, AppointmentDate,CreatedOn,Symptoms,DepartmentName):Observable<any>{
      return this.http.post(environment.apiUrl+ 'Appointment', {PatientModelId:PatientId,DoctorModelId:DoctorId,AppointmentDate:AppointmentDate, CreatedOn:CreatedOn, Symptoms:Symptoms, DepartmentName:DepartmentName });
  }

  deleteAppointment(id:number):Observable<any>{
    return this.http.delete(environment.apiUrl + 'Appointment/'+id, {responseType:'json'});
  }

  countAppointment():Observable<any>{
    return this.http.get(environment.apiUrl +'countAppointment', {responseType:'json'});
  }

  countTodaysAppointment():Observable<any>{
    return this.http.get(environment.apiUrl + 'countTodaysAppointment', {responseType:'json'});
  }

  editAppointment(id:number,patientId:number,doctorId:number, symptoms:any, appointmentDate:any, departmentName:any):Observable<any>{
    return this.http.put(environment.apiUrl + 'Appointment/'+id, {PatientModelId:patientId,DoctorModelId:doctorId,Symptoms:symptoms, AppointmentDate:appointmentDate, DepartmentName:departmentName}, {responseType:'json'});
  }

  getAppointmentById(id:number):Observable<any>{
    return this.http.get(environment.apiUrl + 'Appointment/'+id,{responseType:'json'});
  }
}
