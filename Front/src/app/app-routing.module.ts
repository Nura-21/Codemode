import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseTutorsComponent } from './course-tutors/course-tutors.component';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { LogRegComponent } from './log-reg/log-reg.component';
import { OfferComponent } from './offer/offer.component';
import { TutorCoursesComponent } from './tutor-courses/tutor-courses.component';
import { TutorDetailComponent } from './tutor-detail/tutor-detail.component';
import { TutorsComponent } from './tutors/tutors.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'authorize', component: LogRegComponent },
  { path: 'authorize/offer', component: OfferComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'courses/:id/tutors', component: CourseTutorsComponent },
  { path: 'tutors', component: TutorsComponent },
  { path: 'tutors/:id', component: TutorDetailComponent },
  { path: 'tutors/:id/courses', component: TutorCoursesComponent},
  { path: 'info', component: InfoComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'account', component: AccountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
