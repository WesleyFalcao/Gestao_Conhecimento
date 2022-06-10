import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})
export class DateService {

    Get_Date() {
        const data = new Date()
        const dia = String(data.getDate()).padStart(2, '0')
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const dataAtual = ano + '-' + mes + '-' + dia;
        return dataAtual
    }
}
