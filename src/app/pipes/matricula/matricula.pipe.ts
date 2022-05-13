import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'Matricula'
})
export class MatriculaPipe implements PipeTransform {
    transform(matricula: string): string {
        if (matricula) {
            if (matricula.length == 17) {
                return `${matricula.slice(0, 4)}.${matricula.slice(4, 8)}.${matricula.slice(8, 14)}.${matricula.slice(14, 16)}-${matricula.slice(16)}`;
            } else if (matricula.length == 11) {
                return `${matricula.substr(0, 3)}.${matricula.substr(3, 3)}.${matricula.substr(6, 3)}-${matricula.substr(9, 2)}`;
            } else if (matricula.length == 14) {
                return `${matricula.substr(0, 2)}.${matricula.substr(2, 3)}.${matricula.substr(5, 3)}/${matricula.substr(8, 4)}-${matricula.substr(12, 2)}`;
            }
        }

        return matricula
    }
}