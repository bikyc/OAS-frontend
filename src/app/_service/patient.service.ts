import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http:HttpClient) { }

  getAllPatient():Observable<any>{
    return this.http.get(environment.apiUrl + 'Patient', {responseType:'json'});
  }

  
  getPatientById(id:number):Observable<any>{
    return this.http.get(environment.apiUrl + 'Patient/'+id, {responseType:'json'});
  }

  countPatient():Observable<any> {
    return this.http.get(environment.apiUrl +'countPatient', {responseType:'json'});
  }
}
