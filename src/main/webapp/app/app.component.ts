import { Component } from '@angular/core';
import { DropdownModule } from "ngx-dropdown";
import { CollaborateurService } from './model/Collaborateur.service';
import { MoisService } from './model/Mois.service';
import { AffecterService } from './model/Affecter.service';
import { PlanningService } from './model/Planning.service';
import { PlanificationService } from './model/Planification.service';
import { SemaineService } from './model/Semaine.service';
import { CollaborateurProjetService } from './model/CollaborateurProjet.service';
import { ProjetService } from './model/Projet.service';
import { CollaborateurSemaineService } from './model/CollaborateurSemaine.service'

@Component({
    selector: 'pm-app',
    templateUrl: 'app/app.component.html',
    providers: [
        CollaborateurService,
        MoisService,
        AffecterService,
        PlanningService,
        PlanificationService,
        SemaineService,
        CollaborateurProjetService,
        ProjetService,
        CollaborateurSemaineService
    ]
})
export class AppComponent {

    active(element: string) {
        document.getElementById('home').className = '';
        document.getElementById('planning').className = '';
        document.getElementById('addPlanning').className = '';
        document.getElementById('gererPlanning').className = '';
        document.getElementById('addAffectation').className = '';
        document.getElementById('gererAffectation').className = '';
        document.getElementById('addProjet').className = '';
        document.getElementById('gererProjet').className = '';
        document.getElementById('addCollab').className = '';
        document.getElementById('gererCollab').className = '';
        document.getElementById(element).className = 'active';
    }

}
