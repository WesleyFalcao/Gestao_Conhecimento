import { Component, Input} from '@angular/core';

@Component({
    selector: 'uni-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss']
})

export class TitleComponent {

    /** @description Titulo da página */
    @Input() ds_Titulo: string 

}
