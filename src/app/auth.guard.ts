import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotesService } from './Services/notes.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private notesService: NotesService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.notesService.getUsername()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
