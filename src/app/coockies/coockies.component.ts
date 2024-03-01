import { Component } from '@angular/core';


@Component({
  selector: 'app-coockies',
  templateUrl: './coockies.component.html',
  styleUrl: './coockies.component.css'
})
export class CoockiesComponent {
  accepted_coockies: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('coockies_state') === 'accepted') {
      this.accepted_coockies = true;
    } else {
      localStorage.setItem('coockies_state', 'unknown');
    }
  }

  acceptCoockie(): void {
    this.accepted_coockies = true;
    localStorage.setItem('coockies_state', 'accepted');
  }
}
