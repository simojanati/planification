"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CollaborateurProjet_service_1 = require("./../model/CollaborateurProjet.service");
var ListeCollaborateurProjetComponent = (function () {
    function ListeCollaborateurProjetComponent(_collaborateurProjetService) {
        this._collaborateurProjetService = _collaborateurProjetService;
        this.confirmResult = null;
        this.promptMessage = '';
        this.message = '';
        this.filterQuery = "";
        this.rowsOnPage = 10;
        this.sortBy = "collaborateur.nom";
        this.sortOrder = "asc";
    }
    ListeCollaborateurProjetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._collaborateurProjetService.getCollaborateurProjet().subscribe(function (data) {
            setTimeout(function () {
                _this.data = data;
            }, 1000);
        });
    };
    ListeCollaborateurProjetComponent.prototype.deleteConfirm = function (idCollaborateur, idProjet) {
        var _this = this;
        this._collaborateurProjetService.deleteCollaborateurProjet(idCollaborateur, idProjet).subscribe(function (data) {
            _this.message = data;
            _this.ngOnInit();
            console.log(_this.message);
        });
    };
    ListeCollaborateurProjetComponent.prototype.active = function (element) {
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
    return ListeCollaborateurProjetComponent;
}());
ListeCollaborateurProjetComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/addCollaborateurProjet/listeCollaborateurProjet.component.html',
        styleUrls: ['app/addCollaborateurProjet/listeCollaborateurProjet.component.css']
    }),
    __metadata("design:paramtypes", [CollaborateurProjet_service_1.CollaborateurProjetService])
], ListeCollaborateurProjetComponent);
exports.ListeCollaborateurProjetComponent = ListeCollaborateurProjetComponent;
//# sourceMappingURL=listeCollaborateurProjet.component.js.map