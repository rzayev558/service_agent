import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButtonModule } from 'primeng/radiobutton';

import { DropdownModule } from 'primeng/dropdown';
import { JobsService } from '../../services/jobs.service';
export const Methods = {
  POST: 'POST',
  GET: 'GET',
};
@Component({
  selector: 'app-request-page',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    ReactiveFormsModule,
    RadioButtonModule,
    FloatLabelModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
  ],
  templateUrl: './request-page.component.html',
  styleUrls: ['./request-page.component.scss'],
})
export class RequestPageComponent implements OnInit {
  requestForm: FormGroup;
  methods: { label: string; value: string }[] = [
    { label: 'POST', value: Methods.POST },
    { label: 'GET', value: Methods.GET },
  ];

  constructor(private fb: FormBuilder, private jobsService: JobsService) {
    this.requestForm = this.fb.group({
      name: new FormControl(''),
      method: new FormControl(Methods.POST),
      api: new FormControl(''),
      headers: this.fb.array([this.createHeader()]),
      body: new FormControl(''),
      execution: new FormControl('Now'),
      executionType: new FormControl('now'), // Updated to match the radio button form control name
      date: new FormControl(''),
      time: new FormControl(''),
    });
  }

  ngOnInit() {}

  createHeader(): FormGroup {
    return this.fb.group({
      key: [''],
      value: [''],
    });
  }

  get headers(): FormArray {
    return this.requestForm.get('headers') as FormArray;
  }

  addHeader() {
    this.headers.push(this.createHeader());
  }
  deleteLastHeader(): void {
    if (this.headers.length > 1) {
      this.headers.removeAt(this.headers.length - 1);
    }
  }

  removeHeader(index: number) {
    this.headers.removeAt(index);
  }

  onSubmit() {
    this.jobsService.submitRequest(this.requestForm.value);
  }
}
