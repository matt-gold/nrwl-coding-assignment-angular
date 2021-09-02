import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { Ticket } from 'src/app/services/backend.service';
import { AppState } from 'src/app/store/app.state';
import { getTickets, getUsers, updateTicket } from 'src/app/store/ticket.actions';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailsComponent {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<AppState>
  ) {
    this.store.dispatch(getUsers());
    this.store.dispatch(getTickets());
  }
  private readonly ticketId = +this.route.snapshot.paramMap.get('ticketId');
  private newAssigneeId: number;

  model$ = combineLatest(
    this.store.select(x => x.ticketsState.tickets),
    this.store.select(x => x.ticketsState.users),
    this.store.select(s => s.ticketsState.loading)
  ).pipe(map(([tickets, users, loading]) => {
    if (!users.length || !tickets.length) {
      return;
    }

    const ticket = tickets.find(t => t.id === this.ticketId);

    return {
      ticket,
      currentAssignee: users.find(u => u.id === ticket.assigneeId)?.name,
      users: users.filter(u => u.id !== ticket.assigneeId),
      loading
    };
  }));

  markComplete(ticket: Ticket) {
    this.store.dispatch(
      updateTicket({ ticket: { ...ticket, completed: true }}) 
    );
  }

  selectAssignee(assigneeId: string) {
    this.newAssigneeId = +assigneeId;
  }

  assign(ticket: Ticket) {
    this.store.dispatch(
      updateTicket({ ticket: { ...ticket, assigneeId: this.newAssigneeId }}) 
    );

    this.newAssigneeId = null;
  }
}
