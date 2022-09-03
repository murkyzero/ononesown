export class Employee {

    private ad = '';
    private name = '';
    constructor(ad: string) {
        this.ad = ad || '';
      }

        /**
   * 取得事項名稱
   *
   * @returns {string}
   * @memberof Todo
   */
  getAd(): string {
    return this.ad;
  }
}
