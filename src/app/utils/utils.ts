import {FormControl, FormGroup} from "@angular/forms";

/**
 * @description Retorna um Date a partir de uma string
 * @export
 * @param {string} dh_Date
 * @return {*}
 */
export function String_To_Date(dh_Date: string, ds_Split: string = "/") {
    return new Date(`${dh_Date.split(ds_Split)[1]}/${dh_Date.split(ds_Split)[0]}/${dh_Date.split(ds_Split)[2]} 00:00:00`)
}

/**
 * @description Retorna um Date a partir de uma string
 * @export
 * @param {string} dh_Date
 * @return {*}
 */
export function String_To_Date_Time(dh_Date: string, ds_Split: string = "/") {
    return new Date(`${dh_Date.split(ds_Split)[1]}/${dh_Date.split(ds_Split)[0]}/${dh_Date.split(ds_Split)[2]}`)
}

export function To_Dash_Date(dt_Date: Date) {
    return `${dt_Date.toLocaleDateString().split("/")[2]}-${dt_Date.toLocaleDateString().split("/")[1]}-${dt_Date.toLocaleDateString().split("/")[0]}`
}

export function Get_Max_Length(control: FormControl) {
    if (!control.validator) {
        return null;
    }

    let bigString = "";
    for (let i = 0; i < 5002; i++) {
        bigString += "A";
    }

    // let controlAux = new FormControl(bigString);
    // let validator = control.validator(controlAux);

    // if (validator && validator.maxlength) {
    //     return validator.maxlength.requiredLength;
    // } else {
    //     return null
    // }
    return 
}

/**
 * @description Separa um array a partir de vários separadores
 * @export
 * @param {string} source String que será feito o corte
 * @param {string} splitBy Separadores
 * @returns
 */
export function Split_By_String(source: string, splitBy: string) {
    var splitter: any = splitBy.split('');
    splitter.push([source]); //Push initial value

    return splitter.reduceRight((accumulator: string[], curValue: string) => {
        var k: any = [];
        accumulator.forEach(v => k = [...k, ...v.split(curValue)]);
        return k;
    });
}

/**
 * @description Transforma número para mês escrito
 * @export
 * @param {string} numero Número do mês
 * @returns
 */
export function Number_To_Month(numero: number | string) {
    numero = Number(numero)

    const objArrayMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    return objArrayMeses[numero - 1]
}

export function Copy(object: any) {
    return JSON.parse(JSON.stringify(object))
}

/**
 * @description Copia para o clipboard o valor
 * @param {string} valor
 */
export function Copiar_Clipboard(valor: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = valor;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
}

/**
 * @description Faz o distinct do array
 * @export
 * @param {[]} objArray Array para efetuar o distinct
 * @param {string} ds_Campo_Retorno nome do campo para fazer o distinct
 * @returns
 */
export function Distinct(objArray: any[], ds_Campo_Retorno: string[]) {
    return objArray.filter((element, i, arr) => {
        return arr.indexOf(arr.find(t => {
            let b_Validado = true;
            for (let aux of ds_Campo_Retorno) {
                b_Validado = t[aux] === element[aux]
                if (!b_Validado) break;
            }

            return b_Validado
        })) === i;
    });
}


/**
 * @description Calcula a idade da pessoa
 * @export
 * @param {Date} dt_Nascimento
 * @return {*}
 */
export function Calcular_Idade(dt_Nascimento: Date) {
    var now = new Date();
    var current_year = now.getFullYear();
    var year_diff = current_year - dt_Nascimento.getFullYear();
    var birthday_this_year = new Date(current_year, dt_Nascimento.getMonth(), dt_Nascimento.getDate());
    var has_had_birthday_this_year = (now >= birthday_this_year);

    return has_had_birthday_this_year
        ? year_diff
        : year_diff - 1;
}

/**
* @description Função para debugar FormGroup que está com os campos inválidos
* @param resourceForm FormGruop que será analisado
* @param tempo Tempo que o SetInterval vai dar console.log
*/
export function Get_Invalid_Controls(resourceForm: FormGroup, tempo: number = 5000) {
    setInterval(() => {
        let invalid = [];
        for (const name in resourceForm.controls) {
            // if (resourceForm.controls[name].invalid) {
            //     invalid.push({ nome: name, valor: resourceForm.controls[name].value, formControl: resourceForm.controls[name] });
            // }
        }
    }, tempo)
}
