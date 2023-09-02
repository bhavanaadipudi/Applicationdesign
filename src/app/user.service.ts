import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [];
  private usersSubject = new BehaviorSubject<any[]>(this.users);
  private apiUrl = 'http://localhost:3000'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    this.users.push(user);
    return this.updateUsersJsonFile().pipe(
      tap(response => {
        console.log('JSON file updated', response);
        this.usersSubject.next([...this.users]);
      }),
      catchError(error => {
        console.error('Error updating JSON file', error);
        throw error;
      })
    );
  }

  getUsers(): Observable<any[]> {
    return this.usersSubject.asObservable();
  }

  private updateUsersJsonFile(): Observable<any> {
    const jsonFilePath = `${this.apiUrl}/users`;
    return this.http.put(jsonFilePath, { users: this.users });
  }

  authenticateUser(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    return !!user;
  }
}
