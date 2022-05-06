import * as IMask from 'imask';


export class MaskedCurrency extends IMask.MaskedPattern {
    // @ts-ignore
    get typedValue() {
        // @ts-ignore
        return (this.maskedBlock('d') as any).typedValue;
    }

    // @ts-ignore
    set typedValue(num) {
        // @ts-ignore
        (this.maskedBlock('d') as any).typedValue = num;
    }
}

export class Mascaras {
    public static CNPJ(): any {
        return {
            mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
        };
    }

    public static NumeroCasa(): any {
        return {
            mask: [/\d|s|S/, /\d|n|N/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
            guide: false
        };
    }

    public static CPF(): any {
        return {
            mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
        };
    }

    public static Telefone(): any {
        return {
            mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        };
    }

    public static Celular(): any {
        return {
            mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        };
    }

    public static Telefone_DDD(): any {
        return {
            mask: ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        };
    }

    public static Celular_DDD(): any {
        return {
            mask: ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        };
    }

    public static CEP(): any {
        return {
            mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
        };
    }

    public static Matricula(): any {
        return {
            mask: [/\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, '-', /\d/],
        };
    }

    public static Porcentagem(precisao: number = 2, isSigned = false): any {
        // @ts-ignore
        return new MaskedCurrency({
            mask: 'd %',
            lazy: false,
            blocks: {
                d: {
                    mask: Number,
                    thousandsSeparator: '.',
                    radix: ',',
                    scale: precisao,
                    signed: isSigned,
                    normalizeZeros: true,
                    padFractionalZeros: true,
                    mapToRadix: ['.'],
                    commit: (string: string, masked: any) => {
                        if (!string) {
                            masked._value = '0,00';
                        }
                    }
                },
            },
        });
    }

    public static Inteiro(precisao: number = 0): any {
        // @ts-ignore
        return new MaskedCurrency({
            mask: 'd',
            lazy: false,
            blocks: {
                d: {
                    mask: Number,
                    thousandsSeparator: '.',
                    radix: ',',
                    scale: precisao,
                    signed: false,
                    normalizeZeros: true,
                    padFractionalZeros: precisao == 0 ? false : true,
                    mapToRadix: ['.'],
                    commit: (string: string, masked: any) => {
                        if (!string) {
                            masked._value = '0';
                        }
                    }
                },
            },
        });
    }

    public static Dinheiro(precisao: number = 2, hasPrefix = true, isSigned = false, padFractional = true): any {
        // @ts-ignore
        return new MaskedCurrency({
            mask: hasPrefix ? 'R$ d' : 'd',
            lazy: false,
            blocks: {
                d: {
                    mask: Number,
                    thousandsSeparator: '.',
                    radix: ',',
                    scale: precisao,
                    signed: isSigned,
                    normalizeZeros: true,
                    padFractionalZeros: padFractional,
                    mapToRadix: ['.'],
                    autofix: true,

                    commit: (string: string, masked: any) => {
                        if (!string) {
                            masked._value = '0,00';
                        }
                    }
                },
            },
        });
    }

    /**
     * @description Faz a mascara para aceitar tudo, entretanto limitar os campos
     * @param maxLength MaxLength para o campo
     */
    public static mascaraMaxLength(maxLength: number = 30, b_Caracter_Especial = false): any {
        let mascara = [];

        !maxLength ? maxLength = 9999 : maxLength;

        for (let i = 0; i < maxLength; i++) {
            if (b_Caracter_Especial) {
                mascara.push(/[a-zA-Z0-9 ]/);
            } else {
                mascara.push(/./);
            }
        }

        return {mask: mascara, guide: false};
    }

    /**
     * @description Faz a mascara para aceitar tudo, entretanto limitar os campos
     * @param maxLength MaxLength para o campo
     */
    public static Codigo(maxLength: number = 30): any {
        let mascara = [];

        !maxLength ? maxLength = 9999 : maxLength;

        for (let i = 0; i < maxLength; i++) {
            mascara.push(/\d/);
        }

        return {mask: mascara, guide: false};
    }
}
