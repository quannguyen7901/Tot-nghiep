import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { AuthenticationService } from './../../../core/authentication/authentication.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user: any;
  constructor(private authenticationService: AuthenticationService,private renderer: Renderer2) { }

  ngOnInit(): void {
    this.user = this.authenticationService.userValue;
  }
  logout() {
    this.authenticationService.logout();
  }    
}