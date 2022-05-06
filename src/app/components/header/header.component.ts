import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /** @description String que armazena o caminho do SVG */
  nm_Src_Icon: string = "assets/icons/search-glass-black.svg"

  /** @description Boolean para exibit ou não a barra de input */
  b_Show_Input: boolean

  /** @description Recebe a largura atual da tela */
  nr_Width: number

  /** @description Subject para destruir os subscribers */
  subject_unsub = new Subject()

  /** @description Boolean para exibir ou não a logo  */
  b_Show_Itens: boolean

  constructor(
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.subjectService.subject_Click_Search.pipe(takeUntil(this.subject_unsub)).subscribe(
      (b_Show_Soon) => this.b_Show_Itens = b_Show_Soon
    )
  }

  ngOnDestroy() {
    this.subject_unsub.next(true)
    this.subject_unsub.complete()
  }
}
