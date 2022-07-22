import {
    HttpErrorResponse, HttpEvent, HttpHandler,
    HttpInterceptor, HttpRequest, HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
// Para capturar as rotas
import { Router } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";
import { Observable, throwError } from "rxjs";
import { catchError, filter, tap } from "rxjs/operators";
import { SubjectService } from "src/app/services/subject.service";
import { DataService } from "../services/data.service";

@Injectable()
export class InterceptorService implements HttpInterceptor {

    constructor(
        private route: Router,
        private dataService: DataService,
        private subjectService: SubjectService
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((e: HttpErrorResponse) => {
                
                this.route.navigate(["/"]);
                this.subjectService.subject_Exibindo_Loading.next(false)

                return throwError(e)
            }),
            filter(e => e.type !== 0),
            tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        const errors = event.body.errors

                        if (errors) {
                            this.subjectService.subject_Exibindo_Loading.next(false)

                            let errorCode = errors[0].extensions.statusCode;

                            if (errorCode == 200) {
                                errors.find(err => {
                                    errorCode = err.extensions.statusCode;

                                    return errorCode != 200
                                });
                            }

                            //NAO AUTENTICADO OU TOKEN ESTA EXPIRADO
                            if (errorCode == 401) {
                                console.log("sessão expirada")
                                // Limpa dados da sessão
                                this.dataService.Limpar_Session();

                                this.subjectService.subject_Exibindo_Snackbar.next({ message: "Sessão Expirada, favor logar novamente" })

                                // Redireciona
                                this.route.navigate(["/"]).then(() => {
                                    setTimeout(() => this.subjectService.subject_Exibindo_Bar.next(false))
                                })

                            }
                            //BAD REQUEST - ALGUM ERRO DE PARAMETRO
                            else if (errorCode == 400) {
                                this.route.navigate(["/error"]);
                            }
                            //RECURSO NEGADO - O RECURSO NAO ESTA DISPONIVEL PARA ESTE PERFIL
                            else if (errorCode == 403) {
                                console.error(
                                    "O acesso a alguns recursos foi rejeitado",
                                    errors
                                );
                            }
                            //OUTROS ERROS NÃO MAPEADOS
                            // else {
                            //     Redireciona
                            //     this.route.navigate(["/"]);
                            // }

                            throw "Erro na Requisição"
                        }
                    }
                }
            )
        );
    }
}
