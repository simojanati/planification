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
var Projet_service_1 = require("./../model/Projet.service");
var AddProjetComponent = (function () {
    function AddProjetComponent(_projetService) {
        this._projetService = _projetService;
        this.msgError = '';
        this.reponse = '';
    }
    AddProjetComponent.prototype.ajouterProjet = function () {
        var _this = this;
        if (this.titreProjet === undefined) {
            this.msgError = 'Le champe titre ne doit pas etre vide';
        }
        else if (this.descriptionProjet === undefined) {
            this.msgError = 'Le champe description ne doit pas etre vide';
        }
        else {
            this._projetService.addProjet(this.titreProjet, this.descriptionProjet)
                .subscribe(function (result) {
                _this.projet = result;
                _this.titreProjet = '';
                _this.descriptionProjet = '';
                _this.msgError = '';
                _this.reponse = 'Success';
                setInterval(function () { _this.reponse = ''; }, 3000);
            }, function (error) { return _this.msgError = error; });
        }
    };
    AddProjetComponent.prototype.active = function (element) {
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
    return AddProjetComponent;
}());
AddProjetComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/addProjet/addProjet.component.html'
    }),
    __metadata("design:paramtypes", [Projet_service_1.ProjetService])
], AddProjetComponent);
exports.AddProjetComponent = AddProjetComponent;
//# sourceMappingURL=addProjet.component.js.map