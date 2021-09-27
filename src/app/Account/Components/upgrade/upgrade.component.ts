import { DatePipe, DecimalPipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { appCountry } from 'Shared/models/Country';
import { appEmail } from 'Shared/models/email';
import { appActiveUpgrade, appMembership, appPaymentInfo, appUpgrade } from 'Shared/models/LimitsAndUpgrade';
import { CountryService } from 'Shared/Services/country.service';
import { LimitsAndUpgradeService } from 'Shared/Services/limits-upgrade.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit, OnDestroy {
  //#region DECARATION 
  isExpiredMembership: boolean;
  ShowJustUpgradeButton = false;
  isUpgradeHistoryExpand = false;
  isAdditionalProductsExpand = false;
  isPaymentDetailsExpand = false;
  isContributionHistoryExpand = false;
  showArticleBackRecords = false;
  showTrustSealRecords = false;
  isUpgrade = false;
  isBasic = false;
  isPremuim = false;
  isPlus = false;
  isExclusive = false;
  validCouponCodeMesg = false;
  upgradeDone = false;
  UpgradeStatus = "";
  AccountType = "";
  UpgradeState = "";
  PaymentFor = "N/A";
  SelectedPlan = "Free";
  PaymentAmount = "0";
  CreditType = "";
  ExpireMonth = "";
  ExpireYear = "";
  CreditNumber = "";
  CvvNumber = "";
  RequestStatus = "";
  code = "";
  discount = 0;
  percentage = "";
  MembershipChoosenValue = "";
  paymentName = "";
  paymentStreet = "";
  paymentCity = "";
  paymentState = "";
  paymentZipcode = "";
  paymentPhone = "";
  transactionId = "";
  paymentEmail = "";
  paymentCoupon = "";
  paymentCountry = "";
  UpgradeToOption = "";
  UpgradeType = "";
  UpgradeTo = "";
  UpgradeDuration = "";
  couponCode = "";
  HTML = "";
  ExpirationDate: Date;
  ActivationDate: Date;
  expDate: Date;
  fullNameRemaningChars = 0;
  cityRemaningChars = 0;
  stateRemaningChars = 0;
  zipRemaningChars = 0;
  validCouponCode = true;
  showDiscountdetails = true;
  ApplyCoponCode = false;
  Price: any;
  priceAfterDiscount: any;
  discountValue: any;
  totalAmount: any;
  Period: string;
  ProfilePaymentInfo: appPaymentInfo = {} as appPaymentInfo;
  RequestUpgrade: appUpgrade = {} as appUpgrade;
  UpgradeHistoryList: appActiveUpgrade[] = [];
  MembershipDetails: appMembership[] = [];
  PremiumMembership: appMembership[] = [];
  FeatureMembership: appMembership[] = [];
  CountriesList: appCountry[] = [];
  metaTags: MetaDefinition[] = [];
  selectedPrem = [];
  selectedFeat = [];
  countryObject: appCountry = {} as appCountry;
  Email: appEmail = {} as appEmail;
  UpgradeSubscription: Subscription;
  public payPalConfig?: IPayPalConfig;
  //#endregion
  //#region  EVENTS
  constructor(
    private LimitsAndUpgradeService: LimitsAndUpgradeService
    , private route: Router
    , private CountryService: CountryService
    , private meta: MetaTagslService
    , private toasterS: ToastrService
    , private datePipe: DatePipe
    , private numberPipe: DecimalPipe
    , private Toster: ToastrService
    , @Inject(PLATFORM_ID) private platformId: any) { }
  ngOnInit(): void {
    this.BindUpgradeHistory();
    this.GetMemberShipDetails();
    this.SetMetaTags();
  }
  ngOnDestroy() {
    if (this.UpgradeSubscription) this.UpgradeSubscription.unsubscribe();
  }
  //#endregion
  //#region FUNCTIONS
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Upgrade  | ispace1" }
    ];
    this.meta.SetPageTitle("Upgrade  | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  toggleUpgradeBoxes(boxName: string) {
    switch (boxName) {
      case 'UpgradeHistory':
        this.isUpgradeHistoryExpand = !this.isUpgradeHistoryExpand;
        this.isAdditionalProductsExpand = false;
        this.isPaymentDetailsExpand = false;
        this.isContributionHistoryExpand = false;
        break;
      case 'AdditionalProducts':
        this.isAdditionalProductsExpand = !this.isAdditionalProductsExpand;
        this.isUpgradeHistoryExpand = false;
        this.isPaymentDetailsExpand = false;
        this.isContributionHistoryExpand = false;
        break;
      case 'PaymentDetails':
        this.isPaymentDetailsExpand = !this.isPaymentDetailsExpand;
        this.isAdditionalProductsExpand = false;
        this.isUpgradeHistoryExpand = false;
        this.isContributionHistoryExpand = false;
        break;
      case 'ContributionHistory':
        this.isContributionHistoryExpand = !this.isContributionHistoryExpand;
        this.isAdditionalProductsExpand = false;
        this.isPaymentDetailsExpand = false;
        this.isUpgradeHistoryExpand = false;
        break;
    }
  }
  BindProfilePaymentInfo() {
    this.UpgradeSubscription = this.LimitsAndUpgradeService.GetProfilePaymentInfo(this.LimitsAndUpgradeService.getProfileId())
      .subscribe((result: any) => {
        if (result) {
          this.BindCountries();
          this.ProfilePaymentInfo = result[0];
          if (this.ProfilePaymentInfo != null && this.ProfilePaymentInfo != undefined) {
            this.paymentName = this.ProfilePaymentInfo.fullName;
            this.paymentStreet = this.ProfilePaymentInfo.street;
            this.paymentState = this.ProfilePaymentInfo.state;
            this.paymentCity = this.ProfilePaymentInfo.city;
            this.paymentPhone = this.ProfilePaymentInfo.phone;
            this.paymentEmail = this.ProfilePaymentInfo.emailId;
            this.paymentZipcode = this.ProfilePaymentInfo.zipCode;
            this.paymentCoupon = this.ProfilePaymentInfo.couponCode;
            this.paymentCountry = this.ProfilePaymentInfo.country;
            this.ProfilePaymentInfo.paymentFor != null
              ? this.PaymentFor = this.ProfilePaymentInfo.paymentFor
              : this.PaymentFor = this.PaymentFor;
            this.ProfilePaymentInfo.paymentAmount != null
              ? this.PaymentAmount = this.ProfilePaymentInfo.paymentAmount
              : this.PaymentAmount = this.PaymentAmount;
            this.ProfilePaymentInfo.creditType != null
              ? this.CreditType = this.ProfilePaymentInfo.creditType
              : this.CreditType = this.CreditType;
            this.ProfilePaymentInfo.creditNumber != null
              ? this.CreditNumber = this.ProfilePaymentInfo.creditNumber
              : this.CreditNumber = this.CreditNumber;
            this.ProfilePaymentInfo.expirationMoth != null
              ? this.ExpireMonth = this.ProfilePaymentInfo.expirationMoth
              : this.ExpireMonth = this.ExpireMonth;
            this.ProfilePaymentInfo.expirationYear != null
              ? this.ExpireYear = this.ProfilePaymentInfo.expirationYear
              : this.ExpireYear = this.ExpireYear;
            this.ProfilePaymentInfo.cVVNumber != null
              ? this.CvvNumber = this.ProfilePaymentInfo.cVVNumber
              : this.CvvNumber = this.CvvNumber;
            console.log("Country>> " + this.paymentCountry);
            this.bindUsedChars();
          }
        }
      });
  }
  BindUpgradeHistory() {
    this.UpgradeSubscription = this.LimitsAndUpgradeService.GetUpgradeHistory(this.LimitsAndUpgradeService.getProfileId())
      .subscribe((result: any) => {
        if (result) {
          this.UpgradeHistoryList = result;
          if (this.UpgradeHistoryList.length > 0) {
            this.UpgradeStatus = this.UpgradeHistoryList[this.UpgradeHistoryList.length - 1].adminStatus;
            this.UpgradeTo = this.UpgradeHistoryList[this.UpgradeHistoryList.length - 1].upgradeTo;
            this.UpgradeType = this.UpgradeHistoryList[this.UpgradeHistoryList.length - 1].upgradeType;
            this.Period = this.UpgradeHistoryList[this.UpgradeHistoryList.length - 1].period;
            this.RequestStatus = this.UpgradeHistoryList[this.UpgradeHistoryList.length - 1].requestStatus;
            this.UpgradeDuration = this.UpgradeHistoryList[this.UpgradeHistoryList.length - 1].upgradeType + " " + this.UpgradeHistoryList[this.UpgradeHistoryList.length - 1].period;
            this.ExpirationDate = this.UpgradeHistoryList[this.UpgradeHistoryList.length - 1].expirationDate;
            this.ActivationDate = this.UpgradeHistoryList[this.UpgradeHistoryList.length - 1].activationDate;
            this.CheckExpiredMembership();
            this.BuildUpgradeInfo();
          }
          else {
            this.isBasic = true;
            this.SelectedPlan = "Free";
            this.UpgradeState = "Free";
            this.isExpiredMembership = true;
          }
        }
      });
  }
  bindUsedChars() {
    this.ProfilePaymentInfo.fullName ? this.fullNameRemaningChars = this.ProfilePaymentInfo.fullName.length : this.fullNameRemaningChars = 0;
    this.ProfilePaymentInfo.city ? this.cityRemaningChars = this.ProfilePaymentInfo.city.length : this.cityRemaningChars = 0;
    this.ProfilePaymentInfo.state ? this.stateRemaningChars = this.ProfilePaymentInfo.state.length : this.stateRemaningChars = 0;
    this.ProfilePaymentInfo.zipCode ? this.zipRemaningChars = this.ProfilePaymentInfo.zipCode.length : this.zipRemaningChars = 0;
  }
  async BindCountries() {
    this.UpgradeSubscription = (await this.CountryService.getAll())
      .subscribe((result: any) => {
        if (result) {
          this.CountriesList = result;
        }
      });
  }
  CountriesChange(event) {
    this.paymentCountry = event.target.value;
    console.log("Country Name>> " + this.paymentCountry);
  }
  SavePaymentInfo() {
    this.ProfilePaymentInfo = {} as appPaymentInfo;
    this.ProfilePaymentInfo.profileId = +this.LimitsAndUpgradeService.getProfileId();
    this.ProfilePaymentInfo.country = this.paymentCountry;
    this.ProfilePaymentInfo.fullName = this.paymentName;
    this.ProfilePaymentInfo.emailId = this.paymentEmail;
    this.ProfilePaymentInfo.couponCode = this.paymentCoupon;
    this.ProfilePaymentInfo.zipCode = this.paymentZipcode;
    this.ProfilePaymentInfo.firstName = "";
    this.ProfilePaymentInfo.lastName = "";
    this.ProfilePaymentInfo.street = "";
    this.ProfilePaymentInfo.state = "";
    this.ProfilePaymentInfo.city = "";
    this.ProfilePaymentInfo.phone = "";
    this.ProfilePaymentInfo.creditType = "";
    this.ProfilePaymentInfo.creditNumber = "";
    this.ProfilePaymentInfo.expirationMoth = "";
    this.ProfilePaymentInfo.expirationYear = "";
    this.ProfilePaymentInfo.cVVNumber = "";
    this.UpgradeSubscription = this.LimitsAndUpgradeService.InsertUpdateProfilePaymentInfo(this.ProfilePaymentInfo)
      .subscribe((result: any) => {
        if (result) {
          console.log("success");
        }
      });
  }
  GetMemberShipDetails() {
    this.UpgradeSubscription = this.LimitsAndUpgradeService.GetMemberShipDetails()
      .subscribe((result: any) => {
        if (result) {
          this.MembershipDetails = result;
          console.log(this.MembershipDetails);
          this.PremiumMembership = this.MembershipDetails.filter(premium => premium.name === "Premium");
          this.FeatureMembership = this.MembershipDetails.filter(feature => feature.name === "Featured");
        }
        // this.ModifymembershipPeriod(this.PremiumMembership);
        // this.ModifymembershipPeriod(this.FeatureMembership);
      });
  }
  CheckExpiredMembership() {
    if (this.UpgradeStatus.toLowerCase().indexOf("approved") != -1) {
      this.isExpiredMembership = false;
    }
    else {
      this.isExpiredMembership = true;
    }
    console.log("expired> " + this.isExpiredMembership);
  }
  ChangeSelection(item: appMembership, Membership: string) {
    switch (Membership) {
      case "Premium":
        this.MembershipChoosenValue = "Premium";
        this.UpgradeToOption = "Premium";
        this.PaymentFor = "Premium";
        this.SelectedPlan = "Premium";
        break;
      case "Featured":
        this.MembershipChoosenValue = "Featured";
        this.UpgradeToOption = "Featured";
        this.PaymentFor = "Featured";
        this.SelectedPlan = "Featured";
        break;
      default:
        this.MembershipChoosenValue = "";
        this.SelectedPlan = "Free";
        break;
    }
    let durationValues = item.duration.split(" ", item.duration.length)
    this.UpgradeType = durationValues[0];
    this.Period = durationValues[1];
    this.PaymentAmount = this.numberPipe.transform(item.price, "1.2");
    this.Price = item.price;
    this.PaymentFor += " For " + this.UpgradeType + " " + this.Period;
    this.code = item.couponCode;
    this.discount = item.discount;
    this.percentage = item.percentamount;
    console.log("this.UpgradeType> " + this.UpgradeType);
    console.log("Period> " + this.Period);
    console.log("PaymentAmount> " + this.PaymentAmount);
    console.log("Price" + this.Price);
  }
  SetSelectedUpgradeButtonStyle(rowIndex: number, Mempership: string) {
    this.ClearUpgradeButtonsStyle();
    switch (Mempership) {
      case "Premium":
        this.selectedPrem[rowIndex] = !this.selectedPrem[rowIndex];
        break;
      case "Featured":
        this.selectedFeat[rowIndex] = !this.selectedFeat[rowIndex];
        break;
    }
  }
  ClearUpgradeButtonsStyle() {
    for (let i = 0; i < this.FeatureMembership.length; i++) {
      this.selectedFeat[i] = false;
    }
    for (let i = 0; i < this.PremiumMembership.length; i++) {
      this.selectedPrem[i] = false;
    }
  }
  UpgradeAccount() {
    console.log("transactionId:", this.RequestUpgrade.transactionId);
    this.RequestUpgrade.profileId = +this.LimitsAndUpgradeService.getProfileId();
    this.UpgradeToOption != "" ? this.RequestUpgrade.upgradeTo = this.UpgradeToOption : this.RequestUpgrade.upgradeTo = "";
    this.UpgradeType != "" ? this.RequestUpgrade.upgradeType = this.UpgradeType : this.RequestUpgrade.upgradeType = "";
    this.Period != "" ? this.RequestUpgrade.period = this.Period : this.RequestUpgrade.period = "";
    // this.transactionId !== "" ? this.RequestUpgrade.transactionId = this.transactionId : this.RequestUpgrade.transactionId = "";
    this.ApplyCoponCode ? this.priceAfterDiscount : this.Price
    if (this.ApplyCoponCode) {
      this.RequestUpgrade.price = this.priceAfterDiscount;
    }
    else {
      this.RequestUpgrade.price = this.Price;
    }
    this.UpgradeSubscription = this.LimitsAndUpgradeService.RequestUpgrade(this.RequestUpgrade)
      .subscribe((result: any) => {
        if (result) {
          this.BindUpgradeHistory();
          this.BuildUpgradeInfo();
          this.validCouponCodeMesg = false;
          this.CancelUpgrade(true);
          this.upgradeDone = true;
          var mail = this.SetEmailObject();
          this.LimitsAndUpgradeService.SendMail(mail)
            .subscribe(() => {
              this.Toster.success("Please check your email", "Upgraded Successfuly");
            });
        }
      });
  }
  SetEmailObject(): appEmail {
    this.HTML = "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Your account has been upgraded." + "<br />" + "</td></tr>";
    this.HTML += "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Following is your upgrade information: " + "</b><br />" + "</td></tr>";
    this.HTML += "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Upgraded to: <b>" + this.UpgradeToOption + "</b><br /></td></tr>";
    this.HTML += "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Upgrade period: <b>" + this.UpgradeType + " " + this.Period + "</b><br /></td></tr>";
    this.HTML += "<tr><td colspan='2' style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\"> Upgrade price: <b>" + this.Price + "</b><br/><br /></td></tr>";
    this.Email.Subject = "Your account has been upgraded.";
    this.Email.FullName = this.LimitsAndUpgradeService.getSname();
    this.Email.EmailAddress = this.LimitsAndUpgradeService.getEmail();
    this.Email.Content = this.HTML;
    return this.Email;
  }
  SelectPlan() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollBy(0, 250);
    }
    this.isUpgrade = true;
    this.isPaymentDetailsExpand = true;
    this.initConfig();
  }
  applyCouponCode() {
    console.log("code>", this.couponCode);
    if (this.code === this.couponCode) {
      this.discountValue = (this.Price * this.discount) / 100;
      this.priceAfterDiscount = this.Price - this.discountValue;
      this.totalAmount = "$" + this.Price;
      this.PaymentAmount +=
        " - " + "$" + this.numberPipe.transform(this.discountValue, "1.2") + " (" + this.numberPipe.transform(this.discount, "1.2") + "% Coupon Code) = Total Amount: $" +
        this.numberPipe.transform(this.priceAfterDiscount, "1.2");
      this.validCouponCodeMesg = true;
      this.validCouponCode = true;
      this.showDiscountdetails = false;
      this.ApplyCoponCode = true;
      this.couponCode = "";
    }
    else {
      this.priceAfterDiscount = this.Price;
      this.validCouponCode = false;
      this.validCouponCodeMesg = false;
      this.showDiscountdetails = true;
      this.ApplyCoponCode = false;
      this.couponCode = "";
    }
  }
  CancelUpgrade(isUpgraded?: boolean) {
    if (isUpgraded) {
      this.isExpiredMembership = false;
    } else {
      this.isExpiredMembership = true;
    }
    this.MembershipChoosenValue = "";
    this.couponCode = "";
    this.SelectedPlan = "Free";
    this.isBasic = true;
    this.isUpgrade = false;
    this.isPremuim = false;
    this.isPlus = false;
    this.isExclusive = false;
    this.isPaymentDetailsExpand = false;
    this.showDiscountdetails = false;
    this.validCouponCodeMesg = false;
    this.ApplyCoponCode = false;
    this.ClearUpgradeButtonsStyle();
  }
  BuildUpgradeInfo() {
    if (this.UpgradeTo === "Featured" && this.UpgradeStatus === "Approved") {
      if (this.RequestStatus.toLowerCase().indexOf("expired") != -1
        || this.RequestStatus.toLowerCase().indexOf("payment is not clear") != -1) {
        this.UpgradeState = " Free";
        this.SelectedPlan = "Free";
        this.isBasic = true;
      }
      else {
        this.isPlus = true;
        this.isBasic = false;
        this.isPremuim = false;
        this.isExclusive = false;
        this.SelectedPlan = "Featured";
        this.UpgradeState = " Featured " + this.UpgradeType + " " + this.Period;
        this.AccountType = " ("
          + this.datePipe.transform(this.ActivationDate, "MMM d, y") + " - "
          + this.datePipe.transform(this.ExpirationDate, "MMM d, y") + ")";
      }
    }
    else if (this.UpgradeTo === "Premium" && this.UpgradeStatus === "Approved") {
      if (this.RequestStatus.toLowerCase().indexOf("expired") != -1
        || this.RequestStatus.toLowerCase().indexOf("payment is not clear") != -1) {
        this.UpgradeState = "Free";
        this.SelectedPlan = "Free";
      }
      else {
        this.isPremuim = true;
        this.isBasic = false;
        this.isPlus = false;
        this.isExclusive = false;
        this.SelectedPlan = "Premium";
        this.UpgradeState = " Premium " + this.UpgradeType + " " + this.Period;
        this.AccountType = " ("
          + this.datePipe.transform(this.ActivationDate, "MMM d, y") + " - "
          + this.datePipe.transform(this.ExpirationDate, "MMM d, y") + ")"
      }
    }
    else if ((this.UpgradeTo === "" || this.UpgradeTo === null) && (this.UpgradeStatus === "" || this.UpgradeStatus === null)) {
      this.isBasic = true;
      this.isPremuim = false;
      this.isPlus = false;
      this.isExclusive = false;
      this.UpgradeState = " Free";
      this.SelectedPlan = "Free";
    }
    else {
      this.isBasic = true;
      this.isPremuim = false;
      this.isPlus = false;
      this.isExclusive = false;
      this.SelectedPlan = "Free";
      this.UpgradeState = " Free";
    }
  }
  //payment method
  initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'ATETftfGfsod2Rj76LofSQFc5YPDXb7rxR-mMYX9NjfwDw8XdJcYXoFsR1VqE9S7gnWj3eTaM5oqTJ89',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.ApplyCoponCode ? this.priceAfterDiscount : this.Price,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: this.ApplyCoponCode ? this.priceAfterDiscount : this.Price
                }
              }
            },
            items: [{
              name: 'ispaceone',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: this.ApplyCoponCode ? this.priceAfterDiscount : this.Price,
              },
            }]
          }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
        size: 'responsive',
        color: 'blue',
        shape: 'rect',
      },
      onApprove: (data, actions) => {
        actions.order.get().then(details => {
          //read values
          let Status = details["status"];
          this.paymentName = details["purchase_units"][0]["shipping"]["name"]["full_name"];
          this.paymentEmail = details["payer"]["email_address"];
          this.paymentCountry = details["purchase_units"][0]["shipping"]["address"]["country_code"];
          this.paymentZipcode = details["purchase_units"][0]["shipping"]["address"]["postal_code"];
          this.RequestUpgrade.transactionId = details["id"];
          if (Status === "APPROVED") {
            console.log("order Status:", Status);
            this.SavePaymentInfo();
            this.UpgradeAccount();
          }
        });
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.CancelUpgrade();
      },
      onError: err => {
        console.log('OnError', err);
        this.CancelUpgrade();
        this.toasterS.error("Somthing wrong, Please try again");
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
  //#endregion
}
