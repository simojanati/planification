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
var http_1 = require("@angular/http");
var URLRest_1 = require("./URLRest");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var ProjetService = (function () {
    function ProjetService(_http, urlRest) {
        this._http = _http;
        this.urlRest = urlRest;
        this._projetsUrl = this.urlRest.getUrl() + 'projet/getProjets';
        this._addUrl = this.urlRest.getUrl() + 'projet/addProjet';
        this._updateUrl = this.urlRest.getUrl() + 'projet/updateProjet';
        this._projetUrl = this.urlRest.getUrl() + 'projet/getProjet';
        this._deleteUrl = this.urlRest.getUrl() + 'projet/deleteProjet';
        this._projetByPlanningUrl = this.urlRest.getUrl() + 'projet/getProjetByPlanning';
    }
    ProjetService.prototype.getProjets = function (idCollaborateur) {
        return this._http.get(this._projetsUrl + '?idCollaborateur=' + idCollaborateur)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ProjetService.prototype.addProjet = function (titreProjet, descriptionProjet) {
        var body = 'titreProjet=' + titreProjet + '&&descriptionProjet=' + descriptionProjet;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._addUrl, body, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ProjetService.prototype.updateProjet = function (idProjet, titreProjet, descriptionProjet) {
        var body = 'idProjet=' + idProjet + '&&titreProjet=' + titreProjet + '&&descriptionProjet=' + descriptionProjet;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._updateUrl, body, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ProjetService.prototype.deleteProjet = function (idProjet) {
        return this._http.get(this._deleteUrl + '?idProjet=' + idProjet)
            .map(function (response) { return response.text(); })
            .catch(this.handleError);
    };
    ProjetService.prototype.getProjetsByPlanning = function (idPlanning) {
        return this._http.get(this._projetByPlanningUrl + '?idPLanning=' + idPlanning)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ProjetService.prototype.getProjet = function () {
        return this._http.get(this._projetUrl)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ProjetService.prototype.handleError = function (error) {
        console.error('ERROR : ', error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return ProjetService;
}());
ProjetService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, URLRest_1.URLRest])
], ProjetService);
exports.ProjetService = ProjetService;
//# sourceMappingURL=Projet.service.js.map