import { Component, OnInit } from "@angular/core";

export interface ISnackbar {
    message: string
    milliseconds?: number
}

@Component({
    selector: "snackbar",
    templateUrl: "./snackbar.component.html",
    styleUrls: ["./snackbar.component.scss"]
})
export class SnackbarComponent implements OnInit {

    /** @description Mensagem que irá aparecer na tela */
    ds_Mensagem: string

    /** @description Variável que controla o snackbar  */
    b_Exibindo_Snackbar: boolean = false;

    constructor() { }

    ngOnInit() { }

    show(message: string) {
        var check = document.querySelector(".snackbar.show");

        if (!check) {
            var div = document.getElementsByClassName("snackbar");

            // Places a size class according to the size of the string
            if (message.length > 28) {
                if (message.length <= 35) {
                    div[0].className += " snackbar-md";
                } else {
                    div[0].className += " snackbar-lg";
                }
            }

            div[0].className += " show";
            this.ds_Mensagem = message;
        }
    }

    hide(time: number) {
        var div = document.querySelector(".snackbar.show");

        if (div) {

            div.className += " hide";

            setTimeout(() => {
                div!.className = "snackbar";
                this.ds_Mensagem = "";
            }, 300);
        }
    }

    timer(message: string, milliseconds: number = 3000) {
        this.b_Exibindo_Snackbar = true

        setTimeout(() => {
            let t = this;

            this.show(message);

            setTimeout(function () {
                t.hide(milliseconds);
            }, milliseconds);

            setTimeout(() => { this.b_Exibindo_Snackbar = false }, milliseconds + 400)
        })
    }
}
