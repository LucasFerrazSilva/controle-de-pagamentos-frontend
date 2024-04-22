import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDTO } from './dto/login-dto.interface';
import { TokenService } from '../auth/token.service';
import { LoadingService } from '../commons/loading/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  formGroup!: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    const loginDTO: LoginDTO = this.formGroup.value;
    this.loginService.login(loginDTO);
  }

}
