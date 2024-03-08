import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  public isNavLinksVisible: boolean = false;

  // Function to toggle
  toggleNavLinks(): void {
    this.isNavLinksVisible = !this.isNavLinksVisible;
  }
}
