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
var Affecter_service_1 = require("./../model/Affecter.service");
var CollaborateurProjet_service_1 = require("./../model/CollaborateurProjet.service");
var Semaine_service_1 = require("./../model/Semaine.service");
var PaginationMois_1 = require("./../model/PaginationMois");
var CollaborateurSemaine_service_1 = require("./../model/CollaborateurSemaine.service");
var PlanningComponent = (function () {
    function PlanningComponent(_planninfService, _planificationService, _semaineService, _affecterService, _collaborateurProjetService, _collaborateurSemaineService) {
        this._planninfService = _planninfService;
        this._planificationService = _planificationService;
        this._semaineService = _semaineService;
        this._affecterService = _affecterService;
        this._collaborateurProjetService = _collaborateurProjetService;
        this._collaborateurSemaineService = _collaborateurSemaineService;
        this.mois = [];
        this.affecterUpdate = [];
        this.isExist = false;
        this.msgError = '';
        this.buttonActive = 0;
        this.cmpt = 0;
        this.information = '';
        this.update = false;
        this.nomCollaborateur = '';
        this.dataDissmiss = '';
        this.filterQuery = "";
        this.debut = 0;
    }
    PlanningComponent.prototype.testUpdate = function () {
        var _this = this;
        var existZero = false;
        for (var _i = 0, _a = this.affecterUpdate; _i < _a.length; _i++) {
            var affecter = _a[_i];
            var id = 'u_' + affecter.collaborateur.idCollaborateur + '_' + affecter.projet.idProjet + '_' + affecter.semaine.idSemaine;
            var test = +document.getElementById(id).value;
            var test2 = document.getElementById(id).value;
            if (test2 === '') {
                this.msgError = 'Nombre jour ne doit pas ete vide';
                this.dataDissmiss = '';
                setInterval(function () { _this.msgError = ''; }, 5000);
                existZero = true;
            }
            else if (test2 === '0') {
                this.msgError = 'Nombre jour ne doit pas ete 0';
                this.dataDissmiss = '';
                setInterval(function () { _this.msgError = ''; }, 5000);
                existZero = true;
            }
        }
        if (existZero === false) {
            for (var _b = 0, _c = this.affecterUpdate; _b < _c.length; _b++) {
                var affecter = _c[_b];
                var id = 'u_' + affecter.collaborateur.idCollaborateur + '_' + affecter.projet.idProjet + '_' + affecter.semaine.idSemaine;
                var test = +document.getElementById(id).value;
                var test2 = document.getElementById(id).value;
                console.log(test);
                this._affecterService.addAffectation(affecter.collaborateur.idCollaborateur, affecter.projet.idProjet, affecter.semaine.idSemaine, test).subscribe(function (data) {
                    _this.reponse = data;
                    _this.ngOnInit();
                }, function (error) { console.log(error); });
            }
            this.dataDissmiss = 'modal';
        }
    };
    PlanningComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._planninfService.getPlanning().subscribe(function (data) { return _this.plannings = data; });
        this._affecterService.getAffectations().subscribe(function (data) { return _this.affecters = data; });
        this._collaborateurSemaineService.getCollaborateurSemaine().subscribe(function (data) { return _this.collaborateurSemaine = data; });
    };
    PlanningComponent.prototype.getUpdate = function (idCollaborateur, idSemaine, idProjet) {
        this.dataDissmiss = '';
        this.affecterUpdate = [];
        for (var _i = 0, _a = this.affecters; _i < _a.length; _i++) {
            var affecter = _a[_i];
            if (affecter.collaborateur.idCollaborateur == idCollaborateur && affecter.semaine.idSemaine == idSemaine) {
                console.log(affecter.projet.idProjet + ' - ' + affecter.collaborateur.idCollaborateur + ' - ' + affecter.semaine.idSemaine);
                this.affecterUpdate.push(affecter);
                this.nomCollaborateur = affecter.collaborateur.nom + ' ' + affecter.collaborateur.prenom;
            }
        }
    };
    PlanningComponent.prototype.afficherInformation = function (idCollaborateur, idSemaine, idProjet, nbrJour) {
        for (var _i = 0, _a = this.collaborateurSemaine; _i < _a.length; _i++) {
            var collaborateurSemaine = _a[_i];
            if (collaborateurSemaine.idCollaborateur == idCollaborateur && collaborateurSemaine.idSemaine == idSemaine && collaborateurSemaine.idProjet == idProjet) {
                this.cmpt = collaborateurSemaine.nbrJourTotal;
                this.information = collaborateurSemaine.information;
                document.getElementById('t_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).innerHTML = this.information;
                if (this.cmpt > nbrJour) {
                    document.getElementById('s_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.color = 'white';
                    document.getElementById('champ_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.backgroundColor = 'red';
                }
                else if (this.cmpt == nbrJour) {
                    document.getElementById('s_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.color = 'white';
                    document.getElementById('champ_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.backgroundColor = 'orange';
                }
                else if (this.cmpt < nbrJour) {
                    document.getElementById('s_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.color = 'white';
                    document.getElementById('champ_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.backgroundColor = 'green';
                }
            }
        }
    };
    PlanningComponent.prototype.existeAffectation = function (idCollaborateur, idProjet, idSemaine) {
        var affecterF = null;
        for (var _i = 0, _a = this.affecters; _i < _a.length; _i++) {
            var affecter = _a[_i];
            if (affecter.collaborateur.idCollaborateur == idCollaborateur &&
                affecter.projet.idProjet == idProjet &&
                affecter.semaine.idSemaine == idSemaine) {
                affecterF = affecter;
            }
        }
        return affecterF;
    };
    PlanningComponent.prototype.afficherAffectation = function (idCollaborateur, idProjet, idSemaine) {
        var affecterF = null;
        this.information = '';
        var numeroSemaine = 0;
        this.cmpt = 0;
        for (var _i = 0, _a = this.affecters; _i < _a.length; _i++) {
            var affecter = _a[_i];
            if (affecter.collaborateur.idCollaborateur == idCollaborateur &&
                affecter.projet.idProjet == idProjet &&
                affecter.semaine.idSemaine == idSemaine) {
                affecterF = affecter;
            }
            if (affecterF != null) {
                if (affecterF.collaborateur.idCollaborateur == idCollaborateur &&
                    affecterF.semaine.idSemaine == idSemaine) {
                    this.afficherInformation(affecterF.collaborateur.idCollaborateur, affecterF.semaine.idSemaine, affecterF.projet.idProjet, affecterF.semaine.nbrJour);
                    /*setTimeout(() => {
                        this.changerCouleur(affecterF.collaborateur.idCollaborateur, affecterF.semaine.idSemaine, affecterF.projet.idProjet, affecterF.semaine.nbrJour);
                    }, 1000);*/
                }
            }
        }
        return affecterF;
    };
    PlanningComponent.prototype.afficherPage = function (page) {
        var _this = this;
        this.pagination.page = page;
        this.pagination.selectdPage = this.pagination.pages[this.pagination.page];
        var start = 0;
        this.pagination.pages.forEach(function (b, index) { return start += index < _this.pagination.page ? b.reduce(function (a1, b1) { return a1 + b1.nbrSemaine; }, 0) : 0; });
        this.pagination.semainePage = this.semaines.slice(start, start + this.pagination.selectdPage.reduce(function (a, b) { return a + b.nbrSemaine; }, 0));
        if (this.pagination.pages.length == this.pagination.page + 1) {
            document.getElementById("next").disabled = true;
            document.getElementById("previews").disabled = false;
        }
        else if (this.pagination.page == 0) {
            document.getElementById("next").disabled = false;
            document.getElementById("previews").disabled = true;
        }
        else {
            document.getElementById("next").disabled = false;
            document.getElementById("previews").disabled = false;
        }
    };
    PlanningComponent.prototype.nextPage = function () {
        var _this = this;
        if (this.pagination.pages.length > this.pagination.page + 1) {
            this.pagination.page++;
            this.debut = this.debut + this.pagination.semainePage.length;
            console.log('Next : ' + this.debut);
            this.pagination.selectdPage = this.pagination.pages[this.pagination.page];
            var start_1 = 0;
            this.pagination.pages.forEach(function (b, index) { return start_1 += index < _this.pagination.page ? b.reduce(function (a1, b1) { return a1 + b1.nbrSemaine; }, 0) : 0; });
            this.pagination.semainePage = this.semaines.slice(start_1, start_1 + this.pagination.selectdPage.reduce(function (a, b) { return a + b.nbrSemaine; }, 0));
        }
        if (this.pagination.pages.length == this.pagination.page + 1) {
            document.getElementById("next").disabled = true;
            document.getElementById("previews").disabled = false;
        }
        else {
            document.getElementById("next").disabled = false;
            document.getElementById("previews").disabled = false;
        }
    };
    PlanningComponent.prototype.previews = function () {
        var _this = this;
        if (this.pagination.page > 0) {
            this.pagination.page--;
            this.pagination.selectdPage = this.pagination.pages[this.pagination.page];
            var start_2 = 0;
            this.pagination.pages.forEach(function (b, index) { return start_2 += index < _this.pagination.page ? b.reduce(function (a1, b1) { return a1 + b1.nbrSemaine; }, 0) : 0; });
            this.pagination.semainePage = this.semaines.slice(start_2, start_2 + this.pagination.selectdPage.reduce(function (a, b) { return a + b.nbrSemaine; }, 0));
            this.debut = this.debut - this.pagination.semainePage.length;
            console.log('Preview : ' + this.debut);
        }
        if (this.pagination.page == 0) {
            document.getElementById("next").disabled = false;
            document.getElementById("previews").disabled = true;
        }
        else {
            document.getElementById("next").disabled = false;
            document.getElementById("previews").disabled = false;
        }
    };
    PlanningComponent.prototype.recupererTable = function () {
        var test = document.getElementById('tablePlanning').innerHTML;
        console.log(test);
    };
    PlanningComponent.prototype.exportToCSV = function () {
        /*var csvContent1 = [
            {
                "idColaborateur": 1,
                "idSemaine": 1,
                "idProjet": 1,
                "information": "Projet 1, Nombre jour : 1",
                "nbrJourTotal": 1
            },
            {
                "idColaborateur": 1,
                "idSemaine": 2,
                "idProjet": 1,
                "information": "Projet 1, Nombre jour : 2<br/>Projet 2, Nombre jour : 6",
                "nbrJourTotal": 8
            }];
        //create column_names here, sep by commas, append them to "csvContent", end with /n
        //create your data rows sep by commas & quoted, end with /n
        var filename = ('title').replace(/ /g, '_') + '.csv'; //gen a filename using the title but getting rid of spaces
        var blob = new Blob([csvContent1,', test'], { "type": 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        }
        else //create a link and click it
        {
            var link = document.createElement("a");
            if (link.download !== undefined) // feature detection
            {
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }*/
    };
    PlanningComponent.prototype.addPlanification = function (idCollaborateur, idProjet, idSemaine, event) {
        var _this = this;
        var exist = false;
        if (event.target.value !== '') {
            for (var _i = 0, _a = this.affecters; _i < _a.length; _i++) {
                var affecter = _a[_i];
                if (affecter.collaborateur.idCollaborateur == idCollaborateur &&
                    affecter.projet.idProjet == idProjet &&
                    affecter.semaine.idSemaine == idSemaine) {
                    exist = true;
                }
            }
            console.log('target : ' + event.target.value + ' - existe : ' + exist);
            if (event.target.value !== '0' && exist === true) {
                this._affecterService.addAffectation(idCollaborateur, idProjet, idSemaine, event.target.value).subscribe(function (data) {
                    _this.reponse = data;
                    _this.ngOnInit();
                    _this.afficherAffectation(idCollaborateur, idProjet, idSemaine);
                    document.getElementById('i_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.display = 'none';
                    document.getElementById('i_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.color = _this.reponse.msgError;
                    document.getElementById('s_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.display = '';
                }, function (error) { console.log(error); });
            }
            else if (event.target.value !== '0' && exist === false) {
                this._affecterService.addAffectation(idCollaborateur, idProjet, idSemaine, event.target.value).subscribe(function (data) {
                    _this.reponse = data;
                    _this.ngOnInit();
                    _this.afficherAffectation(idCollaborateur, idProjet, idSemaine);
                    document.getElementById('i_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.display = 'none';
                    document.getElementById('i_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.color = _this.reponse.msgError;
                    document.getElementById('s_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.display = '';
                }, function (error) { console.log(error); });
            }
            else if (event.target.value === '0' && exist === false) {
                document.getElementById('i_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.display = 'none';
                document.getElementById('s_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.display = '';
            }
        }
        else {
            alert('Champ  vide');
        }
    };
    PlanningComponent.prototype.chargementDonnees = function () {
        var _this = this;
        this._planninfService.getPlanningById(this.idPlanning).subscribe(function (data) {
            _this.planning = data;
            console.log(_this.planning.anneeDebut);
        });
        this._collaborateurProjetService.getCollaborateurProjetByPlanning(this.idPlanning).subscribe(function (data) { return _this.affecterF = data; });
        this._planninfService.getPlanningProjets(this.idPlanning).subscribe(function (data) {
            _this.plannigProjets = data;
        });
        this._planificationService.getPlanificationByPlanning(this.idPlanning).subscribe(function (data) { return _this.planification = data; });
        this._semaineService.getMois(this.idPlanning).subscribe(function (data) {
            _this.mois = data;
            _this.pagination = new PaginationMois_1.PaginationMois();
            _this.pagination.pages = [];
            _this.pagination.size = 3;
            for (var i = 0; i < _this.mois.length / _this.pagination.size; i++) {
                var start = i * _this.pagination.size;
                var tab = _this.mois.slice(start, start + _this.pagination.size);
                _this.pagination.pages.push(tab);
            }
            _this.pagination.page = 0;
            console.log(_this.pagination.pages.length);
            _this.buttonActive = _this.pagination.pages.length;
            _this.pagination.selectdPage = _this.pagination.pages[_this.pagination.page];
            _this._semaineService.getSemaineByPlanning(_this.idPlanning).subscribe(function (data2) {
                _this.semaines = data2;
                var start = 0;
                _this.pagination.pages.forEach(function (b, index) { return start += index < _this.pagination.page ? b.reduce(function (a1, b1) { return a1 + b1.nbrSemaine; }, 0) : 0; });
                _this.pagination.semainePage = _this.semaines.slice(start, start + _this.pagination.selectdPage.reduce(function (a, b) { return a + b.nbrSemaine; }, 0));
                _this.debut = 0;
            });
        });
    };
    return PlanningComponent;
}());
PlanningComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/planning/planning.component.html'
    }),
    __metadata("design:paramtypes", [Planning_service_1.PlanningService, Planification_service_1.PlanificationService,
        Semaine_service_1.SemaineService, Affecter_service_1.AffecterService,
        CollaborateurProjet_service_1.CollaborateurProjetService,
        CollaborateurSemaine_service_1.CollaborateurSemaineService])
], PlanningComponent);
exports.PlanningComponent = PlanningComponent;
//# sourceMappingURL=planning.component.js.map