import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MetaDefinition } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { appProfile, appRegister } from 'Account/models/profile';
import { GetProfileByUnameService } from 'Account/Services/get-profile-by-uname.service';
import { ProfileService } from 'Account/Services/profile-service.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { appCountry, appState } from 'Shared/models/Country';
import { appEmail } from 'Shared/models/email';
import { appValidation } from 'Shared/models/validators';
import { ConfirmDialogService } from 'Shared/Services/confirm-dialog.service';
import { CountryService } from 'Shared/Services/country.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  //#region Declarations 
  regForm: FormGroup;
  randomCode: string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  isSignUp: Boolean = true;
  isUSA: boolean = false;
  isAcountActivated = false;
  resendActivationCode = false;
  userNameRemainingChars: number = 0;
  emailRemainingChars: number = 0;
  passWordRemainingChars: number = 0;
  confirmPassWordRemainingChars: number = 0;
  fullNameRemainingChars: number = 0;
  cityRemainingChars: number = 0;
  _captcha: string = "";
  HTML: string = "";
  profileType: string[] = [];
  metaTags: MetaDefinition[] = [];
  interval;
  timeLeft = 60;
  CountriesList: appCountry[] = [];
  StatesList: appState[] = [];
  Email: appEmail = {} as appEmail;
  registeredDataObject: appRegister = {} as appRegister;
  registeredUserObject: appRegister = {} as appRegister;
  newProfileObject: appProfile = {} as appProfile;
  RegisterSubscription: Subscription;
  ProfileSubscription: Subscription;
  Subscription: Subscription;
  network: FormArray;
  activationForm: NgForm;
  //#endregion
  //#region Events
  constructor(
    private fb: FormBuilder
    , private getProfileByUnameService: GetProfileByUnameService
    , private CountryService: CountryService
    , private ProfileService: ProfileService
    , private route: Router
    , private Toastr: ToastrService
    , private meta: MetaTagslService
    , private ConfirmDialogService: ConfirmDialogService,) {
  }
  ngOnInit(): void {
    this.SetMetaTags();
    this.initateFormValidation();
    this.reloadCapthca();
    this.BindCountries();
    this.BindStates();
    // this.StartTimer();
  }
  ngOnDestroy() {
    if (this.RegisterSubscription) this.RegisterSubscription.unsubscribe();
    if (this.ProfileSubscription) this.ProfileSubscription.unsubscribe();
    if (this.Subscription) this.Subscription.unsubscribe();
  }
  // confirm() {
  //   console.log("isAcountActivated> ", this.isAcountActivated);
  //   if (!this.isAcountActivated) {
  //     return false;
  //   }
  //   else {
  //     return true;
  //   }
  // }
  //#endregion
  //#region Properties
  //register form fields getter properties
  get networks() {
    return this.regForm.get('networks');
  }
  get username() {
    return this.regForm.get('username');
  }
  get password() {
    return this.regForm.get('password');
  }
  get confirmPassword() {
    return this.regForm.get('confirmPassword');
  }
  get email() {
    return this.regForm.get('email');
  }
  get fullName() {
    return this.regForm.get('fullName');
  }
  get location() {
    return this.regForm.get('location');
  }
  get state() {
    return this.regForm.get('state');
  }
  get city() {
    return this.regForm.get('city');
  }
  get gender() {
    return this.regForm.get('gender');
  }
  get seekingGender() {
    return this.regForm.get('seekingGender');
  }
  get dateOfBirth() {
    return this.regForm.get('dateOfBirth');
  }
  get securityCode() {
    return this.regForm.get('securityCode');
  }
  get captcha() {
    return this.regForm.get('_captcha');
  }
  set captcha(value: any) {
    this._captcha = value;
  }
  get agreement() {
    return this.regForm.get('agreement');
  }
  //#endregion
  //#region Functions
  SetActivationForm(frm: NgForm) {
    if (this.activationForm === null || this.activationForm === undefined) {
      this.activationForm = frm;
    }
  }
  // fun to Delete UnActivated Account
  DeleteUnActivatedAccount() {
    console.log("registered id >", this.registeredUserObject.id);
    this.RegisterSubscription = this.ProfileService.DeleteUnActivatedAccount(this.registeredUserObject.id)
      .subscribe((result: any) => {
        if (result) {
          console.log("Deleted Successfuly");
        }
      });
  }
  //fun to check if the for has un saved changes and alert the user.
  CheckActivationFormDirty() {
    // check if current form is activation .
    this.ConfirmDialogService.confirm("Time is up!", "Your account will be automatically deleted if not activated.", "Ok", "Cancel", "sm")
      .then((confirmed) => {
        // console.log("registered user id > ", this.registeredUserObject.id);
        if (confirmed) {
          //delete account
          // this.DeleteUnActivatedAccount();
          this.route.navigate(['/']);
        }

      });
  }
  StartTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
      else {
        this.CheckActivationFormDirty();
        this.ClearTimer();
        return;
      }
    }, 1000);
  }
  ClearTimer() {
    console.log("Timer is finished :)");
    clearInterval(this.interval);
  }
  initateFormValidation() {
    this.regForm = this.fb.group({
      networks: this.fb.array([], [appValidation.checkboxListMinChecks]),
      // networks: ['', Validators.required],
      username: ['',
        [Validators.required, Validators.minLength(6)]
        , [appValidation.UniqueUserName(this.getProfileByUnameService)]
      ],
      password: ['',
        [Validators.required, Validators.minLength(6)]
      ],
      confirmPassword: ['',
        [Validators.required, Validators.minLength(6)]
      ],
      email: ['',
        [Validators.required, Validators.email],
        [appValidation.UniqueEmail(this.getProfileByUnameService)]
      ],
      fullName: ['',
        [Validators.required]
      ],
      location: ['',
        [Validators.required]
      ],
      state: ['',
        [Validators.required]
      ],
      city: ['',
        [Validators.required]
      ],
      gender: ['',
        [Validators.required]
      ]
      ,
      seekingGender: ['',
        [Validators.required]
      ]
      ,
      dateOfBirth: ['',
        [Validators.required, appValidation.dateRangeValidator]
      ],
      securityCode: ['',
        [Validators.required]
      ],
      captcha: [new FormControl({ disabled: true })]
      ,
      agreement: ['',
        [Validators.required]
      ]
    }, {
      validators:
        [
          appValidation.ConfirmPasswordValidator("password", "confirmPassword"),
          appValidation.ConfirmCaptchaValidator("captcha", "securityCode")
        ]
      , updateOn: 'change'
    });
    this.network = this.regForm.get('networks') as FormArray;
    this.network.push(new FormControl("Just Friends"));
  }
  onCheckboxChange(e) {
    let count: number = 0;
    if (e.target.checked) {
      this.network.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.network.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          this.network.removeAt(i);
          count++;
          return;
        }
        i++;
      });
    }
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Sign Up For Free | ispace1" },
      { name: 'description', content: "Use this form to sign up for a free account at ispace1" }
    ];
    this.meta.SetPageTitle("Sign Up For Free | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  Register(regForm: FormGroup, activationFrm?: NgForm) {
    this.registeredDataObject.userId = regForm.value["username"];
    this.registeredDataObject.password = regForm.value["password"];
    this.registeredDataObject.emailId = regForm.value["email"];
    this.registeredDataObject.validationKey = this.initateRandomText(8, this.randomCode);
    this.RegisterSubscription = this.ProfileService.RegisterUser(this.registeredDataObject)
      .subscribe((result: any) => {
        if (result) {
          console.log("Register Success");
          //create new profile in main profile table
          this.registeredUserObject = result[0];
          this.newProfileObject.user_Id = this.registeredUserObject.id;
          this.newProfileObject.fullName = regForm.value["fullName"];
          this.newProfileObject.sname = regForm.value["fullName"];
          this.newProfileObject.city = regForm.value["city"];
          this.newProfileObject.country = regForm.value["location"];
          this.newProfileObject.state = regForm.value["state"];
          this.newProfileObject.emailId = regForm.value["email"];
          this.newProfileObject.gender = regForm.value["gender"];
          this.newProfileObject.reporting = "Normal";
          this.newProfileObject.dob = new Date(regForm.value["dateOfBirth"]);
          this.newProfileObject.uName = regForm.value["username"];
          this.newProfileObject.Seeking = regForm.value["seekingGender"];
          this.newProfileObject.atype = "Personal";
          this.profileType = regForm.value["networks"];
          this.newProfileObject.profileType = this.profileType.toString();
          this.newProfileObject.authorizedPersonnel = "";
          //Add new profile
          console.log("Seeking gender> ", this.newProfileObject.Seeking);
          this.ProfileSubscription = this.ProfileService.CreateProfile(this.newProfileObject)
            .subscribe((result: any) => {
              if (result) {
                console.log("profile added successfuly");
                this.isSignUp = false;
                var mail = this.SetEmailObject();
                this.Subscription = (this.ProfileService.SendMail(mail))
                  .subscribe(() => {
                    console.log("email sent successfully");
                  });
                this.SetActivationForm(activationFrm);
                this.StartTimer();
                this.Toastr.success("Successfuly Registered, Please check your mail");
              }
            });
        }
      }, () => {
        this.isSignUp = true;
        console.log("Failed");
        this.Toastr.error("Register Failed");
      });
  }
  SetEmailObject(): appEmail {
    this.HTML = "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> You have successfully signed up with us!" + "<br />" + "</td></tr>";
    this.HTML += "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Following are your account details:" + "<br />" + "</td></tr>";
    this.HTML += "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Username: " + this.newProfileObject.uName; + "<br />" + "</td></tr>";
    this.HTML += "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Password: " + this.registeredUserObject.password + " <br />" + "</td></tr>";
    this.HTML += "<tr><td colspan='2'  style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Account Type: Personal <br />" + "</td></tr>";
    this.HTML += "<tr><td colspan='2'  style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Email Address: " + this.newProfileObject.emailId + " <br />" + "</td></tr>";
    this.HTML += "<tr><td colspan='2'  style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Location: " + this.newProfileObject.country + "- " + this.newProfileObject.state + " <br />" + "</td></tr>";
    this.HTML += "<tr><td colspan='2'  style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Full Name: " + this.newProfileObject.fullName + " <br />" + "</td></tr>";
    this.HTML += "<tr><td colspan='2'  style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Gender: " + this.newProfileObject.gender + " <br />" + "</td></tr>";
    this.HTML += "<tr><td colspan='2'  style=\"padding-top :5px;padding-left :5px;padding-bottom:5px;font-size: 12px;font-family: Verdana;color: #666666;\"> validation code: " + this.registeredUserObject.validationKey + " <br />" + "</td></tr>";
    this.Email.Subject = "Welcome to ispace1";
    this.Email.FullName = this.newProfileObject.fullName;
    this.Email.EmailAddress = this.newProfileObject.emailId;
    this.Email.Content = this.HTML;
    return this.Email;
  }
  ActivateAccount(activationForm) {
    let code = activationForm.value["activationCode"];
    console.log("ActivationCode>> ", activationForm.value["activationCode"]);
    console.log("this.registeredUserObject.validationKey>> ", this.registeredUserObject.validationKey);
    if (code === this.registeredUserObject.validationKey) {
      //Update data  in register and profile tables 
      this.Subscription = this.ProfileService.UpdateProfileStatusAfterRegister(this.registeredUserObject.id)
        .subscribe((result: any) => {
          if (result) {
            this.ClearTimer();
            this.isAcountActivated = true;

            this.route.navigate(['/Login'], { queryParams: { ac: '1' } })
          }
        });
    }
  }
  ResendActivationCode() {
    var mail = this.SetEmailObject();
    this.Subscription = (this.ProfileService.SendMail(mail))
      .subscribe(() => {
        console.log("email sent successfully");
      });
      this.resendActivationCode = true;
      return false;
  }
  //Generate randome text to use in captha or any random value.
  initateRandomText(length, randomCode) {
    var result = '';
    for (var i = length; i > 0; --i) result += randomCode[Math.floor(Math.random() * randomCode.length)];
    return result;
  }
  reloadCapthca() {
    this.regForm.get('captcha').setValue(this.initateRandomText(8, this.randomCode));
  }
  async BindCountries() {
    this.RegisterSubscription = (await this.CountryService.getAll())
      .subscribe((result: any) => {
        if (result) {
          this.CountriesList = result;
        }
      });
  }
  BindStates() {
    this.RegisterSubscription = this.CountryService.GetAllStates()
      .subscribe((result: any) => {
        if (result) {
          this.StatesList = result;
        }
      });
  }
  SelectCountry(event) {
    console.log(event.target.value);
    event.target.value.indexOf("United States of America") != -1 ? this.isUSA = true : this.isUSA = false;
  }
  //#endregion
}
