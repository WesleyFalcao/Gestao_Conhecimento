import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SubjectService } from 'src/app/services/subject.service';
import { SugestoesService } from '../sugestoes.service';

@Component({
  selector: 'app-sugestoes',
  templateUrl: './sugestoes.component.html',
  styleUrls: ['./sugestoes.component.scss']
})
export class SugestoesComponent implements OnInit {

  /**@description Recebe o array de sugestões */
  obj_Array_Sugestoes

  /**@description Título da página */
  ds_Titulo: string = "Sugestões"

  /**@description Number que vai receber o número de sugestões cadastradas pelo usuário */
  nr_Minhas_Sugestoes: number = 0

  /**@description True quando o usuário logado for adimin */
  b_User_Admin: boolean = false

  /**@description Number que vai receber o total de sugestões */
  nr_Total_Sugestoes: number

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  b_Popover_Sugestoes: boolean = true

  /**@description boolean para abrir ou fechar o popover */
  b_Show_Popover_Feitos: boolean = false

  /**@description Objeto que recebe o conteudo dos inputs */
  objFilter = { nm_Titulo: "", nm_Descricao: "" }

  constructor(
    private eRef: ElementRef,
    private sugestoesService: SugestoesService,
    private subjectService: SubjectService,
    private loginService: LoginService
  ) { }

  async ngOnInit() {
    const role_user = this.loginService.Name_Role()
    if (role_user == "trustee") {
      this.b_User_Admin = true
    }
    const reponsesugestoes = await this.sugestoesService.Get_Suggestions_Admin()
    this.obj_Array_Sugestoes = reponsesugestoes.data.sugestoes_aggregate.nodes
    this.nr_Total_Sugestoes = reponsesugestoes.data.sugestoes_aggregate.aggregate.count
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {

    } else {
      this.b_Show_Popover_Feitos = false
    }
  }

  async File_Suggestion(item, index) {
    item.show = !item.show
    const responsefile = await this.sugestoesService.Set_File_Suggestion(item.cd_sugestao)

    if (responsefile.data.update_sugestoes.returning.lenght != 1) {
      setTimeout(() => {
        this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Arquivado com sucesso!' })
        this.obj_Array_Sugestoes.splice(index, 1)
      }, 1850);
    }
    if (responsefile.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível arquivar' })
    }
  }

  async onClick_Refresh() {
    const reponsesugestoes = await this.sugestoesService.Get_Suggestions_Admin()
    this.obj_Array_Sugestoes = reponsesugestoes.data.sugestoes_aggregate.nodes
  }

  Show_Modal(event) {
    this.b_Show_Filter = event
  }

  Close_Modal() {
    this.b_Show_Filter = false
  }

  async Filter() {
    await this.sugestoesService.Get_Filter_Suggestion(this.objFilter)
    this.b_Show_Filter = false
    console.log(this.objFilter)
  }
}
