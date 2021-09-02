import { createReducer, on } from '@ngrx/store';
import { Ticket, User } from '../services/backend.service';
import { createTicket, getTickets, getTicketsFailure, getTicketsSuccess, getUsers, getUsersFailure, getUsersSuccess, ticketActionFailure, ticketActionSuccess, updateTicket } from './ticket.actions';

export interface TicketState {
    tickets: Ticket[];
    users: User[];
    loading: boolean;
    error: string | null
}

const initialState: TicketState = {
    tickets: [],
    users: [],
    loading: false,
    error: null
};

export const ticketReducer = createReducer(
    initialState,
    on(getTickets, state => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(getTicketsSuccess, (state, { tickets })  => ({
        ...state,
        loading: false,
        tickets,
    })),
    on(getTicketsFailure, (state, error)  => ({
        ...state,
        loading: false,
        error: error.message
    })),
    on(getUsers, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(getUsersSuccess, (state, { users })  => ({
        ...state,
        loading: false,
        users,
    })),
    on(getUsersFailure, (state, error)  => ({
        ...state,
        loading: false,
        error: error.message
    })),
    on(createTicket, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(updateTicket, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(ticketActionSuccess, (state) => ({
        ...state,
        error: null
    })),
    on(ticketActionFailure, (state, error) => ({
        ...state,
        loading: false,
        error: error.message
    }))
);
