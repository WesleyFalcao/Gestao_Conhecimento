import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ListModel } from 'src/app/models/arraylist/array-list';
import { ConteudoModel } from 'src/app/models/conteudo/conteudo.model';
import { SubjectService } from 'src/app/services/subject.service';
import { CategoriaService } from '../../categorias/categoria.service';
import { ConteudoService } from '../../conteudo/conteudo.service';

@Component({
  selector: 'app-sumario-adicionar',
  templateUrl: './sumario-adicionar.component.html',
  styleUrls: ['./sumario-adicionar.component.scss']
})
export class SumarioAdicionarComponent implements OnInit {

  /**@description Boolean para remover a barra de pesquisa */
  b_Not_Search: boolean = true

  /**@description Título da página */
  ds_Titulo: string = "Adicionar sumário"

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
  obj_Filds_Input = new ConteudoModel


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
  }

  async Set_Add_Sumary() {

    const responsesumary = await this.conteudoService.Set_Sumary(this.obj_Filds_Input)
    if (responsesumary.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível adicionar' })
    }

    if (responsesumary == false) {
      this.b_Alert_Modal = true
      this.ds_Alert_Descricao = "Todos os campos devem ser preenchidos!"

    } else {
      this.Send_Sugestion_Animacao = true
      setTimeout(() => {
        this.Send_Sugestion_Animacao = !this.Send_Sugestion_Animacao
      }, 3000);
    }
  }

  ngOnDestroy() {
    this.subject_unsub.unsubscribe()
  }

}
