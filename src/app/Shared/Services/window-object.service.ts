import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowObjectService {

  constructor() { }
  get windowRef() {
    return window;
  }
}
