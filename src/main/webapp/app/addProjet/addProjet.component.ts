import { Component, OnInit } from '@angular/core';
import { Projet } from './../model/Projet';
import { ProjetService } from './../model/Projet.service';

@Component({
	templateUrl: 'app/addProjet/addProjet.component.html'
})
export class AddProjetComponent {

	titreProjet: string;
	descriptionProjet: string;
	projet: Projet;
	msgError: string = '';
	reponse: string = '';
	constructor(private _projetService: ProjetService) { }

	ajouterProjet() {
		if (this.titreProjet === undefined) {
			this.msgError = 'Le champe titre ne doit pas etre vide'
		} else if (this.descriptionProjet === undefined) {
			this.msgError = 'Le champe description ne doit pas etre vide'
		} else {
			this._projetService.addProjet(this.titreProjet, this.descriptionProjet)
				.subscribe((result) => {
					this.projet = result;
					this.titreProjet = '';
					this.descriptionProjet = '';
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