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
var angular_dual_listbox_1 = require("angular-dual-listbox");
var Projet_service_1 = require("./../model/Projet.service");
var Collaborateur_service_1 = require("./../model/Collaborateur.service");
var CollaborateurProjet_service_1 = require("./../model/CollaborateurProjet.service");
var AddCollaborateurProjetComponent = (function () {
    function AddCollaborateurProjetComponent(_collaborateurProjetService, _projetService, _collaborateurService) {
        this._collaborateurProjetService = _collaborateurProjetService;
        this._projetService = _projetService;
        this._collaborateurService = _collaborateurService;
        this.tab = 1;
        this.keepSorted = true;
        this.filter = true;
        this.userAdd = '';
        this.sourceLeft = true;
        this.format = angular_dual_listbox_1.DualListComponent.DEFAULT_FORMAT;
        this.toggle = true;
        this.existCollaborateur = false;
        this.msgError = '';
        this.reponse = '';
    }
    AddCollaborateurProjetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._collaborateurService.getCollaborateurs().subscribe(function (data) { return _this.collaborateurs = data; });
    };
    AddCollaborateurProjetComponent.prototype.addCollaborateurProjet = function () {
        var _this = this;
        console.log(this.confirmedStations);
        if (this.confirmedStations.length != 0) {
            this._collaborateurProjetService.addCollaborateurProjet(this.idCollaborateur, this.confirmedStations).subscribe(function (data) {
                _this.reponses = data;
                console.log(data);
                if (_this.reponses.msgError != 'success') {
                    _this.msgError = _this.reponses.msgError;
                }
                else {
                    _this.reponse = _this.reponses.msgError;
                    setInterval(function () { _this.reponse = ''; }, 3000);
                    _this.msgError = '';
                    _this.idCollaborateur = null;
                    _this.doReset();
                    _this.existCollaborateur = false;
                }
            }, function (error) { return _this.msgError = error; });
        }
        else {
            this.reponse = '';
            this.msgError = 'Sélectionner au moin un projet';
        }
    };
    AddCollaborateurProjetComponent.prototype.afficherProjet = function (idCollaborateur) {
        var _this = this;
        this._projetService.getProjets(idCollaborateur).subscribe(function (data) {
            _this.stations = data;
            _this.doReset();
            _this.existCollaborateur = true;
        });
    };
    AddCollaborateurProjetComponent.prototype.useStations = function () {
        console.log('station 2 : ', this.stations);
        this.toggle = true;
        this.key = 'idProjet';
        this.display = 'titreProjet';
        this.keepSorted = true;
        this.source = this.sourceStations;
        this.confirmed = this.confirmedStations;
    };
    AddCollaborateurProjetComponent.prototype.doReset = function () {
        this.sourceStations = this.stations;
        this.confirmedStations = new Array();
        this.useStations();
    };
    AddCollaborateurProjetComponent.prototype.doDelete = function () {
        if (this.source.length > 0) {
            this.source.splice(0, 1);
        }
    };
    AddCollaborateurProjetComponent.prototype.doCreate = function () {
        var o = {};
        o[this.key] = this.source.length + 1;
        o[this.display] = this.userAdd;
        this.source.push(o);
        this.userAdd = '';
    };
    AddCollaborateurProjetComponent.prototype.doAdd = function () {
        var _this = this;
        var _loop_1 = function (i, len) {
            var o = this_1.source[i];
            var found = this_1.confirmed.find(function (e) { return e[_this.key] === o[_this.key]; });
            if (!found) {
                this_1.confirmed.push(o);
                return "break";
            }
        };
        var this_1 = this;
        for (var i = 0, len = this.source.length; i < len; i += 1) {
            var state_1 = _loop_1(i, len);
            if (state_1 === "break")
                break;
        }
    };
    AddCollaborateurProjetComponent.prototype.doRemove = function () {
        if (this.confirmed.length > 0) {
            this.confirmed.splice(0, 1);
        }
    };
    AddCollaborateurProjetComponent.prototype.doFilter = function () {
        this.filter = !this.filter;
    };
    AddCollaborateurProjetComponent.prototype.swapDirection = function () {
        this.sourceLeft = !this.sourceLeft;
        this.format.direction = this.sourceLeft ? angular_dual_listbox_1.DualListComponent.LTR : angular_dual_listbox_1.DualListComponent.RTL;
    };
    AddCollaborateurProjetComponent.prototype.active = function (element) {
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
    return AddCollaborateurProjetComponent;
}());
AddCollaborateurProjetComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/addCollaborateurProjet/AddCollaborateurProjet.component.html'
    }),
    __metadata("design:paramtypes", [CollaborateurProjet_service_1.CollaborateurProjetService, Projet_service_1.ProjetService,
        Collaborateur_service_1.CollaborateurService])
], AddCollaborateurProjetComponent);
exports.AddCollaborateurProjetComponent = AddCollaborateurProjetComponent;
//# sourceMappingURL=AddCollaborateurProjet.component.js.map