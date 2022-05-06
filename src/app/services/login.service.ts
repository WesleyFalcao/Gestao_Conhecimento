import { Injectable } from "@angular/core";
import { EmpresaFacade } from "src/app/facade/conhecimento.facade";
import { LoginParams } from "src/app/models/auth/login-params.model";
import { DataService } from "src/app/services/data.service";

@Injectable({
    providedIn: "root"
})
export class LoginService {
    constructor(
        private dataService: DataService,
        private empresaFacade: EmpresaFacade) { }

    async Set_Login(objLogin: LoginParams) {
            const response = await this.empresaFacade.Set_Login(objLogin)

        // if (response) {
        //     this.dataService.Set_Session("token", response.ds_Access_Token)
        //     this.dataService.Set_Session("subcontratos", response.subcontratos)
        // }
    }
}