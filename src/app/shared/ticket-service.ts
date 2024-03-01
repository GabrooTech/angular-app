import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Ticket } from './ticket.model';

@Injectable({providedIn: 'root'})
export class TicketService {
    private firebaseDatabaseUrl = 'https://angular-app-d29f3-default-rtdb.europe-west1.firebasedatabase.app/';

    private ticketAddedSubject = new Subject<void>();

    constructor(private http: HttpClient) {}

    ticketAdded$ = this.ticketAddedSubject.asObservable();

    createTicket(ticket: Ticket): Observable<any> {
        return this.http.post(`${this.firebaseDatabaseUrl}/tickets.json`, ticket).pipe(
            tap(() => {
                this.ticketAddedSubject.next();
            })
        );
    }

    fetchTickets(): Observable<{ id: string, ticket: Ticket }[]> {
        return this.http.get<{ [key: string]: Ticket }>(`${this.firebaseDatabaseUrl}/tickets.json`).pipe(
            map(responseData => {
                return Object.keys(responseData).map(key => ({ id: key, ticket: responseData[key] }));
            })
        );
    }

    updateTicket(ticketId: string, updatedFields: Partial<Ticket>): Observable<any> {
        return this.http.patch(`${this.firebaseDatabaseUrl}/tickets/${ticketId}.json`, updatedFields);
    }

    deleteTicket(ticketId: string): Observable<any> {
        return this.http.delete(`${this.firebaseDatabaseUrl}/tickets/${ticketId}.json`);
    }

    getTicketById(ticketId: string): Observable<Ticket> {
        return this.http.get<Ticket>(`${this.firebaseDatabaseUrl}/tickets/${ticketId}.json`);
    }
    updateTicketState(ticketId: string, newState: string): Observable<any> {
      return this.http.patch(`${this.firebaseDatabaseUrl}/tickets/${ticketId}.json`, { state: newState });
    }
}