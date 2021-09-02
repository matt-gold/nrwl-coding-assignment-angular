import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store, Action } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, map, mergeMap, tap } from "rxjs/operators";
import { BackendService } from "../services/backend.service";
import { AppState } from "./app.state";
import { createTicket, getTickets, getTicketsFailure, getTicketsSuccess, getUsers, getUsersFailure, getUsersSuccess, ticketActionFailure, ticketActionSuccess, TICKETS_GET, updateTicket } from "./ticket.actions";
import { TicketState } from "./ticket.reducer";

@Injectable({ providedIn: 'root' })
export class TicketEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly backend: BackendService,
        private readonly store: Store<AppState> )
        { }

    getTickets$ = createEffect(() => this.actions$.pipe(
        ofType(getTickets),
        mergeMap(_ => this.backend.tickets().pipe(
            map(tickets => getTicketsSuccess({ tickets })),
            catchError(error => of(getTicketsFailure({ message: 'Failed to retrieve tickets.' })))
        )),
    ));

    getUsers$ = createEffect(() => this.actions$.pipe(
        ofType(getUsers),
        mergeMap(_ => this.backend.users().pipe(
            map(users => getUsersSuccess({ users })),
            catchError(error => of(getUsersFailure({ message: 'Failed to retrieve users.' })))
        )),
    ));

    createTicket$ = createEffect(() => this.actions$.pipe(
        ofType(createTicket),
        exhaustMap(({ ticket }) => this.backend.newTicket({
            description: ticket.description
        }).pipe(
            map(_ => ticketActionSuccess()),
            catchError(error => of(ticketActionFailure({ message: 'Failed to create ticket due to an unexpected error.' })))
        )),
    ))

    updateTicket$ = createEffect(() => this.actions$.pipe(
        ofType(updateTicket),
        exhaustMap(({ ticket }) => this.backend.update(ticket.id, {
            ...ticket
        }).pipe(
            map(_ => ticketActionSuccess()),
            catchError(error => of(ticketActionFailure({ message: 'Failed to update ticket due to an unexpected error.' })))
        )),
    ))

    refreshTickets$ = createEffect(() => this.actions$.pipe(
        ofType(ticketActionSuccess),
        map(() => getTickets()),
    ))

    debug$ = createEffect(() => this.actions$.pipe(
        mergeMap(action => this.store.select(x => x.ticketsState).pipe(map(state => [action, state] as [Action, TicketState]))),
        tap(([action, state]) => console.log(`%c ${action.type}`, 'color: #00f; background: #fff; padding: 2px; font-weight: bold', action, '\nstate: ', state))
    ), { dispatch: false });
}