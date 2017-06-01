import { Component, OnInit } from '@angular/core';
import { CollaborateurProjet } from './../model/CollaborateurProjet';
import { CollaborateurProjetService } from './../model/CollaborateurProjet.service';
import { DataTableModule } from "angular2-datatable";

@Component({
    templateUrl: 'app/addCollaborateurProjet/listeCollaborateurProjet.component.html',
    styleUrls: ['app/addCollaborateurProjet/listeCollaborateurProjet.component.css']
})
export class ListeCollaborateurProjetComponent {

    confirmResult: boolean = null;
    promptMessage: string = '';
    message: string = '';
    public data: CollaborateurProjet[];
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "collaborateur.nom";
    public sortOrder = "asc";

    constructor(private _collaborateurProjetService: CollaborateurProjetService) {
    }

    ngOnInit(): void {
        this._collaborateurProjetService.getCollaborateurProjet().subscribe((data) => {
            setTimeout(() => {
                this.data = data
            }, 1000);
        });
    }

    deleteConfirm(idCollaborateur: number, idProjet: number) {
        this._collaborateurProjetService.deleteCollaborateurProjet(idCollaborateur, idProjet).subscribe((data) => {
            this.message = data;
            this.ngOnInit();
            console.log(this.message);
        });
    }

    active(element: string) {
        document.getElementById('home').className = '';
        document.getElementById('planning').className = '';
        document.getElementById('addPlanning').className = '';
        document.getElementById('gererPlanning').className = '';
        document.getElementById('addAffectation').className = '';
        document.getElementById('gererAffectation').className = '';
        document.getElementById('addProjet').className = '';
        document.getElementById('gererProjet').className = '';
        document.getElementById('addCollab').className = '';
        document.getElementById('gererCollab').className = '';
        document.getElementById(element).className = 'active';
    }

}