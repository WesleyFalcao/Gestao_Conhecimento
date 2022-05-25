import { Injectable } from "@angular/core";
import { LoginParams } from "../models/auth/login-params.model";
import { Login } from "../models/auth/login.model";
import { RegistrarParams } from "../models/auth/registrar-params.model";
import { AuthQuery } from "../queries/auth.query";
import { ApiService } from "../services/hasura.service";
import { DataService } from "../services/data.service";
import { SubjectService } from "../services/subject.service";

@Injectable({
    providedIn: "root"
})

export class AuthRepository {

    /** @description Options da Requisição */
    httpOptions: any;

    constructor(
        private subjectService: SubjectService,
        private apiService: ApiService,
        private authQuery: AuthQuery,
        private dataService: DataService,
    ) {
    }

    async Set_Login(params: LoginParams) {
        this.subjectService.subject_Exibindo_Loading.next(true)
        const query = this.authQuery.Set_Login()
        // const response = await this.apiService.Mutation([query], { params }, this.httpOptions)
        // this.subjectService.subject_Exibindo_Loading.next(false)
    }
}
