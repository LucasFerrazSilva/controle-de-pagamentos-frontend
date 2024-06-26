import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MenuComponent } from './menu/menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadingComponent } from './commons/loading/loading.component';
import { HomeComponent } from './home/home.component';
import { MessageDisplayerComponent } from './commons/message-displayer/message-displayer.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HorasExtrasComponent } from './horas-extras/horas-extras.component';
import { RequestInterceptor } from './auth/request.interceptor';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MyCustomPaginatorIntl } from './commons/pagination/paginator-intl';
import { ParametrosComponent } from './parametros/parametros.component';
import { NovoParametroComponent } from './parametros/novo-parametro/novo-parametro.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NotFoundComponent } from './not-found/not-found.component';
import { DialogConfirmComponent } from './commons/dialog-confirm/dialog-confirm.component';
import { DialogHorasExtrasComponent } from './horas-extras/dialog-horas-extras/dialog-horas-extras.component';
import { PrestadoresComponent } from './prestadores/prestadores.component';
import { NovoPrestadorDialogComponent } from './prestadores/novo-prestador-dialog/novo-prestador-dialog.component';
import { RoleLabelPipe } from './commons/pipes/role-label.pipe';
import { NotasFiscaisComponent } from './notas-fiscais/notas-fiscais.component';
import { DialogNotasFiscaisComponent } from './notas-fiscais/dialog-notas-fiscais/dialog-notas-fiscais.component';
import { MonthNamePipePipe } from './commons/pipes/month-name-pipe.pipe';
import { NovaSenhaDialogComponent } from './prestadores/nova-senha-dialog/nova-senha-dialog.component';
import { DialogEnviarNotaFiscalComponent } from './notas-fiscais/dialog-enviar-nota-fiscal/dialog-enviar-nota-fiscal.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ToolbarComponent,
    LoginComponent,
    LoadingComponent,
    HomeComponent,
    MessageDisplayerComponent,
    HorasExtrasComponent,
    NotFoundComponent,
    ParametrosComponent,
    NovoParametroComponent,
    DialogConfirmComponent,
    DialogHorasExtrasComponent,
    PrestadoresComponent,
    NovoPrestadorDialogComponent,
    RoleLabelPipe,
    NotasFiscaisComponent,
    DialogNotasFiscaisComponent,
    MonthNamePipePipe,
    NovaSenhaDialogComponent,
    DialogEnviarNotaFiscalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule
  ],
  providers: [
    MatNativeDateModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    {provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl},
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
