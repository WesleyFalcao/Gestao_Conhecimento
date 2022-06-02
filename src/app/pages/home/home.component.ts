import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HomeRepository } from 'src/app/repositories/home.repository';
import { SubjectService } from 'src/app/services/subject.service';
import { CategoriaService } from '../categorias/categoria.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 /** @description Recebe o array de categorias */
  obj_Array_Categoria

  /** @description String que armazena o caminho do SVG */
  nm_Src_Icon: string = "assets/icons/search-glass-black.svg"

  /** @description Boolean para exibit ou não a barra de input */
  b_Show_Input: boolean

  /** @description Recebe a largura atual da tela */
  nr_Width: number

  /** @description Subject para destruir os subscribers */
  subject_unsub = new Subject()

  /** @description Boolena usado para retirar o botão de voltar na página home */
  b_Nao_Exibir_Voltar: boolean = true

  constructor(
    private subjectService: SubjectService,
    private categoriaService: CategoriaService,
    private router: Router
  ) { }

  async ngOnInit(){
    const responsecategoria = await this.categoriaService.Get_Categories_List()
    this.obj_Array_Categoria = responsecategoria.data.categorias
  }

  @HostListener('window:resize')
  onResize() {
    this.nr_Width = window.innerWidth
    this.subjectService.subject_Width.next(this.nr_Width)
    if (this.nr_Width >= 768) {
      this.b_Show_Input = true
    } else {
      this.b_Show_Input = false
    }
  }
}
