import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand } from './brand.model';
import { Observable } from 'rxjs';
import { Parts } from './parts.model';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCars(): Observable<Brand[]> {
    return this.http.get<Brand[]>('https://s3-ap-southeast-1.amazonaws.com/he-public-data/Cars9096be5.json');
  }

  getParts(): Observable<Parts[]> {
    return this.http.get<Parts[]>('https://s3-ap-southeast-1.amazonaws.com/he-public-data/ListOfAutoParts1aaa4e5.json');
  }
}
