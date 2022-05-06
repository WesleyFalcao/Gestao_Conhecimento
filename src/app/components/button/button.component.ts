import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'uni-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})

export class ButtonComponent implements OnInit {

    /** @description Elemento do botão */
    @ViewChild("button", { static: true }) button: ElementRef;

    /** @description Class para o botão */
    @Input() buttonClass: string;

    /** @description Type do Button */
    @Input() type: string = "button";

    /** @description Caso o botão esteja desativado, a variavel será true */
    @HostBinding('class.disabled')
    @Input() disabled: boolean = false;

    /** @description Retorna o evento de Click para o componente pai */
    @Output() click = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    /**
    * @description Ao pressionar o botão de AcessKey é feito o click do botão
    */
    enviarEvento(evento: MouseEvent) {
        if (!this.disabled) {
            this.click.emit(evento);
            evento.preventDefault()
            evento.stopPropagation();
        } else {
            evento.preventDefault()
            evento.stopPropagation();
        }
    }
}
