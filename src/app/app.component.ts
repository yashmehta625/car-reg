import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Brand } from './brand.model';
import { CarService } from './car.service';
import { Parts } from './parts.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cars: string[] = [];
  parts: string[] = [];
  submitted = false;

  carForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.maxLength(75), Validators.nullValidator, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
    car: ['', [Validators.required, Validators.maxLength(75), Validators.nullValidator]],
    parts: ['', [Validators.required, Validators.nullValidator]]
  });

  constructor(private fb: FormBuilder, private carService: CarService) { }

  ngOnInit(): void {
    this.carService.getCars().subscribe((res: Brand[]) => {
      this.cars = res.map(res => res.brand)
    });

    this.carService.getParts().subscribe((res: Parts[]) => {
      this.parts = res.map(res => res['List of auto parts']);
    });
  }

  get form() {
    return this.carForm.controls;
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.cars.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )


  onSubmit() {
    this.submitted = true;
    console.log(this.carForm.value)

  }

  onReset() {
    this.carForm.reset();

  }


}
