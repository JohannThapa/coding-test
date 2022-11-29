import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { NavService } from './common/services/nav.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ErrorIntercept } from './common/interceptors/error.interceptop';
import { CreateUpdateComponent } from './pages/users/create-update/create-update.component';
import { HasErrorPipe } from './common/pipes/has-error.pipe';
import { IsInvalidPipe } from './common/pipes/is-invalid.pipe';
import { DetailsComponent } from './pages/users/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    HomeComponent,
    UsersComponent,
    CreateUpdateComponent,
    HasErrorPipe,
    IsInvalidPipe,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [NavService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
