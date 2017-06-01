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
var Collaborateur_service_1 = require("./../model/Collaborateur.service");
var AddCollaborateurComponent = (function () {
    function AddCollaborateurComponent(_collaborateurService) {
        this._collaborateurService = _collaborateurService;
        this.reponse = '';
        this.msgError = '';
    }
    AddCollaborateurComponent.prototype.addCollaborateur = function () {
        var _this = this;
        console.log('Nom : ' + this.nom + ' - Prénom : ' + this.prenom + ' - Email : ' + this.email + ' - Tel : ' + this.tel + ' - Date : ' + this.dateRecrutement);
        var re = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
        if (this.nom === undefined) {
            this.msgError = 'Le champe nom ne doit pas etre vide';
        }
        else if (this.prenom === undefined) {
            this.msgError = 'Le champe prenom ne doit pas etre vide';
        }
        else if (this.email === undefined) {
            this.msgError = 'Le champe email ne doit pas etre vide';
        }
        else if (!this.email.match(re)) {
            this.msgError = 'Format du champe email incorrect (XXX@XXX.XXX)';
        }
        else if (this.tel === undefined) {
            this.msgError = 'Le champe téléphone ne doit pas etre vide';
        }
        else if (this.dateRecrutement === undefined) {
            this.msgError = 'Le champe date de recrutement ne doit pas etre vide';
        }
        else {
            this._collaborateurService.addCollaborateur(this.nom, this.prenom, this.email, this.tel, this.dateRecrutement)
                .subscribe(function (result) {
                _this.collaborateur = result;
                _this.nom = '';
                _this.prenom = '';
                _this.tel = '';
                _this.email = '';
                _this.dateRecrutement = '';
                _this.msgError = '';
                _this.reponse = 'Success';
                setInterval(function () { _this.reponse = ''; }, 3000);
            }, function (error) { return _this.msgError = error; });
        }
    };
    AddCollaborateurComponent.prototype.active = function (element) {
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
    return AddCollaborateurComponent;
}());
AddCollaborateurComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/addCollaborateur/addCollaborateur.component.html'
    }),
    __metadata("design:paramtypes", [Collaborateur_service_1.CollaborateurService])
], AddCollaborateurComponent);
exports.AddCollaborateurComponent = AddCollaborateurComponent;
//# sourceMappingURL=addCollaborateur.component.js.map