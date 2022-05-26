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
export class ApiHasuraService {
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

       _Execute(strQuery: string, objHeaders: any = null) {
        this.Preparar_HttpOptions(objHeaders);

        let objBody = { query: `${strQuery}` };

        // Retorna o promise
        return this.http
            .post<any>(
                environment.CONS_URL_API_HASURA,
                objBody,
                this.httpOptions
            )
            .toPromise();
    }
}
