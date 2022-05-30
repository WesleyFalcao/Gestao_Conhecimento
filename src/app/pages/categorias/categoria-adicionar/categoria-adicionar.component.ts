import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-adicionar',
  templateUrl: './categoria-adicionar.component.html',
  styleUrls: ['./categoria-adicionar.component.scss']
})
export class CategoriaAdicionarComponent implements OnInit {

  /**@description Boolean para controlar a animação */
  Send_Sugestion_Animacao: boolean = false

  /**@description Boolean mostra o modal de alerta */
  b_Alert_Modal: boolean = false

  /**@description string que passa o título da página */
  ds_Titulo: string = "Adicionar categoria"

  /**@description String que contém a mensagem do modal de alerta */
  ds_Alert_Descricao: string = "Os campos não podem estar vazios!"

  /**@description  Recebe o nome da nova categoria*/
  nm_Categoria: string

  /**@description Boolean para remover a barra de pesquisa */
  b_Not_Search: boolean = true

  constructor(
    private location: Location,
    private categoriaService: CategoriaService
  ) { }

  Back() {
    this.location.back();
  }

  ngOnInit(): void {
  }

  Closed_Alert_Modal() {
    this.b_Alert_Modal = false
  }

  async Send_Category() {

    const responsesetcategory = await this.categoriaService.Set_Category(this.nm_Categoria)
    if (responsesetcategory == false) {
      this.b_Alert_Modal = true
      this.ds_Alert_Descricao = "O campo tem que ser preenchido!"
    }
    else {
      this.Send_Sugestion_Animacao = true
      setTimeout(() => {
        this.Send_Sugestion_Animacao = !this.Send_Sugestion_Animacao
      }, 3000);
    }
  }
}
