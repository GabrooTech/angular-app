import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../shared/product.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Ticket } from '../shared/ticket.model';
import { TicketService } from '../shared/ticket-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  productsWithIds: { id: string, product: Product }[] = [];
  tickets: { id: string, ticket: Ticket }[] = [];
  totalProducts: number = 0;
  private productAddedSub: Subscription;
  private ticketAddedSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router,
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.subscribeToProductAddition();
    this.fetchTotalProducts();
    this.fetchTickets();
    this.subscribeToTicketAddition();
  }

  ngOnDestroy(): void {
    if (this.productAddedSub) {
      this.productAddedSub.unsubscribe();
    }
    if (this.ticketAddedSub) {
      this.ticketAddedSub.unsubscribe();
    }
  }

  fetchProducts() {
    this.dataStorageService.fetch_products().subscribe(products => {
      this.productsWithIds = products;
      console.log('Fetched products:', this.productsWithIds);
    });
  }

  fetchTickets() {
    this.ticketService.fetchTickets().subscribe(ticketss => {
      console.log('Fetched tickets:', ticketss);
      this.tickets = ticketss
    });
  }

  subscribeToProductAddition() {
    this.productAddedSub = this.dataStorageService.productAdded$.subscribe(() => {
      this.fetchProducts(); 
    });
  }

  subscribeToTicketAddition() {
    this.ticketAddedSub = this.ticketService.ticketAdded$.subscribe(() => {
      this.fetchTickets();
    });
  }

  deleteProduct(productId: string) {
    this.dataStorageService.deleteProduct(productId).subscribe(() => {
      this.productsWithIds = this.productsWithIds.filter(item => item.id !== productId);
    });
  }

  deleteTicket(ticketId: string) {
    this.ticketService.deleteTicket(ticketId).subscribe(() => {
      this.tickets = this.tickets.filter(ticket => ticket.id !== ticketId);
    });
  }

  fetchTotalProducts() {
    this.dataStorageService.fetch_products().subscribe(products => {
      this.totalProducts = products.length;
    });
  }

  editProduct(productId: string) {
    this.router.navigate(['/editProduct', productId]);
  }
  detailedTicket(ticketId: string){
    this.router.navigate(['/ticketDetail', ticketId])
  }
  changeState(ticketId: string) {
    this.ticketService.updateTicketState(ticketId, 'Solved').subscribe(() => {
      const index = this.tickets.findIndex(ticket => ticket.id === ticketId);
      if (index !== -1) {
        this.tickets[index].ticket.state = 'Solved';
      }
    });
  }
}