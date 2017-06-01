"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Collaborateur_service_1 = require("./model/Collaborateur.service");
var Mois_service_1 = require("./model/Mois.service");
var Affecter_service_1 = require("./model/Affecter.service");
var Planning_service_1 = require("./model/Planning.service");
var Planification_service_1 = require("./model/Planification.service");
var Semaine_service_1 = require("./model/Semaine.service");
var CollaborateurProjet_service_1 = require("./model/CollaborateurProjet.service");
var Projet_service_1 = require("./model/Projet.service");
var CollaborateurSemaine_service_1 = require("./model/CollaborateurSemaine.service");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.active = function (element) {
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
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'pm-app',
        templateUrl: 'app/app.component.html',
        providers: [
            Collaborateur_service_1.CollaborateurService,
            Mois_service_1.MoisService,
            Affecter_service_1.AffecterService,
            Planning_service_1.PlanningService,
            Planification_service_1.PlanificationService,
            Semaine_service_1.SemaineService,
            CollaborateurProjet_service_1.CollaborateurProjetService,
            Projet_service_1.ProjetService,
            CollaborateurSemaine_service_1.CollaborateurSemaineService
        ]
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map