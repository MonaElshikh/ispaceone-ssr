import { ErrorHandler } from '@angular/core';
export class AppErrorHandler implements ErrorHandler {
    handleError(error) {
        let errorMessage = '';
        errorMessage = `_Error Code: ${error.status}\n_Message: ${error.message}\n_Stack: ${error.stack}`;
        console.log(errorMessage);
    }
}
export class appError{
    constructor(originalError?:any){
    }
}