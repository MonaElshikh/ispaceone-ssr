import { Component, OnInit ,Input} from '@angular/core';
@Component({
  selector: 'app-custom-fields',
  templateUrl: './custom-fields.component.html',
  styleUrls: ['./custom-fields.component.css']
})
export class CustomFieldsComponent implements OnInit {
  customFields = [];
  deleteRecord = [];
  labels = [];
  values = [];
  showedRecords: number = 0;
  constructor() { }
  ngOnInit(): void {
  }
  addRemoveCustomFileds(rowIndex, Action) {
    switch (Action) {
      case 'add':
        if (this.showedRecords < 8) {
          this.customFields.push(rowIndex);
          this.deleteRecord[rowIndex] = false;
          this.showedRecords += 1;
        }
        break;
      case 'remove':
        this.deleteRecord[rowIndex] = true;
        this.showedRecords > 0 ? this.showedRecords -= 1 : this.showedRecords = 0;
        break;
    }
  }
}
