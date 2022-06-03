import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListModel } from 'src/app/models/arraylist/array-list';
import { objConteudoModel } from 'src/app/models/conteudo/conteudo.model';
import { SubjectService } from 'src/app/services/subject.service';
import { CategoriaService } from '../../categorias/categoria.service';
import { ConteudoService } from '../conteudo.service';

@Component({
  selector: 'app-conteudo-editar',
  templateUrl: './conteudo-editar.component.html',
  styleUrls: ['./conteudo-editar.component.scss']
})
export class ConteudoEditarComponent implements OnInit, OnDestroy {

  /**@description Boolean para remover a barra de pesquisa */
  b_Not_Search: boolean = true

  /**@description Título da página */
  ds_Titulo: string = "Editar conteúdo"

  /**@description Recebe o parâmetro da rota */
  subject_unsub: Subscription

  /**@description Recebe o parâmetro da rota */
  cd_Id_Param: number

  /**@description Boolean para controlar a animação */
  Send_Sugestion_Animacao: boolean = false

  /**@description Boolean mostra o modal de alerta */
  b_Alert_Modal: boolean = false

  /**@description String que contém a mensagem do modal de alerta */
  ds_Alert_Descricao: string = "Os campos não podem estar vazios!"

  /** @description Array de grupos */
  obj_Array_Categorias: Array<ListModel>

  /**@description nome do Label do selection input */
  nm_Label_Selection_Input: string = "Categoria"

  /**@description Nome do label do primeiro campo de imput*/
  nm_Grupo_Input: string = "Grupo"

  /**@description Recebe os valores dos campos de imput*/
  obj_Filds_Input = new objConteudoModel

  constructor(
    private location: Location,
    private routerParam: ActivatedRoute,
    private conteudoService: ConteudoService,
    private categoriaService: CategoriaService,
    private subjectService: SubjectService

  ) { }

  Back() {
    this.location.back();
  }

  Value_Select(value) {
    this.obj_Filds_Input.categoria = value
  }

  Closed_Alert_Modal() {
    this.b_Alert_Modal = false
  }

  async ngOnInit() {
    this.subject_unsub = this.routerParam.params.subscribe((params: any) => {
      this.cd_Id_Param = params['id']
    })

    const responsecategories = await this.categoriaService.Get_Categories_List()
    this.obj_Array_Categorias = responsecategories.data.categorias

    const responseconteudo = await this.conteudoService.Get_Conteudo_Edit(this.cd_Id_Param)
    this.obj_Filds_Input = responseconteudo.data.conteudos[0]
    console.log(responseconteudo)
  }

  async Set_Edit_User() {

    const responseedituser = await this.conteudoService.Set_Edit_User(this.obj_Filds_Input, this.cd_Id_Param)
    
    if (responseedituser == false) {
      this.b_Alert_Modal = true
      this.ds_Alert_Descricao = "Todos os campos devem ser preenchidos!"  
    }else{
      this.Send_Sugestion_Animacao = true
      setTimeout(() => {
        this.Send_Sugestion_Animacao = !this.Send_Sugestion_Animacao
      }, 3000);  
    }
    if(responseedituser.errors){
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível adicionar' })
    }
  }

  ngOnDestroy() {
    this.subject_unsub.unsubscribe()
  }
}
