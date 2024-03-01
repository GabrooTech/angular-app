import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../shared/ticket-service';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  ticketId: string;
  ticket: any; // Update the type as per your ticket model

  constructor(private route: ActivatedRoute, private ticketService: TicketService) { }

  ngOnInit(): void {
    // Get the ticket ID from the route parameters
    this.route.params.subscribe(params => {
      this.ticketId = params['id'];
      // Fetch ticket details based on the ID
      this.fetchTicketDetails(this.ticketId);
    });
  }

  fetchTicketDetails(ticketId: string) {
    // Call your ticket service to fetch ticket details
    this.ticketService.getTicketById(ticketId).subscribe(ticket => {
      this.ticket = ticket;
      console.log('Fetched ticket details:', this.ticket);
    });
  }
}