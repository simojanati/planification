import { Component, OnInit } from '@angular/core';
import { Collaborateur } from './../model/Collaborateur';
import { CollaborateurService } from './../model/Collaborateur.service';

@Component({
    templateUrl: 'app/addCollaborateur/addCollaborateur.component.html'
})
export class AddCollaborateurComponent {

    collaborateur: Collaborateur;
    dateRecrutement: string;
    email: string;
    idCollaborateur: number;
    nom: string;
    prenom: string;
    tel: string;
    reponse: string = '';
    msgError: string = '';

    constructor(private _collaborateurService: CollaborateurService) { }

    addCollaborateur() {
        console.log('Nom : ' + this.nom + ' - Prénom : ' + this.prenom + ' - Email : ' + this.email + ' - Tel : ' + this.tel + ' - Date : ' + this.dateRecrutement);
        var re = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
        if (this.nom === undefined) {
            this.msgError = 'Le champe nom ne doit pas etre vide';
        } else if (this.prenom === undefined) {
            this.msgError = 'Le champe prenom ne doit pas etre vide';
        } else if (this.email === undefined) {
            this.msgError = 'Le champe email ne doit pas etre vide';
        } else if (!this.email.match(re)) {
            this.msgError = 'Format du champe email incorrect (XXX@XXX.XXX)';
        } else if (this.tel === undefined) {
            this.msgError = 'Le champe téléphone ne doit pas etre vide';
        } else if (this.dateRecrutement === undefined) {
            this.msgError = 'Le champe date de recrutement ne doit pas etre vide';
        } else {
            this._collaborateurService.addCollaborateur(this.nom, this.prenom, this.email, this.tel, this.dateRecrutement)
                .subscribe((result) => {
                    this.collaborateur = result;
                    this.nom = '';
                    this.prenom = '';
                    this.tel = '';
                    this.email = '';
                    this.dateRecrutement = '';
                    this.msgError = '';
                    this.reponse = 'Success';
                    setInterval(() => { this.reponse = ''; }, 3000);
                },
                error => this.msgError = <any>error
                );
        }
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