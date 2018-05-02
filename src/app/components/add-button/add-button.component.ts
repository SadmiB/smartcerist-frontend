import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {
  @Input() link;
  @Input() icon = "add";
  constructor() { }

  ngOnInit() {
  }

}
