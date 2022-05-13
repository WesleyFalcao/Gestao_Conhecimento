import { NgModule } from "@angular/core";
import { BytesPipe } from "./bytes.pipe";

@NgModule({
    declarations: [BytesPipe],
    exports: [BytesPipe],
})
export class BytesModule { }