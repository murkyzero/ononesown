import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Employee } from './employee.model';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeUrl = "api/v1/employee"
  private handleError: HandleError;

  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('EmployeeService');
  }

  getEmployeees(): Observable<Employee[]> {
    const url = `${this.employeeUrl}/`; // DELETE api/heroes/42
    return this.http.get<Employee[]>(this.employeeUrl)
      .pipe(
        catchError(this.handleError('getEmployeees', []))
      );
  }
  /** POST: add a new hero to the database */
  addEmployee(hero: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeeUrl, hero, httpOptions)
      .pipe(
        catchError(this.handleError('addEmployee', hero))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteEmployee(ad: string): Observable<unknown> {
    const url = `${this.employeeUrl}/${ad}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteEmployee'))
      );
  }
  updateEmployee(hero: Employee): Observable<Employee> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Employee>(this.employeeUrl, hero, httpOptions)
      .pipe(
        catchError(this.handleError('updateEmployee', hero))
      );
  }
  
  /**
 * 取得待辦事項清單
 *
 * @returns {Todo[]}
 * @memberof TodoListService
 */
  // getList(): Employee[] {
  //   return this.list;
  // }

  /**
   * 新增待辦事項
   *
   * @param {string} title - 待辦事項的標題
   * @memberof TodoListService
   */
  // add(title: string): void {

    // 避免傳入的 title 是無效值或空白字串，稍微判斷一下
    // if (title || title.trim()) {
    //   this.list.push(new Employee(title));
    // }
  //}
}
