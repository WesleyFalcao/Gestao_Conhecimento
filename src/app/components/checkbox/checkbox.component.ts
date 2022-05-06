import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'uni-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})

export class CheckboxComponent implements OnInit {

    /** @description FormControl do Campo */
    @Input() control = new FormControl()

    constructor(
    ) {

    }

    ngOnInit() {
    }
}
