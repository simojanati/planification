"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var angular_dual_listbox_1 = require("angular-dual-listbox");
var ngx_tooltip_1 = require("ngx-tooltip");
var ngx_dropdown_1 = require("ngx-dropdown");
var angular2_datatable_1 = require("angular2-datatable");
var data_filter_collabProjet_pipe_1 = require("./data-filter/data-filter-collabProjet.pipe");
var data_filter_planning_pipe_1 = require("./data-filter/data-filter-planning.pipe");
var data_filter_collaborateur_pipe_1 = require("./data-filter/data-filter-collaborateur.pipe");
var data_filter_projet_pipe_1 = require("./data-filter/data-filter-projet.pipe");
var data_filter_projetPlanning_pipe_1 = require("./data-filter/data-filter-projetPlanning.pipe");
var ng2_contextmenu_1 = require("ng2-contextmenu");
var app_component_1 = require("./app.component");
var welcome_component_1 = require("./home/welcome.component");
var addPlanning_component_1 = require("./addPlanning/addPlanning.component");
var planning_component_1 = require("./planning/planning.component");
var AddCollaborateurProjet_component_1 = require("./addCollaborateurProjet/AddCollaborateurProjet.component");
var listePlanning_component_1 = require("./addPlanning/listePlanning.component");
var listeCollaborateurProjet_component_1 = require("./addCollaborateurProjet/listeCollaborateurProjet.component");
var addProjet_component_1 = require("./addProjet/addProjet.component");
var listeProjet_component_1 = require("./addProjet/listeProjet.component");
var addCollaborateur_component_1 = require("./addCollaborateur/addCollaborateur.component");
var listeCollaborateur_component_1 = require("./addCollaborateur/listeCollaborateur.component");
var error_404_component_1 = require("./error/error-404.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            angular_dual_listbox_1.AngularDualListBoxModule,
            ngx_tooltip_1.TooltipModule,
            ngx_dropdown_1.DropdownModule,
            angular2_datatable_1.DataTableModule,
            ng2_contextmenu_1.ContextmenuModule,
            router_1.RouterModule.forRoot([
                { path: 'addPlanning', component: addPlanning_component_1.AddPlanningComponent },
                { path: 'listePlannings', component: listePlanning_component_1.ListePlanningComponent },
                { path: 'planning', component: planning_component_1.PlanningComponent },
                { path: 'welcome', component: welcome_component_1.WelcomeComponent },
                { path: '404', component: error_404_component_1.Error404Component },
                { path: 'addAffectation', component: AddCollaborateurProjet_component_1.AddCollaborateurProjetComponent },
                { path: 'listeAffectations', component: listeCollaborateurProjet_component_1.ListeCollaborateurProjetComponent },
                { path: 'addProjet', component: addProjet_component_1.AddProjetComponent },
                { path: 'listeProjets', component: listeProjet_component_1.ListeProjetComponent },
                { path: 'addCollaborateur', component: addCollaborateur_component_1.AddCollaborateurComponent },
                { path: 'listeCollaborateurs', component: listeCollaborateur_component_1.ListeCollaborateurComponent },
                { path: '', redirectTo: 'welcome', pathMatch: 'full' },
                { path: '**', redirectTo: '404', pathMatch: 'full' }
            ], { useHash: true })
        ],
        declarations: [
            app_component_1.AppComponent,
            welcome_component_1.WelcomeComponent,
            addPlanning_component_1.AddPlanningComponent,
            planning_component_1.PlanningComponent,
            listePlanning_component_1.ListePlanningComponent,
            AddCollaborateurProjet_component_1.AddCollaborateurProjetComponent,
            listeCollaborateurProjet_component_1.ListeCollaborateurProjetComponent,
            addProjet_component_1.AddProjetComponent,
            listeProjet_component_1.ListeProjetComponent,
            addCollaborateur_component_1.AddCollaborateurComponent,
            listeCollaborateur_component_1.ListeCollaborateurComponent,
            data_filter_collabProjet_pipe_1.DataFilterCollabProjetPipe,
            data_filter_planning_pipe_1.DataFilterPlanningPipe,
            data_filter_collaborateur_pipe_1.DataFilterCollaborateur,
            data_filter_projet_pipe_1.DataFilterProjet,
            data_filter_projetPlanning_pipe_1.MyFilterPipe,
            error_404_component_1.Error404Component
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map