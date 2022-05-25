import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { environment } from "src/environments/environment";
import { QueryModel } from "../models/query/query.model";
import { Copy } from "../utils/utils";
import { DataService } from "./data.service";

@Injectable({
    providedIn: "root"
})
export class ApiService {
    httpOptions = {};

    constructor(
        private apollo: Apollo, private data: DataService,
        private http: HttpClient,
    ) {
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

    /**
    * @description Executa uma ou várias consultas GraphQL
    * @param querys Array de strings com as querys GraphQL
    * @param objHeaders Objeto de headers HTTP
    */
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

    /**
     * @description Mutation
     * @param {QueryModel[]} mutations
     * @param {*} objVariables
     * @param {*} [objHeaders=null]
     * @return {*}
     */

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

    Post({ url, body }: { url: string, body: any }) {
        this.Preparar_HttpOptions()

        return this.http.post<any>(environment.CONS_URL_APIBASE + url, body, this.httpOptions).toPromise()
    }
}
