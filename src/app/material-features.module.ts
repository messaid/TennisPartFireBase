import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
    MatButtonModule, MatTableModule, MatSortModule, MatInputModule, MAT_DIALOG_DATA, MatToolbarModule,
    MatIconModule, MatTooltipModule, MatListModule, MatSidenavModule, MatRadioModule,
    MatSlideToggleModule, MatDialogModule, MatSnackBarModule, MatMenuModule, MatTabsModule,
    MatTreeModule, MatCheckboxModule, MatPaginatorModule, MatSelectModule, MatCardModule, MatGridListModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatTableModule,
        MatSortModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatInputModule,
        MatRadioModule,
        MatDialogModule,
        MatIconModule,
        MatTooltipModule,
        MatListModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatCardModule,
        MatPaginatorModule,
        MatSelectModule,
        MatTabsModule,
    ],
    exports: [
        MatTreeModule,
        MatDialogModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatTableModule,
        MatRadioModule,
        MatSortModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatGridListModule,
        MatIconModule,
        MatTooltipModule,
        MatListModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatSelectModule,
        MatTabsModule,
        MatSnackBarModule,
        MatCardModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
        { provide: MAT_DIALOG_DATA, useValue: {} }
    ],
    schemas: [NO_ERRORS_SCHEMA],
})

export class MaterialFeaturesModule { }
