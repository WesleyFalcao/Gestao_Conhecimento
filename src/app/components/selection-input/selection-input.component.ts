import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { SelectionModalComponent } from './selection-modal/selection-modal.component';


@Component({
    selector: 'uni-selection-input',
    templateUrl: './selection-input.component.html',
    styleUrls: ['./selection-input.component.scss']
})

export class SelectionInputComponent implements OnInit, OnDestroy {

    /** @description Label do Input */
    @Input() label: string

    /** @description Nome do campo para retorno */
    @Input() ds_Campo_Retorno: string = "chave"

    /** @description Nome do Campo para mostrar no imput */
    @Input() ds_Campo_Exibicao: string = "nm_Nome"

    /** @description FormControl do Campo */
    @Input() control = new FormControl()

    /** @description Function para Carregar o Array */
    @Input() fCarregamento: Function

    /** @description Componente para inserir no modal */
    @Input() objModalParams: any = { component: SelectionModalComponent, nr_Width: 390 }

    /** @description Caso true, o campo é requerido */
    @Input() b_Requerido: boolean = false

    /** @description Caso true, permite selecionar mais de um item */
    @Input() b_Multiselect: boolean = false

    /** @description Caso o usuário deseja reotrnar o objeto inteiro é só colocar esse campo como true */
    @Input() b_Retornar_Objeto: boolean = false;

    /** @description Caso o usuário deseja reotrnar o objeto inteiro é só colocar esse campo como true */
    @Input() objArraySelecionados: any = [];

    /** @description Guarda o objeto selecionado pelo usuário */
    private objSelecionado = null

    /** @description Unsub para destruir o subject */
    private unsub = new Subject()

    /** @description FormControl auxiliar */
    control_Aux = new FormControl()

    constructor(private modalService: NzModalService,
        private dataService: DataService) {
    }

    ngOnInit() {

        if (this.control.validator) {
            const validator = this.control.validator({} as AbstractControl);
            if (validator?.required) {
                this.b_Requerido = true;
            }

            this.control_Aux.validator = this.control.validator
        }

        this.control.valueChanges.pipe(
            takeUntil(this.unsub),
        ).subscribe(async (value) => {
            if (value == null) {
                this.control_Aux.setValue(null)
            } else {
                const objArrayItens = await this.fCarregamento?.() ?? []

                if (typeof (value) != "object" && !Array.isArray(value)) {
                    if (objArrayItens.length > 0) {
                        const objAchado = objArrayItens.find(element => element[this.ds_Campo_Retorno] == value)?.[this.ds_Campo_Exibicao]

                        if (objAchado)
                            this.control_Aux.setValue(objAchado)
                    }
                    else if (this.objSelecionado) {
                        this.control_Aux.setValue(this.objSelecionado?.[this.ds_Campo_Exibicao])
                    }
                } else if (!Array.isArray(value))
                    this.control_Aux.setValue(value?.[this.ds_Campo_Exibicao])
            }
        })

        this.control.statusChanges.pipe(
            takeUntil(this.unsub)
        ).subscribe(async (value) => {

            if (this.control.status != this.control_Aux.status && this.control_Aux.enabled) {
                this.control_Aux.disable()
            } else if (this.control_Aux.disabled) {
                this.control_Aux.enable()
            }
        })
    }

    async Carregar() {
        if (this.control.enabled) {
            this.control.markAllAsTouched()
            this.control_Aux.markAllAsTouched()

            const objArrayItens = await this.fCarregamento?.() ?? []

            const objStorage: any = this.dataService.Get_Session(this.ds_Campo_Exibicao);

            if (objStorage?.length > 0) {
                this.objArraySelecionados = objStorage
            }

            const modal = this.modalService.create({
                nzClosable: false,
                nzFooter: null,
                nzWidth: this.objModalParams.nr_Width,
                nzContent: this.objModalParams.component,
                nzComponentParams: this.objModalParams.objParamsComponent ?? { label: this.label, objArrayItens, nm_Descricao: this.ds_Campo_Exibicao, b_Multiselect: this.b_Multiselect, objArrayCamposSelecionados: this.objArraySelecionados, nm_Campo_Exibicao: this.ds_Campo_Exibicao },
                nzStyle: window.innerHeight <= 768 ? { top: "20px" } : null,
                nzClassName: this.objModalParams.nm_Class ?? "selection-modal",
                nzWrapClassName: "center-modal",
            });

            const response = await modal.afterClose.toPromise()

            if (this.b_Multiselect) {

                if (response.length > 0) {
                    this.objArraySelecionados = response
                    this.control.setValue(response.map(e => e?.[this.ds_Campo_Retorno]))
                    this.control_Aux.setValue(response?.map(e => e?.[this.ds_Campo_Exibicao]).join(', ') ?? "")
                    this.dataService.Set_Session(this.ds_Campo_Exibicao, this.objArraySelecionados);
                }
            } else {

                this.objSelecionado = response;

                this.control_Aux.setValue(response?.[this.ds_Campo_Exibicao] ?? null)

                if (this.b_Retornar_Objeto) {
                    this.control.setValue(response)
                } else {
                    this.control.setValue(response?.[this.ds_Campo_Retorno] ?? null)
                }
            }
        }
    }

    Remover_Valor(event: KeyboardEvent) {
        event.preventDefault()
        event.stopPropagation()

        this.control.setValue(null)
        this.control_Aux.setValue(null)
    }

    ngOnDestroy() {
        this.unsub.next()
        this.unsub.complete()
    }

}
