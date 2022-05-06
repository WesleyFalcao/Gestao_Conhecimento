import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LoginParams } from "src/app/models/auth/login-params.model";

@Injectable({
    providedIn: "root"
})
export class LoginForm {

    constructor(private formBuilder: FormBuilder) {
    }

    get Get_Form() {
        return this.formBuilder.group({
            ds_Login: [null, [Validators.required]],
            ds_Senha: [null, [Validators.required]]
        })
    }
}
