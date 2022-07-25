import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'uni-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

    /** @description Index da Página */
    @Input() nr_Pagina = 1

    /** @description Variavel para guardar a quantidade de registros */
    @Input() nr_Registros = 0

    /** @description Variavel para guardar quantas linhas irão exibir na página */
    @Input() nr_Por_Pagina = 10

    /** @description Evento para retornar se o botão de paginação foi apertado */
    @Output() onPageChange = new EventEmitter();

    /** @description Páginas que estão sendo exibidas na tela */
    objArrayPaginasExibidas = [1, 2, 3, 4, 5]

    /** @description Objeto para fazer o for da Paginação */
    objArrayPaginas: number[] = []

    /** @description Quantidade de Paginas que tem a listagem */
    nr_Quantidade_Pagina: number = 1

    constructor() { }

    ngOnInit(): void {
        this.nr_Quantidade_Pagina = Math.ceil(this.nr_Registros / this.nr_Por_Pagina)
        this.objArrayPaginas = Array.from({ length: Math.ceil(this.nr_Registros / this.nr_Por_Pagina) }, (_, i) => i + 1)


        this.Fabricar_Array_Paginas()
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.Fabricar_Array_Paginas()
        this.objArrayPaginas = Array.from({ length: Math.ceil(this.nr_Registros / this.nr_Por_Pagina) }, (_, i) => i + 1)
    }

    @HostListener("document:keydown.arrowleft", ["$event"])
    Keydow_Arrow_Left(event: KeyboardEvent) {
        event.preventDefault()

        if (this.nr_Pagina != 1)
            this.Voltar_Pagina()
    }

    @HostListener("document:keydown.arrowright", ["$event"])
    Keydow_Arrow_Right(event: KeyboardEvent) {
        event.preventDefault()

        if (this.nr_Pagina < this.nr_Quantidade_Pagina)
            this.Avancar_Pagina()
    }

    @HostListener("document:keydown.home", ["$event"])
    Keydow_Home(event: KeyboardEvent) {
        event.preventDefault()

        this.Ir_Pagina(1)
    }

    @HostListener("document:keydown.end", ["$event"])
    Keydow_End(event: KeyboardEvent) {
        event.preventDefault()

        this.Ir_Pagina(this.nr_Quantidade_Pagina)
    }

    /**
     * @description Fabrica a visualização das Páginas
     */
    Fabricar_Array_Paginas() {
        this.nr_Quantidade_Pagina = Math.ceil(this.nr_Registros / this.nr_Por_Pagina)

        if (this.nr_Pagina > 2 && this.nr_Pagina < (this.nr_Quantidade_Pagina - 1)) {
            this.objArrayPaginasExibidas = [this.nr_Pagina - 2, this.nr_Pagina - 1, this.nr_Pagina, this.nr_Pagina + 1, this.nr_Pagina + 2]
        } else if (this.nr_Pagina == this.nr_Quantidade_Pagina && this.nr_Quantidade_Pagina > 5) {
            this.objArrayPaginasExibidas = [this.nr_Pagina - 4, this.nr_Pagina - 3, this.nr_Pagina - 2, this.nr_Pagina - 1, this.nr_Pagina]
        } else if (this.nr_Pagina == (this.nr_Quantidade_Pagina - 1) && this.nr_Quantidade_Pagina > 5) {
            this.objArrayPaginasExibidas = [this.nr_Pagina - 3, this.nr_Pagina - 2, this.nr_Pagina - 1, this.nr_Pagina, this.nr_Pagina + 1]
        } else if (this.nr_Pagina == 1) {
            this.objArrayPaginasExibidas = [1, 2, 3, 4, 5]
        }
    }

    /** @description Avança uma pagina */
    Avancar_Pagina() {
        this.nr_Pagina++

        this.Fabricar_Array_Paginas()

        this.onPageChange.emit(this.nr_Pagina)
    }

    /** @description Retorna uma pagina */
    Voltar_Pagina() {
        this.nr_Pagina--

        this.Fabricar_Array_Paginas()

        this.onPageChange.emit(this.nr_Pagina)
    }

    /** @description Vai para página selecionada */
    Ir_Pagina(nr_Pagina: number) {
        this.nr_Pagina = Math.ceil(nr_Pagina)

        this.Fabricar_Array_Paginas()

        this.onPageChange.emit(this.nr_Pagina)
    }
}
