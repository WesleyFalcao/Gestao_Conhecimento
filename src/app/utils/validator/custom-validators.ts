/**
 * @description Mostra as mensagens de acordo com o erro que é dado
 * @static
 * @param {string} fieldName Nome do Campo
 * @param {string} validatorName Nome da Validação
 * @param {*} [validatorValue] Valor da Validação
 * @returns
 */

import {Injectable} from '@angular/core';
import {AbstractControl, ValidatorFn} from '@angular/forms';
import {Split_By_String} from '../utils';

@Injectable({
    providedIn: 'root'
})

export class CustomValidators {

    constructor() {
    }

    getErrorMessage(fieldName: string, validatorName: string, validatorValue?: any) {
        const config = {
            'required': `Obrigatório.`,
            'bloqueado': 'Código bloqueado para alteração',
            'cpfInvalido': 'CPF inválido',
            'cnpjInvalido': 'CNPJ inválido',
            'cepInvalido': 'CEP inválido.',
            'emailInvalido': 'Email já cadastrado!',
            'pattern': 'Campo inválido',
            'email': 'Email inválido',
            'senhaDivergente': 'As senhas estão divergentes!',
            'mensagem': validatorValue,
        };

        return config[validatorName];
    }

    static validatorEmail(): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) {
                return null;
            }

            for (let aux of Split_By_String(control.value, ';,')) {
                if (/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(aux)) {
                    continue;
                } else {
                    return {pattern: true};
                }
            }

            return null;
        };
    }

    static validatorMaxDate(dt_Maximo: string): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) {
                return null;
            }

            if (control.value?.replace(/_/g, '').length >= 8) {
                if (new Date(control.value) > new Date(dt_Maximo)) {
                    return {mensagem: 'Data maior que o permitido'};
                }
            }

            return null;
        };
    }

    static validatorMinDate(dt_Minimo: string): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) {
                return null;
            }

            if (control.value?.replace(/_/g, '').length >= 8) {
                if (new Date(control.value) < new Date(dt_Minimo)) {
                    return {mensagem: 'Data maior que o permitido'};
                }
            }

            return null;
        };
    }

    static validatorNumeroCasa(): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) {
                return null;
            }

            if (control.value == 'SN' || (control.value != 0 && !isNaN(control.value))) {
                return null;
            } else {
                return {mensagem: 'Número de casa inválido'};
            }

            return null;
        };
    }

    static validatorConfirmarSenha(ds_Campo: string): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value || !control.root.get(ds_Campo)) {
                return null;
            }

            return control.value == control.root.get(ds_Campo).value ? null : {senhaDivergente: true};
        };
    }

    static validatorCelular(): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) {
                return null;
            }
            const value = control.value.replace(/\(|\)|-|_/g, '');
            return value && value.indexOf('_') == -1 && value.length == 11 && !['28111111111', '28222222222', '28333333333', '28444444444', '28555555555', '28666666666', '28777777777', '28888888888', '28999999999', '28000000000'].includes(value) ? null : {pattern: true};
        };
    }

    static validatorTelefone(): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) {
                return null;
            }
            const value = control.value.replace(/\(|\)|-|_/g, '');
            return value && value.indexOf('_') == -1 && (value.length == 8 || value.length == 10) && !['11111111', '22222222', '33333333', '44444444', '55555555', '66666666', '77777777', '88888888', '99999999', '00000000'].includes(value) ? null : {pattern: true};
        };
    }

    static validatorCPF(cpfZerado?: boolean): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value || !control.value.replace(/[^\d]+/g, '')) {
                return null;
            }
            let cpf = control.value.replace(/[^\d]+/g, '');
            if (cpfZerado && cpf == '00000000000') {
                return null;
            }
            // Elimina CPFs invalidos conhecidos
            if (cpf.length != 11 ||
                cpf == '00000000000' ||
                cpf == '11111111111' ||
                cpf == '22222222222' ||
                cpf == '33333333333' ||
                cpf == '44444444444' ||
                cpf == '55555555555' ||
                cpf == '66666666666' ||
                cpf == '77777777777' ||
                cpf == '88888888888' ||
                cpf == '99999999999') {
                return {cpfInvalido: true};
            }
            // Valida 1o digito
            let add = 0;
            for (let i = 0; i < 9; i++) {
                add += parseInt(cpf.charAt(i)) * (10 - i);
            }
            let rev = 11 - (add % 11);
            if (rev == 10 || rev == 11) {
                rev = 0;
            }
            if (rev != parseInt(cpf.charAt(9))) {
                return {cpfInvalido: true};
            }
            // Valida 2o digito
            add = 0;
            for (let i = 0; i < 10; i++) {
                add += parseInt(cpf.charAt(i)) * (11 - i);
            }
            rev = 11 - (add % 11);
            if (rev == 10 || rev == 11) {
                rev = 0;
            }
            if (rev != parseInt(cpf.charAt(10))) {
                return {cpfInvalido: true};
            }
            return null;
        };
    }

    static validatorCnpj(): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) {
                return null;
            }

            let cnpj = control.value.replace(/[^\d]+/g, '');

            if (cnpj == '') {
                return {cnpjInvalido: true};
            }


            if (cnpj.length != 14) {
                return {cnpjInvalido: true};
            }

            if (cnpj.indexOf('11111111') > -1 || cnpj.indexOf('0000000') > -1) {
                return null;
            }

            // Elimina CNPJs invalidos conhecidos
            if (cnpj == '00000000000000' ||
                cnpj == '11111111111111' ||
                cnpj == '22222222222222' ||
                cnpj == '33333333333333' ||
                cnpj == '44444444444444' ||
                cnpj == '55555555555555' ||
                cnpj == '66666666666666' ||
                cnpj == '77777777777777' ||
                cnpj == '88888888888888' ||
                cnpj == '99999999999999') {
                return {cnpjInvalido: true};
            }

            // Valida DVs
            let tamanho: number = cnpj.length - 2;
            let numeros = cnpj.substring(0, tamanho);
            let digitos = cnpj.substring(tamanho);
            let soma: number = 0;
            let pos = tamanho - 7;
            for (let i: number = tamanho; i >= 1; i--) {
                soma += Number.parseFloat(numeros.charAt(tamanho - i)) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }

            let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

            if (resultado != Number.parseFloat(digitos.charAt(0))) {
                return {cnpjInvalido: true};
            }

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;

            for (let i = tamanho; i >= 1; i--) {
                soma += Number.parseFloat(numeros.charAt(tamanho - i)) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

            if (resultado != Number.parseFloat(digitos.charAt(1))) {
                return {cnpjInvalido: true};
            }

            return null;
        };
    }

    static validatorCEP(): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) {
                return null;
            }

            if (control.value?.indexOf('.') != -1) {
                return control.value?.indexOf('_') == -1 && (control.value.length == 10) ? null : {pattern: true};
            } else {
                return control.value?.indexOf('_') == -1 && (control.value.length == 8) ? null : {pattern: true};
            }

        };
    }
}
