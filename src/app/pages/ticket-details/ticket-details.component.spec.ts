import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TicketDetailsComponent } from "./ticket-details.component";
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState } from "src/app/store/app.state";
import { first } from "rxjs/operators";
import { TICKETS_UPDATE } from "src/app/store/ticket.actions";
import { Ticket } from "src/app/services/backend.service";
import { Action } from "@ngrx/store";
import { RouterTestingModule } from '@angular/router/testing';

let component: TicketDetailsComponent;
let fixture: ComponentFixture<TicketDetailsComponent>;
let store: MockStore;

const initialState: AppState = { 
    ticketsState: {
        tickets: [],
        loading: false,
        users: [{ id: 123, name: 'Harry' }],
        error: null
    }
};

describe('TicketDetailsComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
          declarations: [ TicketDetailsComponent ],
          providers: [
              provideMockStore({ initialState }),
            ]
        });
        fixture = TestBed.createComponent(TicketDetailsComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
    });
      
    it('#markComplete should dispatch TICKETS_UPDATE with completed: true', async(() => {
        const testTicket: Ticket = {
            id: 1,
            assigneeId: 2,
            completed: false,
            description: 'test'
        };

        component.markComplete(testTicket);

        store.scannedActions$.pipe(first()).subscribe(action => {
            expect(action.type).toBe(TICKETS_UPDATE);
            // not sure with NgRX how to match the Action type
            expect((action as Action & { ticket: Ticket }).ticket).toEqual({
                ...testTicket,
                completed: true
            })
        })
    }));

    it('#assign should dispatch TICKETS_UPDATE with new assigneeId set', async(() => {
        const testTicket: Ticket = {
            id: 1,
            assigneeId: 2,
            completed: false,
            description: 'test'
        };

        component.selectAssignee('5')
        component.assign(testTicket);

        store.scannedActions$.pipe(first()).subscribe(action => {
            expect(action.type).toBe(TICKETS_UPDATE);
            // not sure with NgRX how to match the Action type
            expect((action as Action & { ticket: Ticket }).ticket).toEqual({
                ...testTicket,
                assigneeId: 5
            })
        })
    }));
});
