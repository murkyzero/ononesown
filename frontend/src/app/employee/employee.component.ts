import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { fromEvent } from 'rxjs'
// import { MatSort } from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  providers: [EmployeeService],
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sortTable') sortTable!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  employees: Employee[] = [];
  editEmployee: Employee | undefined;
  employeesDataSource = new MatTableDataSource<any>();
  totalCount: number = 10;

  employeeForm = this.fb.group({
    AD: ['', Validators.required],
    Name: ['', Validators.required]
  });

  constructor(private employeeService: EmployeeService, private fb: FormBuilder) { }

  ngOnInit(): void {


    this.getEmployees();
    fromEvent(this.filter.nativeElement, 'keyup')
      //.debounceTime(300)
      //.distinctUntilChanged()
      .subscribe(() => {
        this.getEmployees();
        this.employeesDataSource.filter = (this.filter.nativeElement as HTMLInputElement).value;
      });

    this.employeesDataSource.filterPredicate = (data: any, filter: string): boolean => {
      console.log("data"+data)
      console.log("filet"+filter)
      return data.AD.indexOf(filter) !== -1;//用AD濾掉
    };
  }

  getEmployees(): void {
    this.employeeService.getEmployeees()
      .subscribe(employees => {
        this.employees = employees;
        console.log(employees);
        console.log(this.employees)
        this.employeesDataSource.data = this.employees
        this.employeesDataSource.sort = this.sortTable
        this.employeesDataSource.paginator = this.paginator
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
    this.employeeService.getEmployeees().subscribe(employees => {
      this.employees = employees;
      this.employeesDataSource.data = this.employees
      this.employeesDataSource.sort = this.sortTable
      this.employeesDataSource.paginator = this.paginator
    });
  }

  update(emailRow: any) {
    console.log('回覆信件', emailRow.AD);
  }

  delete(emailRow: any) {
    console.log('刪除信件', emailRow);
    this.employeeService.deleteEmployee(emailRow.AD).subscribe();
    this.employeeService.getEmployeees().subscribe(employees => {
      this.employees = employees;
      this.employeesDataSource.data = this.employees
      this.employeesDataSource.sort = this.sortTable
      this.employeesDataSource.paginator = this.paginator
    });
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
