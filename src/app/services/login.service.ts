import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { LoginParams } from "src/app/models/auth/login-params.model";
import { DataService } from "src/app/services/data.service";
import { ConhecimentoFacade } from "../facade/conhecimento.facade";
import { AuthRepository } from "../repositories/auth.repository";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class LoginService {
    httpOptions = {};

    constructor(
        private dataService: DataService,
        private authRepository: AuthRepository,
        private apollo: Apollo, private data: DataService,
        private http: HttpClient,
        private route: Router) {

        this.Preparar_HttpOptions();
    }

    Preparar_HttpOptions(objHeaders: any = null) {
        let token = this.data.Get_Session("token");

        if (objHeaders == null) {
            objHeaders = {
                "X-Source": "GESTAO-CONHECIMENTO",
            };
        }

        let headersCustom = new HttpHeaders(objHeaders).append(
            "Authorization",
            "Bearer " + token
        );

        this.httpOptions = {
            headers: headersCustom
        };
    }
    _Query(querys: string[], objHeaders = null) {
        this.Preparar_HttpOptions(objHeaders);

        let objBody = {
            query: "query { " + querys.join(" \r\n") + " }",
            variables: null
        };

        // Retorna o promise
        return this.http
            .post<any>(
                environment.CONS_URL_API_LOGIN,
                objBody,
                this.httpOptions
            )
            .toPromise();

    }


    _Mutation(strMutation: string, objHeaders: any = null) {
        this.Preparar_HttpOptions(objHeaders);

        let objBody = { query: `mutation { ${strMutation} }` };

        // Retorna o promise
        return this.http
            .post<any>(
                environment.CONS_URL_API_LOGIN,
                objBody,
                this.httpOptions
            )
            .toPromise();
    }

    _Execute(strQuery: string, variables: any, objHeaders: any = null) {
        this.Preparar_HttpOptions(objHeaders);

        let objBody = { query: `${strQuery}`, variables };

        // Retorna o promise
        return this.http
            .post<any>(
                environment.CONS_URL_API_LOGIN,
                objBody,
                this.httpOptions
            )
            .toPromise();
    }

    async Set_Login(objLogin: LoginParams){
        let query = `mutation ($ds_Login: String, $ds_Senha: String){
            login:auth_login(params: { username: $ds_Login , password: $ds_Senha }) {
                sucesso
                accessToken
            }
        }
        `
        let res = await this._Execute(query, objLogin)
        if(res.data.login.sucesso){
            this.dataService.Set_Session("token", res.data.login.accessToken)
            this.route.navigate(['/home']).then(() => {
                // setTimeout(() => this.subjectService.subject_Exibindo_Bar.next(true));
            });
        }else{
            return res.data.login.mensagem
            //snackbar 
        }
    }
}
