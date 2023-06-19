import { environment } from './../../../environments/environments';
import { User } from './../entities/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {  
    CookieService  
} from 'ngx-cookie-service';  

localStorage.setItem('id','')
@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    private userSubject: BehaviorSubject<any>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private cookieService: CookieService
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(this.cookieService.get('user') || '{}'));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value && this.userSubject.value.taiKhoan ? this.userSubject.value: null;
       
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.BASE_API}/api/Khachhangs/authenticate`, { username, password })
            .pipe(map(user => {
                this.cookieService.set('user', JSON.stringify(user));
                this.cookieService.set('id',user.maNguoiDung );
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        this.cookieService.delete('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    remove() {
        this.cookieService.delete('user');
        this.userSubject.next(null);
    }
}