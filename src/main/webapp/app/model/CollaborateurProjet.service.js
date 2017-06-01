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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var CollaborateurProjetService = (function () {
    function CollaborateurProjetService(_http) {
        this._http = _http;
        this._affecterUrl = 'http://localhost:8080/collaborateurProjet/getCollaborateurProjet';
        this._addAffecterUrl = 'http://localhost:8080/collaborateurProjet/addCollaborateurProjet';
        this._affecterByPlanningUrl = 'http://localhost:8080/collaborateurProjet/getCollaborateurProjetByPlanning';
        this._deleteUrl = 'http://localhost:8080/collaborateurProjet/deleteCollaborateurProjet';
    }
    CollaborateurProjetService.prototype.getCollaborateurProjet = function () {
        return this._http.get(this._affecterUrl)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CollaborateurProjetService.prototype.getCollaborateurProjetByPlanning = function (idPlanning) {
        return this._http.get(this._affecterByPlanningUrl + '?idPlanning=' + idPlanning)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CollaborateurProjetService.prototype.deleteCollaborateurProjet = function (idCollaborateur, idProjet) {
        return this._http.get(this._deleteUrl + '?idCollaborateur=' + idCollaborateur + '&idProjet=' + idProjet)
            .map(function (response) { return response.text(); })
            .catch(this.handleError);
    };
    CollaborateurProjetService.prototype.addCollaborateurProjet = function (idCollaborateur, projets) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var result = this._http.post(this._addAffecterUrl, {
            idCollaborateur: idCollaborateur,
            projets: projets
        }, { headers: headers })
            .map(function (response) { return response.json(); });
        return result;
    };
    CollaborateurProjetService.prototype.handleError = function (error) {
        console.error('ERROR : ', error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return CollaborateurProjetService;
}());
CollaborateurProjetService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CollaborateurProjetService);
exports.CollaborateurProjetService = CollaborateurProjetService;
//# sourceMappingURL=CollaborateurProjet.service.js.map