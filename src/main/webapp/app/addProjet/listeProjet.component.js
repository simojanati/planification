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
var ListeProjetComponent = (function () {
    function ListeProjetComponent(_projetService) {
        this._projetService = _projetService;
        this.filterQuery = "";
        this.rowsOnPage = 10;
        this.sortBy = "titreProjet";
        this.sortOrder = "asc";
        this.msgError = '';
        this.reponse = '';
        this.message = '';
        this.dataDissmiss = '';
    }
    ListeProjetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._projetService.getProjet()
            .subscribe(function (data) {
            setTimeout(function () {
                _this.data = data;
            }, 1000);
        });
    };
    ListeProjetComponent.prototype.updateProjet = function () {
        var _this = this;
        if (this.titreProjet === '') {
            this.msgError = 'Le champe titre ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(function () { _this.msgError = ''; }, 5000);
        }
        else if (this.descriptionProjet === '') {
            this.msgError = 'Le champe description ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(function () { _this.msgError = ''; }, 5000);
        }
        else {
            this.dataDissmiss = 'modal';
            this._projetService.updateProjet(this.idProjet, this.titreProjet, this.descriptionProjet)
                .subscribe(function (result) {
                _this.projet = result;
                _this.msgError = '';
                _this.ngOnInit();
            }, function (error) { return _this.msgError = error; });
        }
    };
    ListeProjetComponent.prototype.deleteProjet = function (idProjet) {
        var _this = this;
        this._projetService.deleteProjet(idProjet)
            .subscribe(function (data) {
            _this.message = data;
            _this.ngOnInit();
            console.log(_this.message);
        });
    };
    ListeProjetComponent.prototype.remplirDonnee = function (idProjet, titreProjet, descriptionProjet) {
        this.idProjet = idProjet;
        this.titreProjet = titreProjet;
        this.descriptionProjet = descriptionProjet;
    };
    ListeProjetComponent.prototype.active = function (element) {
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
    return ListeProjetComponent;
}());
ListeProjetComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/addProjet/listeProjet.component.html',
        styleUrls: ['app/addProjet/listeProjet.component.css']
    }),
    __metadata("design:paramtypes", [Projet_service_1.ProjetService])
], ListeProjetComponent);
exports.ListeProjetComponent = ListeProjetComponent;
//# sourceMappingURL=listeProjet.component.js.map