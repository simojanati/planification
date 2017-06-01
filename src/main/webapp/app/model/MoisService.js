"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MoisService = (function () {
    function MoisService() {
    }
    MoisService.prototype.getMois = function () {
        return [{ mois: 'Janvier' },
            { mois: 'Février' },
            { mois: 'Mars' },
            { mois: 'Avril' },
            { mois: 'Mai' },
            { mois: 'Juin' },
            { mois: 'Juillet' },
            { mois: 'Août' },
            { mois: 'Septembre' },
            { mois: 'Octobre' },
            { mois: 'Novembre' },
            { mois: 'Décembre' }];
    };
    return MoisService;
}());
MoisService = __decorate([
    core_1.Injectable()
], MoisService);
exports.MoisService = MoisService;
//# sourceMappingURL=MoisService.js.map