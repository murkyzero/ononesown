import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';
// import { MatSort } from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  providers: [EmployeeService],
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  // @ViewChild('sortTable') sortTable: MatSort;
  employees: Employee[] = [];
  editEmployee: Employee | undefined;

  employeeForm = this.fb.group({
    AD: ['', Validators.required],
    Name: ['', Validators.required]
  });

  constructor(private employeeService: EmployeeService, private fb: FormBuilder) { }

  ngOnInit(): void { this.getEmployees(); }

  getEmployees(): void {
    this.employeeService.getEmployeees()
      .subscribe(employees => {
        this.employees = employees;
        console.log(employees);
        console.log(this.employees)
      });
  }

  add() {
    // TODO: Use EventEmitter with form value
    console.warn(this.employeeForm.value);
    console.warn(this.employeeForm.get('AD')?.value);
    // var ad =this.employeeForm.get('ad').value;
    // if(!ad) ad="1";
    var AD = this.employeeForm.get('AD')?.value;
    if (!AD) AD = "";
    var Name = this.employeeForm.get('Name')?.value;
    if (!Name) Name = "";
    console.log("AD=" + AD);
    console.log("Name=" + Name);
    const newEmployee: Employee = { AD, Name } as Employee;
    this.employeeService.addEmployee(newEmployee).subscribe();
    this.employeeService.getEmployeees().subscribe(employees => { this.employees = employees; });
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
