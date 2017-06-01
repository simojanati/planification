"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FilterArrayPipe = (function () {
    function FilterArrayPipe() {
    }
    FilterArrayPipe.prototype.transform = function (value, args) {
        if (!args[0]) {
            return value;
        }
        else if (value) {
            return value.filter(function (item) {
                for (var key in item) {
                    if ((typeof item[key] === 'string' || item[key] instanceof String) && (item[key].indexof(args[0]) !== -1)) {
                        return true;
                    }
                }
            });
        }
    };
    return FilterArrayPipe;
}());
FilterArrayPipe = __decorate([
    core_1.Pipe({ name: 'filter' })
], FilterArrayPipe);
exports.FilterArrayPipe = FilterArrayPipe;
//# sourceMappingURL=filter.pipe.js.map