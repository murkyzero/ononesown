import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }
  // constructor(private http: HttpClient) {
  //   this.http.get("api/v1/employee")
  //     .pipe(
  //     // map((res: any) => JSON.parse(res))
  //   )
  //     .subscribe((res: any) => {
  //       console.log(res);
  //       console.log("BBB");
  //     });
  // }

  ngOnInit(): void { }
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
      this.employeeService.add(todo);
      inputRef.value = '';
    }

  }
  getList(): Employee[] {

    let list: Employee[] = [];

        list = this.employeeService.getList();


    return list;

  }
}
