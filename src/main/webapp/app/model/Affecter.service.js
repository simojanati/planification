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
var URLRest_1 = require("./URLRest");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var AffecterService = (function () {
    function AffecterService(_http, urlRest) {
        this._http = _http;
        this.urlRest = urlRest;
        this._AffectaerUrl = this.urlRest.getUrl() + 'affecter/getAffectations';
    }
    AffecterService.prototype.getAffectations = function () {
        return this._http.get(this._AffectaerUrl)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AffecterService.prototype.addAffectation = function (idCollaborateur, idProjet, idSemaine, nbrJour) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var result = this._http.post(this.urlRest.getUrl() + 'affecter/addAffectation', {
            idCollaborateur: idCollaborateur,
            idProjet: idProjet,
            idSemaine: idSemaine,
            nbrJour: nbrJour
        }, { headers: headers })
            .map(function (response) { return response.json(); });
        return result;
    };
    AffecterService.prototype.handleError = function (error) {
        console.error('ERROR : ', error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return AffecterService;
}());
AffecterService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, URLRest_1.URLRest])
], AffecterService);
exports.AffecterService = AffecterService;
//# sourceMappingURL=Affecter.service.js.map