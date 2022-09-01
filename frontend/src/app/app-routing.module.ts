import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule/schedule.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: '',
    component: ScheduleComponent
  },
  {
    path: '**',
    redirectTo:'schedule',
    pathMatch:'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true,
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
