export class TabelaColuna {
    /** @description Nome da Classe de CSS da Coluna */
    nm_Class?: string;
    /** @description Nome que irá aparecer na tabela */
    nm_Nome: string;
    /** @description Nome do atributo para colocar a informação em tela */
    nm_Atributo?: string;
    /** @description Nome do atributo para colocar a informação em tela */
    html?: string;
    /** @description Options do Pipe */
    pipeOptions?: { pipe: any, args: any }

    nr_Width?: string;

    onClick?: (linha: any, event: MouseEvent) => void

    mouseOver?: (linha: any, event: MouseEvent) => void

    mouseLeave?: (linha: any, event: MouseEvent) => void
}