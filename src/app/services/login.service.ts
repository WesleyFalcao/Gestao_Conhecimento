import { Injectable } from "@angular/core";
import { LoginParams } from "src/app/models/auth/login-params.model";
import { DataService } from "src/app/services/data.service";
import { ConhecimentoFacade } from "../facade/conhecimento.facade";

@Injectable({
    providedIn: "root"
})
export class LoginService {
    constructor(
        private dataService: DataService,
        private conhecimentoFacade: ConhecimentoFacade) { }

    async Set_Login(objLogin: LoginParams) {
            const response = await this.conhecimentoFacade.Set_Login(objLogin)

        // if (response) {
        //     this.dataService.Set_Session("token", response.ds_Access_Token)
        //     this.dataService.Set_Session("subcontratos", response.subcontratos)
        // }
    }
}