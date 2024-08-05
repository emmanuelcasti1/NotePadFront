import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from '../../Services/notes.service'; // Ajusta la ruta según sea necesario
import { Content } from '../../Models/content'; // Ajusta la ruta según sea necesario
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-view-edit-create-content',
  standalone: true,
  templateUrl: './view-edit-content.component.html',
  styleUrls: ['./view-edit-content.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ViewEditContentComponent implements OnInit {

  

  contents: Content[] = [];
  editForm: FormGroup;
  createForm: FormGroup;
  message: string = '';
  username?: string | null;

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    private router: Router,

  ) {
    this.editForm = this.fb.group({
      Id: [''],
      Title: [''],
      Body: ['']
    });

    this.createForm = this.fb.group({
      Title: [''],
      Body: ['']
    });
  }

  ngOnInit(): void {
    this.loadContents();
    this.username = this.notesService.getUsername();
  }

  loadContents(): void {
    this.notesService.getContent().subscribe(
      (contents: Content[]) => {
        this.contents = contents;
      },
      (error: any) => {
        console.error('Error fetching contents:', error);
        this.message = 'Error fetching contents';
      }
    );
  }

  openEditModal(content: Content): void {
    this.editForm.patchValue(content);
    const editModal = new bootstrap.Modal(document.getElementById('editNoteModal')!);
    editModal.show();
  }

  onEditSubmit(): void {
    if (this.editForm.valid) {
      this.notesService.updateContent(this.editForm.value).subscribe(
        response => {
          this.message = 'Content updated successfully';
          this.loadContents(); // Reload contents after update
          this.editForm.reset(); // Clear the form after successful update
        },
        (error: any) => {
          console.error('Error updating content:', error);
          this.message = 'Error updating content';
        }
      );
    } else {
      this.message = 'Please fill out the form correctly';
    }
  }

  onCreateSubmit(): void {
    if (this.createForm.valid) {
      this.notesService.createContent(this.createForm.value).subscribe(
        response => {
          this.message = 'Content created successfully';
          this.loadContents(); // Reload contents after creation
          this.createForm.reset(); // Clear the form after successful creation
        },
        (error: any) => {
          console.error('Error creating content:', error);
          this.message = 'Error creating content';
        }
      );
    } else {
      this.message = 'Please fill out the form correctly';
    }
  }

  onDeleteContent(id: number): void {
    if (confirm('Are you sure you want to delete this content?')) {
      this.notesService.deleteContent(id).subscribe(
        (response: string) => {
          this.message = 'Content deleted successfully';
          this.loadContents(); // Reload contents after deletion
        },
        (error: any) => {
          console.error('Error deleting content:', error);
          this.message = 'Error deleting content: ' + (error.error?.message || error.message || 'Error desconocido');
        }
      );
    } else { this.message = 'No sé que pasa'}

  }

  logout(): void {
    this.notesService.clearUser(); // Limpiar el usuario del localStorage
    this.router.navigate(['/login']); // Redirigir al login
  }

}
