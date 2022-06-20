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

  constructor() {}

  ngOnInit( ): void {  
  }
}
