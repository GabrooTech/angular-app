
import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TicketService } from '../../shared/ticket-service';
import { Ticket } from '../../shared/ticket.model';
import { LoginFormService } from '../../login-form/login-form.service';
import { User } from '../../shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-another-problem',
  templateUrl: './another-problem.component.html',
  styleUrl: './another-problem.component.css'
})
export class AnotherProblemComponent implements OnDestroy{
  private userSubscription: Subscription;
  isLoading: boolean = false;

  constructor(private ticketService: TicketService, private loginFormService: LoginFormService, private router: Router) {}
  on_add_item(form: NgForm){
    if(form.valid){
      const value = form.value;
      const currentDate = new Date(); // get current date and time
      
      this.loginFormService.user$.subscribe((loggedInUser: User) => { // subscribe to get the logged-in user
        const new_ticket = new Ticket(
          'Unsolved',
          loggedInUser.id, // use user id of the loggedin user
          'Another problem',
          value.issue,
          currentDate,
        );
        this.isLoading = true;
        this.ticketService.createTicket(new_ticket)
        .subscribe({
          next: (response) => {
            console.log('ticket stored successfully:', response);
            this.isLoading = false;
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Error storing product:', error);
            this.isLoading = false;
          }
        });
      });
    }
  }
  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
