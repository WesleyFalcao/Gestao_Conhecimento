import { CurrencyPipe } from '@angular/common';
import {
    Injector,
    Pipe,
    PipeTransform
} from '@angular/core';


@Pipe({
    name: 'dynamicPipe'
})
export class DynamicPipe implements PipeTransform {

    public constructor(private injector: Injector,
        private cp: CurrencyPipe) {
    }

    transform(value: any, pipeToken: any, pipeArgs: any[]): any {
        if (!pipeToken) {
            return value;
        }
        else if (pipeToken == CurrencyPipe) {

            return this.cp.transform(value, "BRL", "symbol", "1.2-2")
        }
        else {
            let pipe = this.injector.get(pipeToken);
            return pipe.transform(value, pipeArgs);
        }
    }
}