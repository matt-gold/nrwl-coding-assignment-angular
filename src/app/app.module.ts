import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BackendService } from './services/backend.service';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { EffectsModule } from '@ngrx/effects';
import { TicketEffects } from './store/ticket.effects';
import { StoreModule } from '@ngrx/store';
import { ticketReducer } from './store/ticket.reducer';
import { AppState } from './store/app.state';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner.component';
import { TicketDetailsComponent } from './pages/ticket-details/ticket-details.component';


@NgModule({
  declarations: [
    AppComponent,
    TicketListComponent,
    TicketDetailsComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot([
    {
      path: 'tickets',
      component: TicketListComponent
    },
    {
      path: 'tickets/:ticketId',
      component: TicketDetailsComponent
    }, {
      path: '',
      pathMatch: 'full',
      redirectTo: '/tickets'
    }, {
      path: '**',
      redirectTo: '/tickets'
    }]),
    StoreModule.forRoot<AppState>({ ticketsState: ticketReducer }),
    EffectsModule.forRoot([TicketEffects])
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
