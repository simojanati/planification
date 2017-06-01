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
var Mois_service_1 = require("./../model/Mois.service");
var Affecter_service_1 = require("./../model/Affecter.service");
var Planning_service_1 = require("./../model/Planning.service");
var Planification_service_1 = require("./../model/Planification.service");
var AddPlanningComponent = (function () {
    function AddPlanningComponent(_affecterService, _moisService, _planningService, _planificationService, _projetService) {
        this._affecterService = _affecterService;
        this._moisService = _moisService;
        this._planningService = _planningService;
        this._planificationService = _planificationService;
        this._projetService = _projetService;
        this.tab = 1;
        this.keepSorted = true;
        this.filter = true;
        this.userAdd = '';
        this.msgError = '';
        this.reponse = '';
        this.sourceLeft = true;
        this.format = angular_dual_listbox_1.DualListComponent.DEFAULT_FORMAT;
        this.toggle = true;
    }
    AddPlanningComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._projetService.getProjet()
            .subscribe(function (data) {
            _this.stations = data;
            _this.doReset();
        });
        this._moisService.getMois()
            .subscribe(function (mois) { return _this.mois = mois; }, function (error) { return _this.msgError = error; });
    };
    AddPlanningComponent.prototype.useStations = function () {
        console.log('station 2 : ', this.stations);
        this.toggle = true;
        this.key = 'idProjet';
        this.display = 'titreProjet';
        this.keepSorted = true;
        this.source = this.sourceStations;
        this.confirmed = this.confirmedStations;
    };
    AddPlanningComponent.prototype.doReset = function () {
        this.sourceStations = this.stations;
        this.confirmedStations = new Array();
        this.useStations();
    };
    AddPlanningComponent.prototype.doDelete = function () {
        if (this.source.length > 0) {
            this.source.splice(0, 1);
        }
    };
    AddPlanningComponent.prototype.doCreate = function () {
        var o = {};
        o[this.key] = this.source.length + 1;
        o[this.display] = this.userAdd;
        this.source.push(o);
        this.userAdd = '';
    };
    AddPlanningComponent.prototype.doAdd = function () {
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
    AddPlanningComponent.prototype.doRemove = function () {
        if (this.confirmed.length > 0) {
            this.confirmed.splice(0, 1);
        }
    };
    AddPlanningComponent.prototype.doFilter = function () {
        this.filter = !this.filter;
    };
    AddPlanningComponent.prototype.swapDirection = function () {
        this.sourceLeft = !this.sourceLeft;
        this.format.direction = this.sourceLeft ? angular_dual_listbox_1.DualListComponent.LTR : angular_dual_listbox_1.DualListComponent.RTL;
    };
    AddPlanningComponent.prototype.ajouterPlanning = function () {
        var _this = this;
        console.log(this.confirmedStations);
        if (this.anneeDebut == null || this.anneeFin == null || this.moisDebut == null || this.moisFin == null) {
            this.msgError = 'tout les champs sans obligatoire';
        }
        else {
            if (this.anneeDebut > this.anneeFin) {
                this.msgError = 'année debut doit etre inferieur a année fin';
            }
            else {
                if (this.moisDebut > this.moisFin) {
                    this.msgError = 'mois debut doit etre inferieur a mois fin';
                }
                else {
                    this._planningService.addPlanning(this.nomPlanning, this.MoisByNumber(this.moisDebut), this.anneeDebut.toString(), this.MoisByNumber(this.moisFin), this.anneeFin.toString()).subscribe(function (result) {
                        _this.idPlanning = result.idPlanning;
                        _this.addAffectation(_this.idPlanning);
                        console.log('idPlanning', _this.idPlanning);
                    }, function (error) { return _this.msgError = error; });
                }
            }
        }
    };
    AddPlanningComponent.prototype.addAffectation = function (idPlanning) {
        var _this = this;
        this._planificationService.addPlanification(idPlanning, this.confirmedStations).subscribe(function (data) { console.log(data); }, function (error) { return _this.msgError = error; });
        if (this.msgError == '') {
            this.reponse = 'Success';
            this.nomPlanning = '';
            this.moisDebut = null;
            this.moisFin = null;
            this.anneeDebut = null;
            this.anneeFin = null;
            this.doReset();
            setInterval(function () { _this.reponse = ''; }, 3000);
            this.msgError = '';
        }
        else {
            this.reponse = '';
        }
    };
    AddPlanningComponent.prototype.MoisByNumber = function (x) {
        var mois = '' + x;
        switch (mois) {
            case '1': {
                return 'Janvier';
            }
            case '2': {
                return 'Février';
            }
            case '3': {
                return 'Mars';
            }
            case '4': {
                return 'Avril';
            }
            case '5': {
                return 'Mai';
            }
            case '6': {
                return 'Juin';
            }
            case '7': {
                return 'Juillet';
            }
            case '8': {
                return 'Août';
            }
            case '9': {
                return 'Septembre';
            }
            case '10': {
                return 'Octobre';
            }
            case '11': {
                return 'Novembre';
            }
            case '12': {
                return 'Décembre';
            }
        }
    };
    AddPlanningComponent.prototype.active = function (element) {
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
    return AddPlanningComponent;
}());
AddPlanningComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/addPlanning/addPlanning.component.html'
    }),
    __metadata("design:paramtypes", [Affecter_service_1.AffecterService, Mois_service_1.MoisService, Planning_service_1.PlanningService,
        Planification_service_1.PlanificationService, Projet_service_1.ProjetService])
], AddPlanningComponent);
exports.AddPlanningComponent = AddPlanningComponent;
//# sourceMappingURL=addPlanning.component.js.map