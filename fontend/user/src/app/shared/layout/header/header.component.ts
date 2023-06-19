import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public user: any;
  public test=this.cookieService.get('id');
  constructor(private dn:AuthenticationService,private router:Router,private renderer: Renderer2,private cookieService: CookieService) { }

  ngOnInit(): void {
    this.user = this.dn.userValue;
  }
  dangnhap(){
    if(this.cookieService.get('id')==''){
      alert("Cần đăng nhập !");
      this.dn.logout();
    }
    else{
      alert(this.cookieService.get('id'));
      this.router.navigate(['/p']);
    }
  }
  logout() {
    this.dn.logout();
  }
}
