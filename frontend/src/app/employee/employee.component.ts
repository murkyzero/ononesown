import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  providers:[EmployeeService],
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  editEmployee:Employee|undefined;

  employeeForm = this.fb.group({
    ad: ['', Validators.required],
    name: ['', Validators.required]
  });

  constructor(private employeeService: EmployeeService, private fb: FormBuilder) { }

  ngOnInit(): void {  this.getEmployees();}

  getEmployees(): void {
    this.employeeService.getEmployeees()
      .subscribe(employees => {this.employees = employees;
        console.log(employees);
        console.log(this.employees)});
 }

  add() {
    // TODO: Use EventEmitter with form value
    console.warn(this.employeeForm.value);
    console.warn(this.employeeForm.get('ad')?.value);
    // var ad =this.employeeForm.get('ad').value;
    // if(!ad) ad="1";
    var ad=this.employeeForm.get('ad')?.value;
    if(!ad) ad="";
    var name=this.employeeForm.get('name')?.value;
    if(!name) name="";
    const newEmployee :Employee={ad,name} as Employee;
    this.employeeService
    .addEmployee(newEmployee)
    .subscribe(employee => this.employees.push(employee));
    console.log(this.employees);
  }

  /**
   * 新增代辦事項
   *
   * @param {HTMLInputElement} inputRef - 輸入框的元素實體
   * @memberof TodoListComponent
   */
  addEmployee(event: Event): void {

    var inputRef = event.target as HTMLInputElement;
    const todo = inputRef.value.trim();

    if (todo) {
      // this.employeeService.add(todo);
      inputRef.value = '';
    }
  }
  getList(): Employee[] {
    let list: Employee[] = [];
    // list = this.employeeService.getList();
    return list;
  }
}
