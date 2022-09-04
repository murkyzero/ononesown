import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { NgxGanttModule } from '@worktile/gantt';

import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    EmployeeComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    MatSliderModule,
    MatButtonModule,
    NgxGanttModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [HttpErrorHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
