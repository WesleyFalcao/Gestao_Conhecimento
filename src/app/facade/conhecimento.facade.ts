import { Injectable } from "@angular/core";
import { LoginParams } from "../models/auth/login-params.model";
import { RegistrarParams } from "../models/auth/registrar-params.model";
import { AuthRepository } from "../repositories/auth.repository";

@Injectable({
    providedIn: "root"
})
export class ConhecimentoFacade {

    constructor(
        private authRepository: AuthRepository
        ) { 
            
        }

    Set_Login = (params: LoginParams) => this.authRepository.Set_Login(params) 
}