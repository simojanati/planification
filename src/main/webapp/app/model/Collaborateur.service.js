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
var CollaborateurService = (function () {
    function CollaborateurService(_http, urlRest) {
        this._http = _http;
        this.urlRest = urlRest;
        this._collaborateurUrl = this.urlRest.getUrl() + 'collaborateur/getCollaborateurs';
        this._deleteUrl = this.urlRest.getUrl() + 'collaborateur/deleteCollaborateur';
        this._addUrl = this.urlRest.getUrl() + 'collaborateur/addCollaborateur';
        this._updateUrl = this.urlRest.getUrl() + 'collaborateur/updateCollaborateur';
    }
    CollaborateurService.prototype.getCollaborateurs = function () {
        return this._http.get(this._collaborateurUrl)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CollaborateurService.prototype.addCollaborateur = function (nom, prenom, email, tel, dateRecrutement) {
        var body = 'nom=' + nom + '&&prenom=' + prenom + '&&email=' + email + '&&tel=' + tel + '&&dateRecrutement=' + dateRecrutement;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._addUrl, body, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CollaborateurService.prototype.updateCollaborateur = function (idCollaborateur, nom, prenom, email, tel, dateRecrutement) {
        var body = 'idCollaborateur=' + idCollaborateur + '&&nom=' + nom + '&&prenom=' + prenom + '&&email=' + email + '&&tel=' + tel + '&&dateRecrutement=' + dateRecrutement;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._updateUrl, body, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CollaborateurService.prototype.deleteCollaborateurs = function (idCollaborateur) {
        return this._http.get(this._deleteUrl + '?idCollaborateur=' + idCollaborateur)
            .map(function (response) { return response.text(); })
            .catch(this.handleError);
    };
    CollaborateurService.prototype.handleError = function (error) {
        console.error('ERROR : ', error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return CollaborateurService;
}());
CollaborateurService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, URLRest_1.URLRest])
], CollaborateurService);
exports.CollaborateurService = CollaborateurService;
//# sourceMappingURL=Collaborateur.service.js.map