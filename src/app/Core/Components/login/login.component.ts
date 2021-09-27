import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { appMessageThreads } from 'Account/models/messages';
import { MessagesService } from 'Account/Services/messages.service';
import { ProfilesFavMeService } from 'Account/Services/profiles-fav-me.service';
import { ProfilesLikedMeService } from 'Account/Services/profiles-liked-me.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { appEmail } from 'Shared/models/email';
import { AuthService } from 'Shared/Services/auth.service';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

import { appRegister } from '../../models/register';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage = "";
  ActiveStatus = "";
  isOpenForgetPw: boolean;
  isRightgData = true;
  isClicked: boolean;
  isForgetPwClicked: boolean;
  jwtHelper: JwtHelperService;
  UserName = "";
  HTML = "";
  profileId = 0;
  subscribtion: Subscription;
  mesgSubscription: Subscription;
  isPw = true;
  dynamicType = "password";
  metaTags: MetaDefinition[] = [];
  registerData: appRegister = {} as appRegister;
  Email: appEmail = {} as appEmail;
  MesgsCount: appMessageThreads[] = [];
  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private Toster: ToastrService,
    private localStorage: LocalstorageService,
    private meta: MetaTagslService,
    private MessagesService: MessagesService,
    private ProfilesLikedMeS: ProfilesLikedMeService,
    private ProfilesFavMeS: ProfilesFavMeService
  ) {
    this.isClicked = false;
    this.isForgetPwClicked = false;
    this.isOpenForgetPw = false;
  }
  ngOnInit(): void {
    this.SetMetaTags();
    let ac = this.activeRoute.snapshot.queryParams["ac"];
    if (ac) {
      ac === "1" ? this.Toster.success("Successfuly Activated") : "";
    }
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Sign In To Access | ispace1" },
      { name: 'description', content: "Use this form to login to your account at ispace1" }
    ];
    this.meta.SetPageTitle("Sign In To Access | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  changeInputType() {
    this.isPw = !this.isPw;
    this.isPw ? this.dynamicType = "password" : this.dynamicType = "text"
  }
  async signIn(form: NgForm) {
    this.isClicked = true;
    this.subscribtion = (await this.authService.create(form.value))
      .subscribe((result: any) => {
        if (result) {
          this.localStorage.setItem('token', result.token);
          this.jwtHelper = this.authService.currentUser;
          if (this.jwtHelper) {
            this.UserName = this.jwtHelper['UserId'];
            this.ActiveStatus = this.jwtHelper['ActiveInactive'];
            this.profileId = +this.jwtHelper['ProfileId'];
          }
          if (this.ActiveStatus === "Active") {
            this.SetMessageCount();
            this.SetIntCount();
            this.router.navigate(['/Home/', this.UserName]);
          }
          else {
            this.Toster.error("This profile is deactivated by admin");
            this.isClicked = false;
          }
        }
      }
        , () => {
          this.isClicked = false;
          this.isRightgData = false;
          this.Toster.error("Invalid username or password");
        });
  }
  //Set mesg count
  async SetMessageCount() {
    let ThreadsCount = [];
    let MesgCount = 0;
    (await this.MessagesService.GetUnreadMessagesCount(this.MessagesService.getProfileId()))
      .subscribe((result: any) => {
        if (result.length > 0) {
          this.MesgsCount = result;
          for (let mesg of this.MesgsCount) {
            if (ThreadsCount.indexOf(mesg.threadId) === -1) {
              ThreadsCount.push(mesg.threadId);
            }
          }
          MesgCount = ThreadsCount.length;
        }
        this.localStorage.setItem("MesgCount", MesgCount.toString());
        this.MessagesService.GetMesgCount();
      });
  }
  //Set Int Count
  async SetIntCount() {
    let LikesCount; let FavCount
    (await this.ProfilesLikedMeS.getById(this.MessagesService.getProfileId()))
      .subscribe((result: any) => {
        if (result) {
          LikesCount = result.length;
          this.localStorage.setItem("LikesCount", LikesCount);
          console.log("Likes Int Count> " + LikesCount);
        }
      });
    (await this.ProfilesFavMeS.getById(this.MessagesService.getProfileId()))
      .subscribe((result: any) => {
        if (result) {
          FavCount = result.length;
          this.localStorage.setItem("FavCount", FavCount);
          console.log("Favs Int Count> " + FavCount);
        }
      });
    this.authService.GetInterestsCount();
  }
  Reset() {
    this.isRightgData = true;
  }
  openForgetPw() {
    this.isOpenForgetPw = !this.isOpenForgetPw;
  }
  async sendPw(frm: NgForm) {
    this.isForgetPwClicked = true;
    console.log(frm.value["Email"]);
    const data = { EmailId: frm.value["Email"] };
    this.subscribtion = (await this.authService.GetUserByEmail(data))
      .subscribe((result: any) => {
        this.registerData = result[0];
        console.log("user pw >> " + this.registerData.password);
        console.log("user user id >> " + this.registerData.userId);
        this.isForgetPwClicked = false;
        var mail = this.SetEmailObject();
        this.authService.SendMail(mail)
          .subscribe(() => {
            this.Toster.success("Please check your email", "Email sent");
            this.isOpenForgetPw = !this.isOpenForgetPw;
          });
      });
  }
  ngOnDestroy(): void {
    if (this.subscribtion) this.subscribtion.unsubscribe();
  }
  log(item) {
    console.log(item);
  }
  SetEmailObject(): appEmail {
    this.HTML = "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> We have received your request to retrieve your login information with us. " + "<br />" + "</td></tr>";
    this.HTML += "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Following is your login information: " + "<br />" + "</td></tr>";
    this.HTML += "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Username: <b>" + this.registerData.userId + "</b><br/></td></tr>";
    this.HTML += "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Password: <b>" + this.registerData.password + "</b><br/><br/></td></tr>";
    this.HTML += "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> <a style='text-decoration:none' href=http://www.ispaceone.com/Login>Please click here to login to your account.</a></b><br/><br/></td></tr>";
    this.Email.Subject = "Retrieve Password: here is your login information.";
    this.Email.FullName = this.registerData.userId;
    this.Email.EmailAddress = this.registerData.emailId;
    this.Email.Content = this.HTML;
    return this.Email;
  }
}
