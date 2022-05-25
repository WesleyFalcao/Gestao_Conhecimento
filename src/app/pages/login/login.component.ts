
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {LoginForm} from 'src/app/forms/auth/login.form';
import {DataService} from 'src/app/services/data.service';
import { LoginService } from 'src/app/services/login.service';
import {SubjectService} from 'src/app/services/subject.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    // encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

    b_Exibir_Password: boolean = false;

    /**@description Form do Login e Senha */
    formGroup = this.loginForm.Get_Form;

    constructor(
        private dataService: DataService,
        private subjectService: SubjectService,
        private loginService: LoginService,
        private loginForm: LoginForm,
        private route: Router,
    ) {
    }

    ngAfterViewInit() {
        window.scrollTo(0, 0);
    }

    ngOnInit() {
        // if (this.dataService.Get_Session('token')) {
        //     this.route.navigate(['/home']);
        // }
    }

    Remover_Mascara(event?: any) {
        // if (event) {
        //     let clipboardData = event.clipboardData;
        //     let pastedText = clipboardData.getData('text');
        //     this.formGroup.get('ds_Login').setValue(pastedText.replace(/\D/g, ''));
        //     event.preventDefault();
        // } else if(this.formGroup.get('ds_Login').value) {
        //     this.formGroup.get('ds_Login').setValue(this.formGroup.get('ds_Login').value.replace(/\D/g, ''));
        // }
    }

    async Logar() {
        await this.loginService.Set_Login(this.formGroup.getRawValue());
        
        
    }

    Abrir_Registrar() {
        this.route.navigate(['/registrar']);
    }
}
