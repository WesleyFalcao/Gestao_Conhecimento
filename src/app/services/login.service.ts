import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { LoginParams } from "src/app/models/auth/login-params.model";
import { DataService } from "src/app/services/data.service";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { SubjectService } from "./subject.service";
import * as jwt_decode from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';

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

    /**@description Instância do jwtService */
    helper = new JwtHelperService()

    constructor(
        private dataService: DataService,
        private apollo: Apollo,
        private data: DataService,
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
                environment.CONS_URL_API,
                objBody,
                this.httpOptions
            )
            .toPromise();
    }

    async Set_Login(objLogin: LoginParams) {
        try {
            let res = await this._Execute(QUERY_LOGIN, objLogin)
            if (res.data.login.sucesso) {
                this.b_User_Authenticated = true
                this.dataService.Set_Local("token", res.data.login.accessToken)
                this.route.navigate(['/home'])
            } else {
                
                this.subjectService.subject_Exibindo_Snackbar.next({ message: (res.data.login.mensagem) })
            }
        } catch {
            this.data.Limpar_Local()
            this.subjectService.subject_Exibindo_Loading.next(false)
            this.subjectService.subject_Exibindo_Snackbar.next({ message: ("Não é possível acessar no momento") })
        }
    }

    Token_Expired() {
        const token = this.dataService.Get_Local("token")
        return this.helper.isTokenExpired(token);
    }

    Date_Expiration_Token() {
        const token = this.dataService.Get_Local("token")
        return this.helper.getTokenExpirationDate(token)
    }

    Name_User_Logged() {
        const token = this.dataService.Get_Local("token")
        const user = this.helper.decodeToken(token)
        return user.id
    }

    Id_User_Logged() {
        const token = this.dataService.Get_Local("token")
        const id_user = this.helper.decodeToken(token)
        return (id_user["https://hasura.io/jwt/claims"])["x-hasura-user-id"]
    }

    Name_Role() {
        const token = this.dataService.Get_Local("token")
        if (token == '{}') {
            return false
        }

        const role = this.helper?.decodeToken(token)
        return (role["https://hasura.io/jwt/claims"])["x-hasura-default-role"]
    }
}
