import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd/modal';

@Component({
    selector: 'uni-selection-modal',
    templateUrl: './selection-modal.component.html',
    styleUrls: ['./selection-modal.component.scss']
})

export class SelectionModalComponent implements OnInit {

    /** @description Label do Input */
    label: string

    /** @description Array de Itens para listar */
    objArrayItens: any[] = []

    /** @description Array de Itens já selecionados */
    objArrayCamposSelecionados: any[] = []

    /** @description Campo que será usado como Descrição */
    nm_Descricao = "nm_Nome"

    /** @description Campo que será usado como Descrição */
    nm_Subtitulo = "ds_Descricao"

    /** @description Valor da Pesquisa */
    value: string

    /** @description Controlador do Checkbox */
    b_Controlador_Checkbox = false
    /** @description Se a tabela vai permitir multi seleção */
    b_Multiselect = false

    /** @description Nome do campo que é utilizado como exibição (Auxilia no multiselect) */
    nm_Campo_Exibicao: string = ""

    /** @description Instância de Filtro */
    @ViewChild("inputFiltro") input_Filtro: ElementRef

    constructor(private modal: NzModalRef) {
    }

    ngOnInit() {
        setTimeout(() =>
            this.input_Filtro.nativeElement.focus(), 1000)

        if (this.b_Multiselect && this.objArrayCamposSelecionados) {

            this.objArrayCamposSelecionados.forEach(element => {
                this.objArrayItens.find(item => item?.[this.nm_Campo_Exibicao] == element?.[this.nm_Campo_Exibicao])._checkbox = true
            });
        }

    }

    /**
     * @description Retorna o item selecionado pelo usuário
     * @param {any} item
     */
    Selecionar(item: any) {
        if (!this.b_Multiselect)
            this.modal.close(item)
        else
            item._checkbox = !item._checkbox;
    }

    Fechar() {
        if (this.objArrayItens.length > 0 && this.b_Multiselect) {
            this.modal.close(this.objArrayItens.filter(element => element._checkbox))
        } else {
            this.modal.close()
        }
    }

    Limpar() {
        this.value = '';

        this.objArrayItens.forEach(element => {
            element._checkbox = false
        });
    }

    Confirmar() {
        if (this.objArrayItens.length > 0 && this.b_Multiselect) {
            this.modal.close(this.objArrayItens.filter(element => element._checkbox))
        } else {
            this.modal.close()
        }
    }
}
