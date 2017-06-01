import { Component, OnInit } from '@angular/core';
import { Collaborateur } from './../model/Collaborateur';
import { CollaborateurService } from './../model/Collaborateur.service';
import { DataTableModule } from "angular2-datatable";

@Component({
    templateUrl: 'app/addCollaborateur/listeCollaborateur.component.html',
    styleUrls: ['app/addCollaborateur/listeCollaborateur.component.css']
})
export class ListeCollaborateurComponent {
    public data: Collaborateur[];
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "nom";
    public sortOrder = "asc";

    dateRecrutement: string;
    email: string;
    idCollaborateur: number;
    nom: string;
    prenom: string;
    tel: string;
    collaborateur: Collaborateur;
    reponse: string = '';
    msgError: string = '';
    dataDissmiss: string = '';
    message: string = '';

    constructor(private _collaborateurService: CollaborateurService) {
    }

    ngOnInit(): void {
        this._collaborateurService.getCollaborateurs()
            .subscribe((data) => {
                setTimeout(() => {
                    this.data = data;
                }, 1000);
            });
    }

    updateCollaborateur() {
        console.log('Nom : ' + this.nom + ' - Prénom : ' + this.prenom + ' - Email : ' + this.email + ' - Tel : ' + this.tel + ' - Date : ' + this.dateRecrutement);
        var re = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
        if (this.nom === '') {
            this.msgError = 'Le champe nom ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(() => { this.msgError = ''; }, 5000);
        } else if (this.prenom === '') {
            this.msgError = 'Le champe prenom ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(() => { this.msgError = ''; }, 5000);
        } else if (this.email === '') {
            this.msgError = 'Le champe email ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(() => { this.msgError = ''; }, 5000);
        } else if (!this.email.match(re)) {
            this.msgError = 'Format du champe email incorrect (XXX@XXX.XXX)';
            this.dataDissmiss = '';
            setInterval(() => { this.msgError = ''; }, 5000);
        } else if (this.tel === '') {
            this.msgError = 'Le champe téléphone ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(() => { this.msgError = ''; }, 5000);
        } else if (this.dateRecrutement === '') {
            this.msgError = 'Le champe date de recrutement ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(() => { this.msgError = ''; }, 5000);
        } else {
            this.dataDissmiss = 'modal';
            this._collaborateurService.updateCollaborateur(this.idCollaborateur, this.nom, this.prenom, this.email, this.tel, this.dateRecrutement)
                .subscribe((result) => {
                    this.collaborateur = result;
                    this.msgError = '';
                    this.ngOnInit();
                },
                error => this.msgError = <any>error
                );
        }
    }

    deleteCollaborateur(idCollaborateur: number) {
        this._collaborateurService.deleteCollaborateurs(idCollaborateur)
            .subscribe((data) => {
                this.message = data;
                this.ngOnInit();
                console.log(this.message);
            });
    }

    remplirDonnee(idCollaborateur: number, nom: string, prenom: string, email: string, tel: string, dateRecrutement: string) {
        this.idCollaborateur = idCollaborateur;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.tel = tel;
        this.dateRecrutement = dateRecrutement;
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