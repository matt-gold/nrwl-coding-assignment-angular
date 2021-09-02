import {TestBed, waitForAsync} from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import {AppComponent} from './app.component';
import {BackendService} from "./services/backend.service";

describe('AppComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [
                provideMockStore({initialState: { ticketState: {}}})
            ]

        }).compileComponents();
    }));

    it('should create the app', (() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should render title in the header', (() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h2').textContent).toContain('Ticketcaster');
    }));
});
