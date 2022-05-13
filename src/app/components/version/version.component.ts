import { Component, HostListener, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import  packageInfo from '../../../../package.json';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent implements OnInit {
  /**@description Pega a versão do Package Json */
  version = packageInfo.version

  /**@description Pega a largura atual da tela */
  nr_Width: number

  constructor(private subjectService: SubjectService) {}

  ngOnInit( ): void {  
    this.onResize()
  }

  @HostListener('window:resize')
  onResize() {
    this.nr_Width = window.innerWidth
    this.subjectService.subject_Width.next(this.nr_Width)
  }
}
