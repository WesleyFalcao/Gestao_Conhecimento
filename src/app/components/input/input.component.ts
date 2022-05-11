import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  /**@description Recebe o nome do label */
  @Input() nm_Label_Input: string = ""

  constructor() { }

  ngOnInit(): void {
  }

}
