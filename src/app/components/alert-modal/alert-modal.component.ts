import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-alert-modal',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

    /** @description Titulo do Modal */
    ds_Titulo: string

    /** @description Descrição do Modal */
    ds_Descricao: string

        /** @description Descrição do Modal */
        ds_Html: string

    /** @description Caminho do Icone */
    nm_Caminho_Icone: string

    constructor(private modal: NzModalRef) { }

    ngOnInit(): void {
    }

    Continuar() {
        this.modal.destroy()
    }
}
