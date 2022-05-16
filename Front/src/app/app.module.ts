import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { LogRegComponent } from './log-reg/log-reg.component';
import { OfferComponent } from './offer/offer.component';
import { TutorsComponent } from './tutors/tutors.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthInterceptor} from './AuthInterceptor';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TutorDetailComponent } from './tutor-detail/tutor-detail.component';
import { TutorCoursesComponent } from './tutor-courses/tutor-courses.component';
import { CourseTutorsComponent } from './course-tutors/course-tutors.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    CoursesComponent,
    CourseDetailComponent,
    HomeComponent,
    InfoComponent,
    LogRegComponent,
    OfferComponent,
    TutorsComponent,
    HeaderComponent,
    FooterComponent,
    TutorDetailComponent,
    TutorCoursesComponent,
    CourseTutorsComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
