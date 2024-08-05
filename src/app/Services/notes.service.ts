import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registration } from '../Models/registration';
import { Content } from '../Models/content';
import { appSettings } from '../Settings/appSettings';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiRegistration: string = 'https://localhost:51356/api/Registration/registration';
  private apiLogin: string = 'https://localhost:51356/api/Login/login';
  private apiEdit: string = appSettings.apiUrl+'EditContent/edit';
  private apiCreate: string = appSettings.apiUrl+'CreateContent/createContent';
  private apiView: string = 'https://localhost:51356/api/ViewContent/view';
  private delete: string = 'https://localhost:51356/api/DeleteContent/delete'
  ;

  constructor(private http: HttpClient) { }

  // Method for registration
  register(user: any): Observable<string> {
    return this.http.post(this.apiRegistration, user, { responseType: 'text' });
  }
  

  // Method for login
  login(credentials: any): Observable<any> {
    return this.http.post(this.apiLogin, credentials, { responseType: 'text'});
  }

  // Method to edit content
  updateContent(content: Content): Observable<any> {
    return this.http.put<any>(this.apiEdit, content, { responseType: 'text' as 'json' });
  }

  // Method to create content
  createContent(content: Content): Observable<string> {
    return this.http.post<string>(this.apiCreate, content, { responseType: 'text' as 'json' });
  }

  // Method to view content
  getContent(): Observable<Content[]> {
    return this.http.get<Content[]>(this.apiView);
  }

  deleteContent(id: number): Observable<any> {
    return this.http.delete(`${this.delete}/${id}`, { responseType: 'text' });
  }

    // Método para almacenar el nombre de usuario
    storeUser(username: string): void {
      localStorage.setItem('username', username);
    }
  
    // Método para obtener el nombre de usuario
    getUsername(): string | null {
      return localStorage.getItem('username');
    }
  
    // Método para borrar el nombre de usuario al cerrar sesión
    clearUser(): void {
      localStorage.removeItem('username');
    }
  
}
