import { Component, OnInit, OnChanges, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent implements OnChanges {
  @Input() passwordToCheck: string;
  barLabel: string;
  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;
  bar4: string;
  private colors = ['#FF0000', '#800000', '#800080', '#0000FF', '#008000'];
  private static measureStrength(pass: string) {
    let score = 0;
    // award every unique letter until 5 repetitions  
    let letters = {};
    for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }
    // bonus points for mixing it up  
    let variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass),
    };
    let variationCount = 0;
    for (let check in variations) {
      variationCount += (variations[check]) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    return Math.trunc(score);
  }
  private getColor(score: number) {
    let idx = 0;
    if (score > 90) {
      idx = 4;
    } else if (score > 70) {
      idx = 3;
    } else if (score >= 40) {
      idx = 2;
    } else if (score >= 20) {
      idx = 1;
    }
    return {
      idx: idx + 1,
      col: this.colors[idx]
    };
  }
  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    var password = changes['passwordToCheck'].currentValue;
    // console.log('pw>> ' + password);
    this.setBarColors(5, '#DDD');
    if (password) {
      let c = this.getColor(PasswordStrengthComponent.measureStrength(password));
      this.setBarColors(c.idx, c.col);
    }
  }
  private setBarColors(count, col) {
    for (let _n = 0; _n < count; _n++) {
      this['bar' + _n] = col;
      this.setPasswordStrengthlabel(col);
     
    }
  }
  setPasswordStrengthlabel(col) {
    if(col =="#DDD"){
      this.barLabel = "Password strength:";
    }
    if (col == "#FF0000") {
      this.barLabel = "Password strength: Weakest";
    }
    else if (col == "#800000") {
      this.barLabel = "Password strength: Weak";
    }
   else if (col == "#800080" ) {
      this.barLabel = "Password strength: Medium";
    }
    else if (col == "#0000FF" ) {
      this.barLabel = "Password strength: Strong";
    }
    else if (col == "#008000" ) {
      this.barLabel = "Password strength: Strongest";
    }
  }
}
