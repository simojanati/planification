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
var ListeCollaborateurComponent = (function () {
    function ListeCollaborateurComponent(_collaborateurService) {
        this._collaborateurService = _collaborateurService;
        this.filterQuery = "";
        this.rowsOnPage = 10;
        this.sortBy = "nom";
        this.sortOrder = "asc";
        this.reponse = '';
        this.msgError = '';
        this.dataDissmiss = '';
        this.message = '';
    }
    ListeCollaborateurComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._collaborateurService.getCollaborateurs()
            .subscribe(function (data) {
            setTimeout(function () {
                _this.data = data;
            }, 1000);
        });
    };
    ListeCollaborateurComponent.prototype.updateCollaborateur = function () {
        var _this = this;
        console.log('Nom : ' + this.nom + ' - Prénom : ' + this.prenom + ' - Email : ' + this.email + ' - Tel : ' + this.tel + ' - Date : ' + this.dateRecrutement);
        var re = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
        if (this.nom === '') {
            this.msgError = 'Le champe nom ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(function () { _this.msgError = ''; }, 5000);
        }
        else if (this.prenom === '') {
            this.msgError = 'Le champe prenom ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(function () { _this.msgError = ''; }, 5000);
        }
        else if (this.email === '') {
            this.msgError = 'Le champe email ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(function () { _this.msgError = ''; }, 5000);
        }
        else if (!this.email.match(re)) {
            this.msgError = 'Format du champe email incorrect (XXX@XXX.XXX)';
            this.dataDissmiss = '';
            setInterval(function () { _this.msgError = ''; }, 5000);
        }
        else if (this.tel === '') {
            this.msgError = 'Le champe téléphone ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(function () { _this.msgError = ''; }, 5000);
        }
        else if (this.dateRecrutement === '') {
            this.msgError = 'Le champe date de recrutement ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(function () { _this.msgError = ''; }, 5000);
        }
        else {
            this.dataDissmiss = 'modal';
            this._collaborateurService.updateCollaborateur(this.idCollaborateur, this.nom, this.prenom, this.email, this.tel, this.dateRecrutement)
                .subscribe(function (result) {
                _this.collaborateur = result;
                _this.msgError = '';
                _this.ngOnInit();
            }, function (error) { return _this.msgError = error; });
        }
    };
    ListeCollaborateurComponent.prototype.deleteCollaborateur = function (idCollaborateur) {
        var _this = this;
        this._collaborateurService.deleteCollaborateurs(idCollaborateur)
            .subscribe(function (data) {
            _this.message = data;
            _this.ngOnInit();
            console.log(_this.message);
        });
    };
    ListeCollaborateurComponent.prototype.remplirDonnee = function (idCollaborateur, nom, prenom, email, tel, dateRecrutement) {
        this.idCollaborateur = idCollaborateur;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.tel = tel;
        this.dateRecrutement = dateRecrutement;
    };
    ListeCollaborateurComponent.prototype.active = function (element) {
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
    return ListeCollaborateurComponent;
}());
ListeCollaborateurComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/addCollaborateur/listeCollaborateur.component.html',
        styleUrls: ['app/addCollaborateur/listeCollaborateur.component.css']
    }),
    __metadata("design:paramtypes", [Collaborateur_service_1.CollaborateurService])
], ListeCollaborateurComponent);
exports.ListeCollaborateurComponent = ListeCollaborateurComponent;
//# sourceMappingURL=listeCollaborateur.component.js.map