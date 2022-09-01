import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private http: HttpClient) {
    this.http.get("api/v1/Employee")
      .pipe(
        map((res: any) => JSON.parse(res))
      )
      .subscribe((res: any) => {
        console.log(res);
        console.log("BBB");
      });
  }

  ngOnInit(): void {
  }

}
