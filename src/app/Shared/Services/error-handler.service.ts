import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public errorMessage: string = '';
  constructor(private router: Router) { }
  public handleError = (error: HttpErrorResponse) => {
    this.InitiateError(error);
  }
  InitiateError(error: HttpErrorResponse) {
    this.errorMessage =
      'Name:' + error.name + '.....' +
      'Status:' + error.status + '.....' +
      'Status Text: ' + error.statusText + '......' +
      'Message:' + error.message + '.....' +
      'Type: ' + error.type + '.....' + 
      'Full Error' + error + '.....';
    this.router.navigate(['/Error'])
  }
}
