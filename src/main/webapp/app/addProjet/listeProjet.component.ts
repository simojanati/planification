import { Component, OnInit } from '@angular/core';
import { Projet } from './../model/Projet';
import { ProjetService } from './../model/Projet.service';
import { DataTableModule } from "angular2-datatable";


@Component({
    templateUrl: 'app/addProjet/listeProjet.component.html',
    styleUrls: ['app/addProjet/listeProjet.component.css']
})
export class ListeProjetComponent {
    public data: any;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "titreProjet";
    public sortOrder = "asc";

    idProjet: number;
    titreProjet: string;
    descriptionProjet: string;
    projet: Projet;
    msgError: string = '';
    reponse: string = '';
    message: string = '';
    dataDissmiss: string = '';
    constructor(private _projetService: ProjetService) {
    }

    ngOnInit(): void {
        this._projetService.getProjet()
            .subscribe((data) => {
                setTimeout(() => {
                    this.data = data;
                }, 1000);
            });
    }

    updateProjet() {
        if (this.titreProjet === '') {
            this.msgError = 'Le champe titre ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(() => { this.msgError = ''; }, 5000);
        } else if (this.descriptionProjet === '') {
            this.msgError = 'Le champe description ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(() => { this.msgError = ''; }, 5000);
        } else {
            this.dataDissmiss = 'modal';
            this._projetService.updateProjet(this.idProjet, this.titreProjet, this.descriptionProjet)
                .subscribe((result) => {
                    this.projet = result;
                    this.msgError = '';
                    this.ngOnInit();
                },
                error => this.msgError = <any>error
                );
        }

    }
    deleteProjet(idProjet: number) {
        this._projetService.deleteProjet(idProjet)
            .subscribe((data) => {
                this.message = data;
                this.ngOnInit();
                console.log(this.message);

            });
    }

    remplirDonnee(idProjet: number, titreProjet: string, descriptionProjet: string) {
        this.idProjet = idProjet;
        this.titreProjet = titreProjet;
        this.descriptionProjet = descriptionProjet;
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