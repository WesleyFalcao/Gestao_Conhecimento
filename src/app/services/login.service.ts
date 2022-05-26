import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { LoginParams } from "src/app/models/auth/login-params.model";
import { DataService } from "src/app/services/data.service";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { SubjectService } from "./subject.service";

const QUERY_LOGIN = `mutation ($ds_Login: String, $ds_Senha: String){
    login:auth_login(params: { username: $ds_Login , password: $ds_Senha }) {
        sucesso
        accessToken
        mensagem
    }
}
`
@Injectable({
    providedIn: "root"
})

export class LoginService {
    httpOptions = {};

    /**@description Boolean para verificar a autenticação do usuário */
    b_User_Authenticated: boolean = false

    constructor(
        private dataService: DataService,
        private apollo: Apollo, private data: DataService,
        private http: HttpClient,
        private route: Router,
        private subjectService: SubjectService,
        ) {
    }

    _Execute(strQuery: string, variables: any, objHeaders: any = null) {
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

    async Set_Login(objLogin: LoginParams) {
        let res = await this._Execute(QUERY_LOGIN, objLogin)
        if (res.data.login.sucesso) {
            this.b_User_Authenticated = true
            this.dataService.Set_Local("token", res.data.login.accessToken)
            this.route.navigate(['/home']).then(() => {
                // setTimeout(() => this.subjectService.subject_Exibindo_Bar.next(true));
            });
        } else {
            this.subjectService.subject_Exibindo_Snackbar.next({message: (res.data.login.mensagem)})
        }
    }
}
