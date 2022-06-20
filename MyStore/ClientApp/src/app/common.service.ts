import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CommonService {

  valueFirst = 0;
  valueSecond = 0;

  total = new BehaviorSubject<number>(0);

  setFirstValue(value: number) {
    this.valueFirst = +value;
    this.total.next(this.valueFirst + this.valueSecond);
  }

  setSecondValue(value: number) {
    this.valueSecond = +value;
    this.total.next(this.valueFirst + this.valueSecond);
  }

}
