import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";

@Component({
    selector: 'app-spinner',
    template: '<div class="spinner" *ngIf="loading"></div>',
    styleUrls: ['spinner.styles.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
    constructor(private readonly store: Store<AppState>) { }

    @Input() loading: boolean;
}