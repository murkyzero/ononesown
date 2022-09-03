import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private http: HttpClient) {
    this.http.get("api/v1/employee")
      .pipe(
      // map((res: any) => JSON.parse(res))
    )
      .subscribe((res: any) => {
        console.log(res);
        console.log("BBB");
      });
  }

  ngOnInit(): void {
  }
  /**
   * 新增代辦事項
   *
   * @param {HTMLInputElement} inputRef - 輸入框的元素實體
   * @memberof TodoListComponent
   */
  addEmployee( event: Event  ): void {
    const value = (event.target as HTMLInputElement).value;
    

      // this.todoListService.add(todo);
      console.log(value);
      (event.target as HTMLInputElement).value='';
  }
}
