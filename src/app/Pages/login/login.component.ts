import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotesService } from '../../Services/notes.service'; 
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink, CommonModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  message: string = '';

  private notesService = inject(NotesService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.notesService.login(this.loginForm.value).subscribe(
        (response: string) => {
          this.notesService.storeUser(this.loginForm.value.username);
          this.message = 'Login successful';
          this.router.navigate(['/view']);
        },
        (error: any) => {
          console.error('Login error:', error);
          this.message = 'Usuario no encontrado, intentalo de nuevo'
        }
      );
    } else {
      this.message = 'Formulario inválido';
    }
  }
}
