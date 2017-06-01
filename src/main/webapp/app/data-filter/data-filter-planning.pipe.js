"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var core_1 = require("@angular/core");
var DataFilterPlanningPipe = (function () {
    function DataFilterPlanningPipe() {
    }
    DataFilterPlanningPipe.prototype.transform = function (array, query) {
        if (query) {
            return _.filter(array, function (row) { return row.nomPlanning.indexOf(query) > -1; });
        }
        return array;
    };
    return DataFilterPlanningPipe;
}());
DataFilterPlanningPipe = __decorate([
    core_1.Pipe({
        name: "dataFilterPlanning"
    })
], DataFilterPlanningPipe);
exports.DataFilterPlanningPipe = DataFilterPlanningPipe;
//# sourceMappingURL=data-filter-planning.pipe.js.map