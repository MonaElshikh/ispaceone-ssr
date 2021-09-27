import { FormGroup, ValidationErrors, AbstractControl, FormArray, AsyncValidatorFn } from "@angular/forms";
import { GetProfileByUnameService } from '../../Account/Services/get-profile-by-uname.service';
import { Observable, timer } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { appCheckUniqueUserNameEmail } from '../../Account/models/profile';
export class appValidation {
   static ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
         let control = formGroup.controls[controlName];
         let matchingControl = formGroup.controls[matchingControlName]
         if (
            matchingControl.errors &&
            !matchingControl.errors.confirmPasswordValidator
         ) {
            return;
         }
         if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmPasswordValidator: true });
         } else {
            matchingControl.setErrors(null);
         }
      }
   }
   static ConfirmCaptchaValidator(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
         let control = formGroup.controls[controlName];
         let matchingControl = formGroup.controls[matchingControlName]
         if (
            matchingControl.errors &&
            !matchingControl.errors.confirmPasswordValidator
         ) {
            return;
         }
         if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ ConfirmCaptchaValidator: true });
         } else {
            matchingControl.setErrors(null);
         }
      }
   }
   static dateRangeValidator(control: AbstractControl): ValidationErrors | null {
      if (new Date(control.value).getFullYear() < 1900 || new Date(control.value).getFullYear() > 2005) {
         return { dateRangeValidator: true };
      }
      else return null;
   }
   static UniqueUserName(Service: GetProfileByUnameService): AsyncValidatorFn {
      return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
         let time = 1000;
         let resource = { UserName: control.value };
         let data: appCheckUniqueUserNameEmail = {} as appCheckUniqueUserNameEmail
         console.log("written user name>> " + resource.UserName);
         return timer(time).pipe(switchMap(() => {
            return Service.CheckUniqueUsername(resource)
               .pipe(
                  map((resp: any) => {
                     data = resp;
                     if (data.isValid > 0) {
                        control.setErrors({ DuplicateUserName: true });
                        return {"DuplicateUserName": true };
                     }
                     else {
                        control.setErrors({ DuplicateUserName: null });
                        return null;
                     }
                  })
               )
         }))
      }
   }
   static UniqueEmail(Service: GetProfileByUnameService): AsyncValidatorFn {
      return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
         let time = 1000;
         let resource = { Email: control.value };
         let data: appCheckUniqueUserNameEmail = {} as appCheckUniqueUserNameEmail;
         console.log("written email>> " + resource.Email);
         return timer(time).pipe(switchMap(() => {
            return Service.CHeckUniqueEmail(resource)
               .pipe(
                  map((resp: any) => {
                     data = resp;
                     if (data.isValid > 0 || data.isValidR > 0) {
                        control.setErrors({ DuplicateEmail: true });
                        return {"DuplicateEmail": true };
                     }
                     else {
                        control.setErrors({ DuplicateEmail: null });
                        return null;
                     }
                  })
               )
         }))
      }
   }
   static checkboxListMinChecks(control: FormArray): ValidationErrors | null {
      if (control.length === 0) {
         return { checkboxListMinChecks: true };
      }
      else {
         return null;
      }
   }
}




