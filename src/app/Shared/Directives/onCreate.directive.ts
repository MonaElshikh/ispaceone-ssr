import { Directive, EventEmitter, Output ,OnInit} from '@angular/core';
@Directive({
  selector: '[onCreate]'
})
export class onCreateDirective implements OnInit{
  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }
  ngOnInit(){
    this.onCreate.emit();
  }
}
