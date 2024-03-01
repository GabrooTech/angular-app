import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-content-filter',
  templateUrl: './content-filter.component.html',
  styleUrl: './content-filter.component.css'
})
export class ContentFilterComponent {
  @ViewChild('filterBox') filterBox: ElementRef;
  @ViewChild('filterSpdr') filterSpdr: ElementRef;
  @ViewChild('upArrow') upArrow: ElementRef;

  toggleFilterBox() {
    this.filterBox.nativeElement.classList.toggle("main_filter_box_active");
    this.filterSpdr.nativeElement.classList.toggle("filter_slider_active");
    this.upArrow.nativeElement.classList.toggle("bxs-up-arrow");
  }
}
