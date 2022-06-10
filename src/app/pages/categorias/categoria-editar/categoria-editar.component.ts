import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubjectService } from 'src/app/services/subject.service';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoriaeditar',
  templateUrl: './categoria-editar.component.html',
  styleUrls: ['./categoria-editar.component.scss']
})
export class CategoriaEditarComponent implements OnInit, OnDestroy {

  /**@description string que passa o noe do label do input */
  nm_Label_Input: string = "Nome da categoria"

  /**@description string que passa o título da página */
  ds_Titulo: string = "Editar categoria"

  /**@description Boolean para remover a barra de pesquisa */
  b_Not_Search: boolean = true

  /**@description Recebe o nome da nova categoria*/
  nm_Categoria: string = ""

  /**@description Recebe o parâmetro da rota */
  cd_Id_Param: number

  /**@description Recebe o parâmetro da rota */
  subject_unsub: Subscription

  /**@description Recebe o parâmetro da rota */
  b_Button_Disable: boolean = false

  /**@description String que contém a mensagem do modal de alerta */
  ds_Alert_Descricao: string = "Os campos não podem estar vazios!"

  /**@description Boolean para controlar a animação */
  Send_Sugestion_Animacao: boolean = false

  /**@description Boolean mostra o modal de alerta */
  b_Alert_Modal: boolean = false

  constructor(
    private location: Location,
    private routerParam: ActivatedRoute,
    private categoriaService: CategoriaService,
    private subjectService: SubjectService
  ) { }

  Back() {
    this.location.back();
  }

  async ngOnInit() {
    this.subject_unsub = this.routerParam.params.subscribe((params: any) => {
      this.cd_Id_Param = params['id']
    })

    const responsecategoria = await this.categoriaService.Get_Category(this.cd_Id_Param)
    this.nm_Categoria = responsecategoria.data.categorias[0].nm_categoria
  }

  async Set_Edit() {
    const responseedit = await this.categoriaService.Set_Edit_Category(this.nm_Categoria, this.cd_Id_Param)

    if(responseedit == false){
      this.b_Alert_Modal = true
      this.ds_Alert_Descricao = "O campo tem que ser preenchido!"
    }

    if (responseedit.data.update_categorias.returning.length == 1){
      this.Send_Sugestion_Animacao = true
      setTimeout(() => {
        this.Send_Sugestion_Animacao = !this.Send_Sugestion_Animacao
      }, 3000);
    }

    if(responseedit.errors){
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível adicionar' })
    }
  }

  Closed_Alert_Modal() {
    this.b_Alert_Modal = false
  }

  ngOnDestroy() {
    this.subject_unsub.unsubscribe()
  }
}
