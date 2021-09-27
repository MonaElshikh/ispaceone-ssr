import { Component, OnInit, Output,EventEmitter } from '@angular/core';
@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {
  randomCode: string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  captcha: string = "";
  @Output() captchaValue = new EventEmitter<string>();
  constructor() { }
  ngOnInit(): void {
    this.captcha = this.randomString(8, this.randomCode);
    this.passCaptchaValue(this.captcha);
  }
  //Generate Captcha code
  randomString(length, randomCode) {
    var result = '';
    for (var i = length; i > 0; --i) result += randomCode[Math.floor(Math.random() * randomCode.length)] + ' ';
    return result;
  }
  reloadCapthca() {
    this.captcha = this.randomString(8, this.randomCode);
  }
  passCaptchaValue(value: string) {
    this.captchaValue.emit(value);
    // console.log(value);
  }
}
