import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, ElementRef, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';
import { filter, map, pairwise, throttleTime } from 'rxjs';
import { ListModel } from 'src/app/models/arraylist/array-list';
import { ReportModel } from 'src/app/models/usuario/report.model';
import { ConteudoService } from 'src/app/pages/conteudo/conteudo.service';
import { MeusEstudosService } from 'src/app/pages/meus-estudos/meus-estudos.service';
import { LoginService } from 'src/app/services/login.service';
import { SubjectService } from 'src/app/services/subject.service';
import { UsuariosService } from '../usuario/usuarios.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-generator-report',
  templateUrl: './generator-report.component.html',
  styleUrls: ['./generator-report.component.scss']
})
export class GeneratorReportComponent implements OnInit {

  title = 'angular-app';

  fileName = 'ExcelSheet.xlsx'

  /**@description recebe o array de status */
  objArrayStatus: Array<ListModel> = [
    {
      nome: "Ativo"
    },
    {
      nome: "Inativo"
    }
  ]

  /**@description recebe a largura atual da tela */
  nr_Width: number

  /**@description boolean que fica true acima de 1034px */
  b_Width: boolean

  /**@description Nome do label do selection input */
  nm_Label_Selection: string = "Status"

  /**@description Título da página */
  ds_Titulo: string = "Relatório de acessos"

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: any

  /** @description Index da Página */
  nr_Pagina = 1

  /** @description Recebe true quando no  final do virtual scroll*/
  b_Fim_Lista: boolean = false

  /** @description Recebe o array de usuário */
  obj_Array_Usuarios: any[] = []

  /**@description Objeto que recebe os valores de cada coluna */
  obj_Report = new ReportModel

  /**@description Recebe a resposata das queries de relatório*/
  obj_Array_Response: any

  /**@description Array que vai conter os conteúdos acessados pelo usuário */
  obj_Array_Acessos_Conteudos: any = []

  /**@description Array recebe todos os acessos para relatório */
  obj_Array_All_Access: any = []

  obj_Array_Titles: any = ["id do conteúdo", "titulo do conteúdo", "categoria", "data/hora", "usuario/acesso"]

  teste

  @ViewChild('content', { static: false }) element: ElementRef

  @ViewChild(CdkVirtualScrollViewport) scroller: CdkVirtualScrollViewport

  constructor(
    private usuarioService: UsuariosService,
    private loginService: LoginService,
    private subjectService: SubjectService,
    private meuestudosService: MeusEstudosService,
    private subject_service: SubjectService,
    private conteudoService: ConteudoService,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
  
  }

  ngAfterViewInit() {
    this.onResize()

    setTimeout(() => {
      this.Get_info_Conteudos()
    });

    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 500)),
      throttleTime(200)
    ).subscribe(() => {
      this.ngZone.run(async () => {
        if (!this.b_Fim_Lista) {

          this.obj_Report.nr_pagina++
          this.Get_info_Conteudos();
        }
      });
    })
  }

  @HostListener('window:resize')
  onResize() {
    this.nr_Width = window.innerWidth
    if (this.nr_Width >= 1023) {
      this.b_Width = true
    } else {
      this.b_Width = false
      this.obj_Report.page_lenght = 30
    }
  }

  // on_Generate_Report() {

  //   this.Get_info_Conteudos()

  //   let pdf = new jsPDF('p', 'pt', 'a4');
  //   pdf.html(this.element.nativeElement, {
  //     callback: (pdf) => {
  //       pdf.save("relatorio-acessos-gestao-conhecimento.pdf")
  //     }
  //   })
  // }

  onFilter_Search(iten) {
    this.Input_Value = iten
    if (this.Input_Value != null) {

      this.Get_info_Conteudos()
    }
  }

  Show_Item(item) {
    item.show = !item.show
    if (item.show) {
      this.obj_Array_Usuarios.forEach(fe => {
        if (item.cd_usuario != fe.cd_usuario) {
          fe.show = false
        }
      })
    }
  }

  onClick_Refresh() {

    this.obj_Report.nr_pagina = 1
    this.obj_Array_Usuarios = []
    this.b_Fim_Lista = !this.b_Fim_Lista
    if (this.b_Width == false) {
      document.getElementById('virtualscroll')?.scrollTo({ top: 0 })
    }
    this.Input_Value = null
    this.Get_info_Conteudos()
  }

  async Filtrar() {
    this.b_Show_Filter = false
  }

  Close_Modal() {
    this.b_Show_Filter = false
  }

  Focus_Item(el: HTMLElement) {
    el.scrollIntoView();
  }

  Show_Modal(event) {
    this.b_Show_Filter = event
  }

  async Get_info_Conteudos() {

    if (this.Input_Value == null || this.Input_Value == "") {

      this.obj_Array_Response = await this.meuestudosService.Get_My_Studies_Pagination(this.obj_Report)

    } else {

      this.obj_Array_Response = await this.conteudoService.Get_Conteudos_Filter_Report(this.obj_Report, this.Input_Value)
    }

    if (this.obj_Array_Response.errors) {

      this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Não foi possível trazer a listagem' })
    }

    if (this.obj_Array_Response.length == 0) {
      this.b_Fim_Lista = true
    }

    if (this.b_Width) {
      this.obj_Array_Acessos_Conteudos = this.obj_Array_Response.data.acessos

      this.obj_Report.nr_registos = this.obj_Array_Response.data.acessos_aggregate.aggregate.count

    } else {
      this.obj_Array_Acessos_Conteudos = [...this.obj_Array_Acessos_Conteudos, ...this.obj_Array_Response.data.acessos]
      console.log("this.obj_Array_Acessos_Conteudos", this.obj_Array_Acessos_Conteudos)
    }
  }

  /** @description Avança uma pagina */
  async Mudar_Pagina(nr_Pagina: number) {
    this.obj_Report.nr_pagina = nr_Pagina
    const responseusuarios = await this.meuestudosService.Get_My_Studies_Pagination(this.obj_Report)
    console.log("responseusuarios", responseusuarios)
    if (responseusuarios.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível trazer a listagem' })
    } else {
      this.obj_Array_Acessos_Conteudos = responseusuarios.data.acessos
      if (this.obj_Array_Acessos_Conteudos == undefined) {
        this.obj_Array_Acessos_Conteudos = []
      }
    }
  }

  async Export_Excel() {
    this.subjectService.subject_Exibindo_Loading.next(true)
    const obj_Array_All_Access = await this.meuestudosService.Get_All_Access()
    this.obj_Array_All_Access = obj_Array_All_Access.data.acessos

    setTimeout(() => {
      this.subjectService.subject_Exibindo_Loading.next(false)
      /* pass here the table id */
      let element = document.getElementById('excel-table');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      /* save to file */
      XLSX.writeFile(wb, this.fileName);
    }, 5000);
  }
}
