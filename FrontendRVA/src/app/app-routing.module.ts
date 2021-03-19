import { SektorComponent } from './components/sektor/sektor.component';
import { PreduzeceComponent } from './components/preduzece/preduzece.component';
import { ObrazovanjeComponent } from './components/obrazovanje/obrazovanje.component';
import { RadnikComponent } from './components/radnik/radnik.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './components/core/home/home.component';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';

const Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'author', component: AuthorComponent },
  {path: 'radnici', component: RadnikComponent},
  {path: 'obrazovanja', component: ObrazovanjeComponent},
  {path: 'preduzeca', component: PreduzeceComponent},
  {path: 'sektori', component: SektorComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
