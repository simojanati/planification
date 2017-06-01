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
var Planning_service_1 = require("./../model/Planning.service");
var Planification_service_1 = require("./../model/Planification.service");
var Mois_service_1 = require("./../model/Mois.service");
var ListePlanningComponent = (function () {
    function ListePlanningComponent(_planningService, _planificationService, _moisService) {
        this._planningService = _planningService;
        this._planificationService = _planificationService;
        this._moisService = _moisService;
        this.filterQuery = "";
        this.rowsOnPage = 10;
        this.sortBy = "nomPlanning";
        this.sortOrder = "asc";
        this.message = '';
        this.msgError = '';
        this.dataDissmiss = '';
        this.reponse = '';
    }
    ListePlanningComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._planificationService.getAllPlanification()
            .subscribe(function (data) {
            _this.planifications = data;
        });
        this._moisService.getMois()
            .subscribe(function (mois) { return _this.mois = mois; }, function (error) { return _this.msgError = error; });
        this._planningService.getPlanning()
            .subscribe(function (data) {
            setTimeout(function () {
                _this.data = data;
            }, 1000);
        });
    };
    ListePlanningComponent.prototype.remplirDonnee = function (idPlanning, nomPlanning, moisDebut, moisFin, anneeDebut, anneeFin) {
        this.idPlanning = idPlanning;
        this.nomPlanning = nomPlanning;
        this.moisDebut = moisDebut;
        this.moisFin = moisFin;
        this.anneeDebut = anneeDebut;
        this.anneeFin = anneeFin;
    };
    ListePlanningComponent.prototype.updatePlanning = function () {
        var _this = this;
        if (this.nomPlanning === '') {
            this.msgError = 'Le champe nom ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(function () { _this.msgError = ''; }, 5000);
        }
        else if (this.anneeDebut === null) {
            this.msgError = 'Le champe année debut ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(function () { _this.msgError = ''; }, 5000);
        }
        else if (this.anneeFin === null) {
            this.msgError = 'Le champe année fin ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(function () { _this.msgError = ''; }, 5000);
        }
        else {
            this.dataDissmiss = 'modal';
            this._planningService.updatePlanning(this.idPlanning, this.nomPlanning, this.MoisByNumber(this.moisDebut), this.anneeDebut, this.MoisByNumber(this.moisFin), this.anneeFin)
                .subscribe(function (result) {
                _this.planning = result;
                _this.msgError = '';
                _this.ngOnInit();
            }, function (error) {
                _this.msgError = error;
                console.log(error);
            });
        }
    };
    ListePlanningComponent.prototype.MoisByNumber = function (x) {
        var mois = x;
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
            default: {
                return mois;
            }
        }
    };
    ListePlanningComponent.prototype.getProjetByPlanning = function (idPlanning) {
        var projets = '';
        for (var _i = 0, _a = this.planifications; _i < _a.length; _i++) {
            var planification = _a[_i];
            if (planification.planning.idPlanning == idPlanning) {
                if (projets != '') {
                    projets = projets + ', ' + planification.projet.titreProjet;
                }
                else {
                    projets = planification.projet.titreProjet;
                }
            }
        }
        return projets;
    };
    ListePlanningComponent.prototype.deletePlanning = function (idPlanning) {
        var _this = this;
        this._planningService.deletePlanning(idPlanning)
            .subscribe(function (data) {
            _this.message = data;
            _this.ngOnInit();
            console.log(_this.message);
        });
    };
    ListePlanningComponent.prototype.active = function (element) {
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
    return ListePlanningComponent;
}());
ListePlanningComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/addPlanning/listePlanning.component.html',
        styleUrls: ['app/addPlanning/listePlanning.component.css']
    }),
    __metadata("design:paramtypes", [Planning_service_1.PlanningService, Planification_service_1.PlanificationService,
        Mois_service_1.MoisService])
], ListePlanningComponent);
exports.ListePlanningComponent = ListePlanningComponent;
//# sourceMappingURL=listePlanning.component.js.map