import { Component } from '@angular/core';
import { Link } from './header';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = 'Tour of Heroes';
  links: Link[] = [{ linkName: "Heroes", path: "/dashboard" }, { linkName: "Favorites", path: "/favorites" }]
}
