import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotesService } from '../../Services/notes.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [ReactiveFormsModule, HttpClientModule]
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  message: string = '';
  isSubmitting: boolean = false;

  private notesService = inject(NotesService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit() {
    if (this.registrationForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.notesService.register(this.registrationForm.value).subscribe(
        (response: string) => { // Especifica el tipo de `response`
          this.message = "Usuario registrado exitosamente";
          alert(this.message);
          this.router.navigate(['/login']);
        },
        (error: any) => { // Especifica el tipo de `error`
          console.error('Registration error:', error);
          this.message = "Error al registrar usuario: " + (error.error.message || error.message || "Error desconocido");
          alert(this.message);
        },
        () => {
          this.isSubmitting = false;
        }
      );
    } else if (!this.registrationForm.valid) {
      this.message = "Formulario inválido";
      alert(this.message);
    }
  }
}
