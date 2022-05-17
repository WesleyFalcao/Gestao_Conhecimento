import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'uni-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss']
})

export class TitleComponent implements OnInit {

    /** @description Titulo da página */
    @Input() ds_Titulo: string

    constructor() {
    }

    ngOnInit() {
    }


}
