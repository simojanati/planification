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
var PlanificationService = (function () {
    function PlanificationService(_http) {
        this._http = _http;
        this._PlanificationUrl = 'http://localhost:8080/planification/getPlanification';
        this._PlanificationsUrl = 'http://localhost:8080/planification/getAllPlanification';
    }
    PlanificationService.prototype.getAllPlanification = function () {
        return this._http.get(this._PlanificationsUrl)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PlanificationService.prototype.getPlanificationByPlanning = function (idPlanning) {
        return this._http.get(this._PlanificationUrl + '?idPlanning=' + idPlanning)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PlanificationService.prototype.addPlanification = function (idPlanning, affecters) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var result = this._http.post('http://localhost:8080/planification/addPlanification', {
            idPlanning: idPlanning,
            projets: affecters
        }, { headers: headers })
            .map(function (res) { return res.json(); });
        return result;
    };
    PlanificationService.prototype.handleError = function (error) {
        console.error('ERROR : ', error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return PlanificationService;
}());
PlanificationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PlanificationService);
exports.PlanificationService = PlanificationService;
//# sourceMappingURL=Planification.service.js.map