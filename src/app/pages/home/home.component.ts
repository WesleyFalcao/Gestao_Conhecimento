import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, HostListener, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, pairwise, Subject, takeUntil, throttleTime } from 'rxjs';
import { CategoriaModel } from 'src/app/models/categoria/categoria.model';
import { ConteudoModel } from 'src/app/models/conteudo/conteudo.model';
import { HomeRepository } from 'src/app/repositories/home.repository';
import { LoginService } from 'src/app/services/login.service';
import { SubjectService } from 'src/app/services/subject.service';
import { CategoriaService } from '../categorias/categoria.service';
import { ConteudoService } from '../conteudo/conteudo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  /** @description Recebe o array de categorias */
  obj_Array_Categoria: Array<any> = []

  /**@description Recebe o array de conteudos */
  obj_Array_Conteudos: Array<any> = []

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: any

  /** @description Recebe a largura atual da tela */
  nr_Width: number

  /**@description boolean que fica true acima de 1034px */
  b_Width: boolean

  /**@description Recebe o nome do usário que adicionou a sugestão */
  nm_User: string

  /**@description Objeto com as propriedades de parâmetro para paginação */
  objCategoria = new CategoriaModel

  /** @description Subject para destruir os subscribers */
  subject_unsub = new Subject()

  /**@description Instância do virtual scroll */
  @ViewChild(CdkVirtualScrollViewport) scroller: CdkVirtualScrollViewport

  /** @description Boolena usado para retirar o botão de voltar na página home */
  b_Nao_Exibir_Voltar: boolean = true

  constructor(
    private subjectService: SubjectService,
    private categoriaService: CategoriaService,
    private loginService: LoginService,
    private route: Router,
  ) { }

  async ngOnInit() {
    this.onResize()
    this.nm_User = this.loginService.Name_User_Logged()
    const responsecategoria = await this.categoriaService.Get_Categories_List()
    this.obj_Array_Categoria = responsecategoria.data.categorias
    this.obj_Array_Categoria.forEach((iten)=>iten.nome = iten.nome.toUpperCase())
  }

  @HostListener('window:resize')
  onResize() {
    this.nr_Width = window.innerWidth
    this.subjectService.subject_Width.next(this.nr_Width)
    if (this.nr_Width >= 768) {
      this.b_Width = true
    } else {
      this.b_Width = false
    }
  }

  onFilter_Search(iten) {
    this.Input_Value = iten
    if (this.Input_Value != null) {
      this.route.navigate(['/conteudo-lista'], {queryParams: {nm_searcch: this.Input_Value}})
    }
  }
}
