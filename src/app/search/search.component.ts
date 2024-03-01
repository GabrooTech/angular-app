import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchInput: string = '';

  constructor() { }

  search() {
    const searchBoxValue = this.searchInput.toUpperCase();
    const productList = document.getElementById("productList");
    const productCards = document.querySelectorAll(".card");

    for (let i = 0; i < productCards.length; i++) {
      const productName = (productCards[i] as HTMLElement).getElementsByTagName('h3')[0];
      if (productName) {
        const textValue = productName.textContent || productName.innerHTML;
        if (textValue.toUpperCase().indexOf(searchBoxValue) > -1) {
          (productCards[i] as HTMLElement).style.display = "";
        } else {
          (productCards[i] as HTMLElement).style.display = "none";
        }
      }
    }
  }
}