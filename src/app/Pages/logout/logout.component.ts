import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from '../../Services/notes.service';


@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent {

  constructor(private notesService: NotesService, private router: Router) {
    this.notesService.clearUser();
    this.router.navigate(['/login']);
  }
}