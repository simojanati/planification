import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { TooltipModule } from "ngx-tooltip";
import { DropdownModule } from "ngx-dropdown";
import { DataTableModule } from "angular2-datatable";
import { DataFilterCollabProjetPipe } from './data-filter/data-filter-collabProjet.pipe';
import { DataFilterPlanningPipe } from './data-filter/data-filter-planning.pipe';
import { DataFilterCollaborateur } from './data-filter/data-filter-collaborateur.pipe';
import { DataFilterProjet } from './data-filter/data-filter-projet.pipe';
import { MyFilterPipe } from './data-filter/data-filter-projetPlanning.pipe';
import { ContextmenuModule } from 'ng2-contextmenu';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { AddPlanningComponent } from './addPlanning/addPlanning.component';
import { PlanningComponent } from './planning/planning.component';
import { AddCollaborateurProjetComponent } from './addCollaborateurProjet/AddCollaborateurProjet.component';
import { ListePlanningComponent } from './addPlanning/listePlanning.component';
import { ListeCollaborateurProjetComponent } from './addCollaborateurProjet/listeCollaborateurProjet.component';
import { AddProjetComponent } from './addProjet/addProjet.component';
import { ListeProjetComponent } from './addProjet/listeProjet.component';
import { AddCollaborateurComponent } from './addCollaborateur/addCollaborateur.component';
import { ListeCollaborateurComponent } from './addCollaborateur/listeCollaborateur.component';
import { Error404Component } from './error/error-404.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularDualListBoxModule,
    TooltipModule,
    DropdownModule,
    DataTableModule,
    ContextmenuModule,
    RouterModule.forRoot([
      { path: 'addPlanning', component: AddPlanningComponent },
      { path: 'listePlannings', component: ListePlanningComponent },
      { path: 'planning', component: PlanningComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: '404', component: Error404Component },
      { path: 'addAffectation', component: AddCollaborateurProjetComponent },
      { path: 'listeAffectations', component: ListeCollaborateurProjetComponent },
      { path: 'addProjet', component: AddProjetComponent },
      { path: 'listeProjets', component: ListeProjetComponent },
      { path: 'addCollaborateur', component: AddCollaborateurComponent },
      { path: 'listeCollaborateurs', component: ListeCollaborateurComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: '404', pathMatch: 'full' }
    ])
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    AddPlanningComponent,
    PlanningComponent,
    ListePlanningComponent,
    AddCollaborateurProjetComponent,
    ListeCollaborateurProjetComponent,
    AddProjetComponent,
    ListeProjetComponent,
    AddCollaborateurComponent,
    ListeCollaborateurComponent,
    DataFilterCollabProjetPipe,
    DataFilterPlanningPipe,
    DataFilterCollaborateur,
    DataFilterProjet,
    MyFilterPipe,
    Error404Component
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
