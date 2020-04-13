import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
    MatButtonModule, MatTableModule, MatSortModule, MatInputModule, MAT_DIALOG_DATA, MatToolbarModule,
    MatIconModule, MatTooltipModule, MatListModule, MatSidenavModule,
    MatSlideToggleModule, MatDialogModule, MatSnackBarModule, MatMenuModule, MatTabsModule,
    MatTreeModule, MatCheckboxModule, MatPaginatorModule, MatSelectModule, MatCardModule
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
        MatDialogModule,
        MatIconModule,
        MatTooltipModule,
        MatListModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatCardModule,
        MatPaginatorModule,
        MatSelectModule,
        MatTabsModule,
    ],
    exports: [
        MatTreeModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatTableModule,
        MatSortModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatIconModule,
        MatTooltipModule,
        MatListModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatSelectModule,
        MatTabsModule,
        MatCardModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
        { provide: MAT_DIALOG_DATA, useValue: {} }
    ],
    schemas: [NO_ERRORS_SCHEMA],
})

export class MaterialFeaturesModule { }
