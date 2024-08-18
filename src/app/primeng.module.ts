import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';

import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  exports: [
    TableModule,
    InputTextModule,
    CalendarModule,
    InputTextareaModule,
    FloatLabelModule,
    RadioButtonModule,
    ToastModule,
    DropdownModule,
    OverlayPanelModule,
    ButtonModule,
  ],
})
export class PrimeNgModule {}
