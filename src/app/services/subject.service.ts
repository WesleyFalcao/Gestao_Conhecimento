import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ISnackbar } from "../components/snackbar/snackbar.component";

@Injectable({
    providedIn: "root"
})
export class SubjectService {

    /** @description Subject que controla o Appbar */
    subject_Click_Search = new BehaviorSubject(false);

    /** @description Subject que controla o Appbar */
    subject_Exibindo_Bar = new BehaviorSubject(false);

    /** @description Subject que controla o Snackbar */
    subject_Exibindo_Snackbar = new BehaviorSubject<ISnackbar>({ message: "", milliseconds: 3000 });

    /** @description Subject que controla o Loading */
    subject_Exibindo_Loading = new BehaviorSubject(false);

    /**@description Subject para alteração na largura da tela */
    subject_Width = new BehaviorSubject(0);

    /**@description Subject para monitorar quando o modal foi aberto */
    subject_Modal = new BehaviorSubject(false);
}
