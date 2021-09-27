import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MetaDefinition } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { appEmail } from 'Shared/models/email';
import { AuthService } from 'Shared/Services/auth.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  remarksRemaningChars: number = 0;
  fullNameRemainingChars: number = 0;
  companyNameRemainingChars: number = 0;
  emailRemainingChars: number = 0;
  phoneRemainingChars: number = 0;
  metaTags: MetaDefinition[] = [];
  Email: appEmail = {} as appEmail;
  HTML: string = "";
  constructor(
    private meta: MetaTagslService,
    private authService: AuthService,
    private Toster: ToastrService,
  ) { }
  ngOnInit(): void {
    this.SetMetaTags();
  }
  sendContactUsData(frm: NgForm) {
    console.log(frm.value);
    var mail = this.SetEmailObject(frm);
    this.authService.SendMail(mail)
      .subscribe(() => {
        this.Toster.success("Your inquiry sent successfully");
      });
  }
  SetEmailObject(frm: NgForm): appEmail {
    this.HTML = "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> These are the data provided by the website's user: " + " <br /><br />" + "</td></tr>";
    this.HTML += "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Company Name: " + frm.value["CompanyName"] + " <br /><br />" + "</td></tr>";
    this.HTML += "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Full Name: " + frm.value["FullName"] + " <br /><br />" + "</td></tr>";
    this.HTML += "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Email: " + frm.value["EmailAddress"] + " <br /><br />" + "</td></tr";
    this.HTML += "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Phone No: " + frm.value["Phone"] + " <br /><br />" + "</td></tr>";
    this.HTML += "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Subject: " + frm.value["Subject"] + " <br /><br />" + "</td></tr>"
    this.HTML += "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Remarks: " + frm.value["remarks"] + " <br /><br />" + "</td></tr>";
    this.Email.Subject = "New Inquiry";
    this.Email.FullName = "ispace1's Administrator";
    this.Email.EmailAddress = "supney@supney.com";
    this.Email.Content = this.HTML;
    return this.Email;
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Contact Us | ispace1" },
      { name: 'description', content: "Use this form to contact user support at ispace1" }
    ];
    this.meta.SetPageTitle("Contact Us | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
}
