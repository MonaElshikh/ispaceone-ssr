import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommanFunctionsService {
  constructor() { }
  Counters(inputChars: number,remainingChars:number) {
    remainingChars = 500 -inputChars;
    return remainingChars;
  }
}
