import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ticket } from 'src/app/services/backend.service';
import { AppState } from 'src/app/store/app.state';
import { createTicket, getTickets, getUsers } from 'src/app/store/ticket.actions';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListComponent {
  constructor(private readonly store: Store<AppState>) {
    this.store.dispatch(getUsers());
    this.store.dispatch(getTickets());
  }

  filter$ = new BehaviorSubject<(t: Ticket) => boolean>(_ => true);
  private description: string;

  model$ = combineLatest(
    this.store.select(s => s.ticketsState.tickets),
    this.store.select(s => s.ticketsState.users),
    this.store.select(s => s.ticketsState.loading),
    this.filter$
  ).pipe(
    map(([tickets, users, loading, filterPredicate]) => ({
      loading,
      tickets: tickets.map(t => ({
        ...t,
        assigneeName: users.find(u => u.id === t.assigneeId)?.name ?? '(Unassigned)'
      })).filter(filterPredicate),
      users,
    }))
  );

  selectAssignee(assigneeId: string) {
    const predicate = !!assigneeId
      ? (t: Ticket) => t.assigneeId === +assigneeId
      : _ => true

    this.filter$.next(predicate);
  }

  setDescription(description: string) {
    this.description = description;
  }
  
  createTicket() {
    if (!this.description) {
      return;
    }

    this.store.dispatch(createTicket({
      ticket: { description: this.description }
    }));
  }
}
