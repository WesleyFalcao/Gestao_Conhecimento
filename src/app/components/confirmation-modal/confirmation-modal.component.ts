import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

    /** @description Titulo do Modal */
    ds_Titulo: string

    /** @description Descrição do Modal */
    ds_Descricao: string

    /** @description Caminho do Icone */
    nm_Caminho_Icone: string

    constructor(private modal: NzModalRef) { }

    ngOnInit(): void {
    }

    Continuar() {
        this.modal.destroy(true)
    }

    Voltar() {
        this.modal.destroy(false)
    }
}
