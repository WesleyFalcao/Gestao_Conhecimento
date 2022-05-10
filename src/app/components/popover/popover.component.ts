import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

b_Popover: boolean = false

  @Input() b_Show_Popover: boolean

  constructor() { }

  ngOnInit(): void {
  }

}
