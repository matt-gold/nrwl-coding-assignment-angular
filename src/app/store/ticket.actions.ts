import { createAction, props } from '@ngrx/store';
import { Ticket, User } from '../services/backend.service';

export const TICKETS_GET = '[Tickets] Get Tickets'
export const TICKETS_GET_SUCCESS = '[Tickets] Get Tickets Success';
export const TICKETS_GET_FAILURE = '[Tickets] Get Tickets Failure';
export const TICKETS_CREATE = '[Tickets] Create Ticket';
export const TICKETS_UPDATE = '[Tickets] Update Ticket';
export const TICKETS_ACTION_SUCCESS = '[Tickets] Action Success';
export const TICKETS_ACTION_FAILURE = '[Tickets] Action Failure';

export const USERS_GET = '[Tickets] Get Users'
export const USERS_GET_SUCCESS = '[Tickets] Get Users Success';
export const USERS_GET_FAILURE = '[Tickets] Get Users Failure';

export const getTickets = createAction(
    TICKETS_GET
);

export const getTicketsSuccess = createAction(
    TICKETS_GET_SUCCESS,
    props<{tickets: Ticket[]}>()
);

export const getTicketsFailure = createAction(
    TICKETS_GET_FAILURE,
    props<{ message?: string }>()
);

export const createTicket = createAction(
    TICKETS_CREATE,
    props<{ ticket: Partial<Omit<Ticket, "id">>}>()
)

export const updateTicket = createAction(
    TICKETS_UPDATE,
    props<{ ticket: Ticket }>()
)

export const ticketActionSuccess = createAction(
    TICKETS_ACTION_SUCCESS
)

export const ticketActionFailure = createAction(
    TICKETS_ACTION_FAILURE,
    props<{ message?: string }>()
)

export const getUsers = createAction(
    USERS_GET
);

export const getUsersSuccess = createAction(
    USERS_GET_SUCCESS,
    props<{users: User[]}>()
);

export const getUsersFailure = createAction(
    USERS_GET_FAILURE,
    props<{ message?: string }>()
);