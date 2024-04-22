import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDTO } from './dto/login-dto.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  formGroup!: FormGroup;
  loading = false;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder
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
    this.loading = true;
    const loginDTO: LoginDTO = this.formGroup.value;
    this.loginService.login(loginDTO).subscribe({
      next: resp => {
        console.log(resp);
        this.loading = false;
      },
      error: error => {
        console.log(error);
        this.loading = false;
      }
    });
  }

}
