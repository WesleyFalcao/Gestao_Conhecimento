import { CurrencyPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";
import "moment/locale/pt-br";

@Pipe({
    name: "formatDate"
})
export class FormatDatePipe implements PipeTransform {
    transform(value: any, args: any): any {

        if (value == null) {
            return value;
        }

        let data = moment(value);
        let dataFormatada;

        // Se a data não for válida, possivelmente data em formato pt-br, transformo para padrão us
        if (!data.isValid()) {
            data = moment(value.substr(6, 4) + "-" + value.substr(3, 2) + "-" + value.substr(0, 2) + "" + value.substr(10));
        }

        switch (args) {
            case "MMM":
                dataFormatada = data.format("MMM");
                break;
            case "MMMM":
                dataFormatada = data.format("MMMM");
                break;
            case "ddd":
                dataFormatada = data.format("ddd");
                break;
            case "DD":
                dataFormatada = data.format("DD");
                break;
            case "DDMMM":
                dataFormatada = data.format("DD") + " " + data.format("MMM");
                break;
            case "HHmm":
                dataFormatada =
                    data.format("HH") + ":" + data.format("mm") + "h";
                break;
            case "YY":
                dataFormatada = data.format("YY");
                break;
            case "YYYY":
                dataFormatada = data.format("YYYY");
                break;
            case "DDMMYYYY":
                dataFormatada = data.format("DD/MM/YYYY");
                break;
            case "full":
                dataFormatada =
                    data.format("DD/MM/YYYY") + " " +
                    data.format("HH:mm")
                break;
            case "MMMYY":
                dataFormatada = data.format("MMM") + "/" + data.format("YY");
                break;
            case "NOW":
                dataFormatada = data.fromNow();
                break;
        }

        return dataFormatada;
    }
}