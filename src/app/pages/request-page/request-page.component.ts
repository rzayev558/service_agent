import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';

import { DropdownModule } from 'primeng/dropdown';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../interfaces';
import { MessageService } from 'primeng/api';
export const Methods = {
  POST: 'POST',
  GET: 'GET',
};
export const ExecutionTypes = {
  NOW: 'now',
  SCHEDULED: 'scheduled',
};
@Component({
  selector: 'app-request-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RadioButtonModule,
    FloatLabelModule,
    InputTextModule,
    ToastModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
  ],
  providers: [MessageService],
  templateUrl: './request-page.component.html',
  styleUrls: ['./request-page.component.scss'],
})
export class RequestPageComponent implements OnInit {
  requestForm: FormGroup;
  methods: { label: string; value: string }[] = [
    { label: 'POST', value: Methods.POST },
    { label: 'GET', value: Methods.GET },
  ];

  constructor(
    private fb: FormBuilder,
    private jobsService: JobsService,
    private messageService: MessageService
  ) {
    this.requestForm = this.fb.group({
      name: new FormControl(''),
      method: new FormControl(Methods.POST),
      api: new FormControl(''),
      headers: this.fb.array([this.createHeader()]),
      body: new FormControl(''),
      executionType: new FormControl(ExecutionTypes.NOW),
      date: new FormControl<string>(''),
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
    try {
      const job: Job = {
        name: this.requestForm.value.name,
        submissionDate: new Date().toString(),
        executionDate:
          this.requestForm.value.executionType === ExecutionTypes.NOW
            ? new Date().toString()
            : new Date(this.requestForm.value.date).toString(),
        status: 'pending',
        header: this.requestForm.value.headers,
        body: this.requestForm.value.body,
        favorite: false,
        method: this.requestForm.value.method.value,
        api: this.requestForm.value.api,
      };
      this.jobsService.submitRequest(job).subscribe((res) => {
        console.log('res', res);
      });
      this.requestForm.reset();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Job request submitted successfully',
      });
    } catch (error) {
      console.error(
        'An error occurred while submitting the job request:',
        error
      );
    }
  }
}
