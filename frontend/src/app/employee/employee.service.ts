import { Injectable } from '@angular/core';

import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private list: Employee[] = [];

  constructor() { }
  /**
 * 取得待辦事項清單
 *
 * @returns {Todo[]}
 * @memberof TodoListService
 */
  getList(): Employee[] {
    return this.list;
  }

  /**
   * 新增待辦事項
   *
   * @param {string} title - 待辦事項的標題
   * @memberof TodoListService
   */
  add(title: string): void {

    // 避免傳入的 title 是無效值或空白字串，稍微判斷一下
    if (title || title.trim()) {
      this.list.push(new Employee(title));
    }
  }
}
