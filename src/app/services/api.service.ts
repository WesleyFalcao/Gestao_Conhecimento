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
    async Query(querys: QueryModel[], objVariables: any, objHeaders = null) {
        this.Preparar_HttpOptions(objHeaders);
        let ds_Header = "query"

        if (querys.some(element => element.header != null && element.header.length > 0)) {
            ds_Header += "("

            const objArrayQuery = []

            // for (let query of querys) {
            //     for (let header of query.header) {
            //         if (!objArrayQuery.some(element => element.field == header.field))
            //             objArrayQuery.push(header)
            //     }
            // }

            // ds_Header += objArrayQuery.map(element => element.field + ":" + element.type).join(" ")
            // ds_Header += ")"
        }

        const query = querys.map(element => element.query).join(" \r\n")

        // Retorna o promise
        // return Copy(
        //     (await this.apollo.query({ query: gql`${ds_Header} {${query}}`, variables: objVariables })
        //         .toPromise()).data
        // );

    }

    /**
     * @description Mutation
     * @param {QueryModel[]} mutations
     * @param {*} objVariables
     * @param {*} [objHeaders=null]
     * @return {*}
     */
    async Mutation(mutations: QueryModel[], objVariables: any, objHeaders = null) {
        this.Preparar_HttpOptions(objHeaders);
        let ds_Header = "mutation"

        if (mutations.some(element => element.header)) {
            ds_Header += "("

            const objArrayQuery = []

            // for (let query of mutations) {
            //     for (let header of query.header) {
            //         if (!objArrayQuery.some(element => element.field == header.field))
            //             objArrayQuery.push(header)
            //     }
            // }

            // ds_Header += objArrayQuery.map(element => element.field + ":" + element.type).join(" ")
            // ds_Header += ")"
        }

        const query = mutations.map(element => element.query).join(" \r\n")

        // Retorna o promise
        // return Copy(
        //     (await this.apollo.mutate({ mutation: gql`${ds_Header} {${query}}`, variables: objVariables })
        //         .toPromise()).data
        // );

    }

    Post({ url, body }: { url: string, body: any }) {
        this.Preparar_HttpOptions()

        return this.http.post<any>(environment.CONS_URL_APIBASE + url, body, this.httpOptions).toPromise()
    }
}
