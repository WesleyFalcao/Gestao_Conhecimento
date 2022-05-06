import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {startWith, takeUntil} from 'rxjs/operators';
import {SubjectService} from 'src/app/services/subject.service';
import {Mascaras} from 'src/app/utils/mascaras/mascaras.model';
import {Copiar_Clipboard, Get_Max_Length} from 'src/app/utils/utils';


@Component({
    selector: 'uni-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnInit, OnChanges, OnDestroy {

    /** @description Label do Campo */
    @Input() label: string;

    /** @description O campo é readonly? */
    @Input() readonly: boolean;

    /** @description Caso true, o campo é requerido */
    @Input() b_Requerido: boolean = false;

    /** @description FormControl do Campo */
    @Input() control = new FormControl();

    /** @description Valor do campo */
    @Input() value: string;

    /** @description Tipo do campo */
    @Input() type: string = 'text';

    /** @description Tipo de máscara */
    @Input() tp_Mask: string;

    /** @description Option do campo */
    @Input() options: { ds_Minimo: string, ds_Maximo: string };

    /** @description Permite ou nao mudar a mascara, por exemplo, celular ter ou nao DDD */
    @Input() b_Modificar_Mascara = true

    /** @description Ao ser pressionado algum botao no input e feito o retorno do evento */
    @Output() keydown = new EventEmitter();

    /** @description Unsub para o valuechanges */
    unsub = new Subject();

    /** @description Mascara do Input */
    mask: Array<string | RegExp> | { mask: boolean };

    constructor(
        private subjectService: SubjectService
    ) {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.tp_Mask) {
            this.Selecionar_Mascara();
        }
    }

    ngOnInit() {
        this.control.valueChanges.pipe(takeUntil(this.unsub), startWith(this.control.value)).subscribe(() => {
            if (this.control?.validator) {
                const validator = this.control.validator({} as AbstractControl);
                if (validator?.required) {
                    this.b_Requerido = true;
                } else {
                    this.b_Requerido = false;
                }
            } else {
                this.b_Requerido = false;
            }
        });

        this.Selecionar_Mascara();
    }

    Selecionar_Mascara() {
        switch (this.tp_Mask) {
            case 'cnpj':
                this.mask = Mascaras.CNPJ();
                break;
            case 'cpf':
                this.mask = Mascaras.CPF();
                break;
            case 'telefone':
                this.mask = Mascaras.Telefone();
                this.Mudar_Mascara();
                break;
            case 'celular':
                this.mask = Mascaras.Celular();
                this.Mudar_Mascara();
                break;
            case 'celular_com_DDD':
                this.mask = Mascaras.Celular_DDD();
                break;
            case 'telefone_sem_DDD':
                this.mask = Mascaras.Telefone();
                break;
            case 'cep':
                this.mask = Mascaras.CEP();
                break;
            case 'matricula':
                this.mask = Mascaras.Matricula();
                break;
            case 'porcentagem':
                this.mask = Mascaras.Porcentagem();
                break;
            case 'dinheiro':
                this.mask = Mascaras.Dinheiro();
                break;
            case 'inteiro':
                this.mask = Mascaras.Inteiro();
                break;
            case 'codigo':
                this.mask = Mascaras.Codigo(Get_Max_Length(this.control));
                break;
            case 'sem_caracter_especial':
                this.mask = Mascaras.mascaraMaxLength(Get_Max_Length(this.control), true);
                break;
            default:
                this.mask = Mascaras.mascaraMaxLength(Get_Max_Length(this.control));
                break;
        }
    }

    /**
     * @description Muda a mascara caso tenha DDD ou não
     */
    Mudar_Mascara() {
        if (this.b_Modificar_Mascara)
            this.control.valueChanges.pipe(takeUntil(this.unsub), startWith(this.control.value)).subscribe((value) => {
                if (this.tp_Mask == 'telefone') {
                    if (value?.replace(/[\(\)\-\_]/g, '').length <= 8) {
                        this.mask = Mascaras.Telefone();
                    } else {
                        this.mask = Mascaras.Telefone_DDD();
                    }
                } else if (this.tp_Mask == 'celular') {
                    if (value?.replace(/[\(\)\-\_]/g, '').length <= 9) {
                        this.mask = Mascaras.Celular();
                    } else {
                        this.mask = Mascaras.Celular_DDD();
                    }
                }
            });
    }

    /**
     * @description Ao pressionar algum botão, a função é executada e é modificada a mascara
     * @param {KeyboardEvent} evento
     */
    Keydown(evento: KeyboardEvent) {
        if (this.tp_Mask == 'telefone') {
            if (this.control.value?.replace(/[\(\)\-\_]/g, '').length == 8 && evento.key != 'BACKSPACE') {
                this.mask = Mascaras.Telefone_DDD();
            }
        } else if (this.tp_Mask == 'celular') {
            if (this.control.value?.replace(/[\(\)\-\_]/g, '').length == 9 && evento.key != 'BACKSPACE') {
                this.mask = Mascaras.Celular_DDD();
            }
        }

        this.keydown.emit(evento);
    }

    /**
     * @description Copia para o clipboard o valor
     * @param {string} valor
     */
    Copiar_Clipboard(valor: string) {
        Copiar_Clipboard(valor);
        this.subjectService.subject_Exibindo_Snackbar.next({message: 'O conteúdo foi copiado para o clipboard!'});
    }

    ngOnDestroy() {
        this.unsub.next();
        this.unsub.complete();
    }

}
