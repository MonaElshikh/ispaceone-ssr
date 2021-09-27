import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chars-counter',
  templateUrl: './chars-counter.component.html',
  styleUrls: ['./chars-counter.component.css']
})
export class CharsCounterComponent implements OnInit {
  @Input() usedChars: number = 0;
  @Input() maxChars: number = 0;
  constructor() { }
  ngOnInit(): void {
  }
}
