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
var PlanningService = (function () {
    function PlanningService(_http, urlRest) {
        this._http = _http;
        this.urlRest = urlRest;
        this._PlanningUrl = this.urlRest.getUrl() + 'planning/getPlanning';
        this._PlanningByIdUrl = this.urlRest.getUrl() + 'planning/getPlanningById';
        this._deleteUrl = this.urlRest.getUrl() + 'planning/deletePlanning';
        this._addUrl = this.urlRest.getUrl() + 'planning/addPlanning';
        this._updateUrl = this.urlRest.getUrl() + 'planning/updatePlanning';
        this._PlanningProjetsUrl = this.urlRest.getUrl() + 'planning/getplanningProjets';
    }
    PlanningService.prototype.getPlanning = function () {
        console.log(this.urlRest.getUrl());
        return this._http.get(this._PlanningUrl)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PlanningService.prototype.getPlanningById = function (idPlanning) {
        return this._http.get(this._PlanningByIdUrl + '?idPlanning=' + idPlanning)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PlanningService.prototype.getPlanningProjets = function (idPlanning) {
        return this._http.get(this._PlanningProjetsUrl + '?idPlanning=' + idPlanning)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PlanningService.prototype.deletePlanning = function (idPlanning) {
        return this._http.get(this._deleteUrl + '?idPlanning=' + idPlanning)
            .map(function (response) { return response.text(); })
            .catch(this.handleError);
    };
    PlanningService.prototype.addPlanning = function (nomPlanning, moisDebut, anneeDebut, moisFin, anneeFin) {
        var body = 'nomPlanning=' + nomPlanning + '&&moisDebut=' + moisDebut + '&&anneeDebut=' + anneeDebut + '&&moisFin=' + moisFin + '&&anneeFin=' + anneeFin;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._addUrl, body, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PlanningService.prototype.updatePlanning = function (idPlanning, nomPlanning, moisDebut, anneeDebut, moisFin, anneeFin) {
        var body = 'idPlanning=' + idPlanning + '&&nomPlanning=' + nomPlanning + '&&moisDebut=' + moisDebut + '&&anneeDebut=' + anneeDebut + '&&moisFin=' + moisFin + '&&anneeFin=' + anneeFin;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._updateUrl, body, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PlanningService.prototype.handleError = function (error) {
        console.error('ERROR : ', error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return PlanningService;
}());
PlanningService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, URLRest_1.URLRest])
], PlanningService);
exports.PlanningService = PlanningService;
//# sourceMappingURL=Planning.service.js.map