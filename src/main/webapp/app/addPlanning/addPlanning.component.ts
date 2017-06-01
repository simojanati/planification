import { Component, OnInit } from '@angular/core';
import { DualListComponent } from 'angular-dual-listbox';
import { Collaborateur } from './../model/Collaborateur';
import { Affecter } from './../model/Affecter';
import { Mois } from './../model/Mois';
import { Projet } from './../model/Projet';
import { ProjetService } from './../model/Projet.service';
import { CollaborateurProjet } from './../model/CollaborateurProjet';
import { CollaborateurService } from './../model/Collaborateur.service';
import { MoisService } from './../model/Mois.service';
import { AffecterService } from './../model/Affecter.service';
import { PlanningService } from './../model/Planning.service';
import { PlanificationService } from './../model/Planification.service';
import { CollaborateurProjetService } from './../model/CollaborateurProjet.service';

@Component({
	templateUrl: 'app/addPlanning/addPlanning.component.html'
})
export class AddPlanningComponent implements OnInit {

	tab = 1;
	keepSorted = true;
	key: string;
	display: string;
	filter = true;
	source: Array<Projet>;
	confirmed: Array<Projet>;
	userAdd = '';
	stations: Array<Projet>;

	idPlanning: number;
	nomPlanning: string;
	moisDebut: number;
	moisFin: number;
	anneeDebut: number;
	anneeFin: number;

	msgError: string = '';
	reponse: string = '';
	mois: Array<Mois>;

	sourceLeft = true;
	format: any = DualListComponent.DEFAULT_FORMAT;

	private sourceStations: Array<Projet>;

	private confirmedStations: Array<Projet>;

	private toggle = true;

	constructor(private _affecterService: AffecterService, private _moisService: MoisService, private _planningService: PlanningService
		, private _planificationService: PlanificationService, private _projetService: ProjetService) {
	}

	ngOnInit() {

		this._projetService.getProjet()
			.subscribe((data) => {
				this.stations = data;
				this.doReset();
			});
		this._moisService.getMois()
			.subscribe(mois => this.mois = mois,
			error => this.msgError = <any>error);

	}

	private useStations() {
		console.log('station 2 : ', this.stations);
		this.toggle = true;
		this.key = 'idProjet';
		this.display = 'titreProjet';
		this.keepSorted = true;
		this.source = this.sourceStations;
		this.confirmed = this.confirmedStations;
	}

	doReset() {
		this.sourceStations = this.stations;
		this.confirmedStations = new Array<Projet>();
		this.useStations();
	}

	doDelete() {
		if (this.source.length > 0) {
			this.source.splice(0, 1);
		}
	}

	doCreate() {
		let o: any = {};
		o[this.key] = this.source.length + 1;
		o[this.display] = this.userAdd;
		this.source.push(o);
		this.userAdd = '';
	}

	doAdd() {
		for (let i = 0, len = this.source.length; i < len; i += 1) {
			let o = this.source[i];
			let found = this.confirmed.find((e: Projet) => e[this.key] === o[this.key]);
			if (!found) {
				this.confirmed.push(o);
				break;
			}
		}
	}

	doRemove() {
		if (this.confirmed.length > 0) {
			this.confirmed.splice(0, 1);
		}
	}

	doFilter() {
		this.filter = !this.filter;
	}

	swapDirection() {
		this.sourceLeft = !this.sourceLeft;
		this.format.direction = this.sourceLeft ? DualListComponent.LTR : DualListComponent.RTL;
	}

	ajouterPlanning() {
		console.log(this.confirmedStations);
		if (this.anneeDebut == null || this.anneeFin == null || this.moisDebut == null || this.moisFin == null) {
			this.msgError = 'tout les champs sans obligatoire';
		} else {
			if (this.anneeDebut > this.anneeFin) {
				this.msgError = 'année debut doit etre inferieur a année fin';
			} else {
				if (this.moisDebut > this.moisFin) {
					this.msgError = 'mois debut doit etre inferieur a mois fin';
				} else {
					this._planningService.addPlanning(this.nomPlanning,
						this.MoisByNumber(this.moisDebut),
						this.anneeDebut.toString(),
						this.MoisByNumber(this.moisFin),
						this.anneeFin.toString()).subscribe(
						(result) => {
							this.idPlanning = result.idPlanning;
							this.addAffectation(this.idPlanning);

							console.log('idPlanning', this.idPlanning);
						},
						error => this.msgError = <any>error);

				}
			}
		}
	}

	private addAffectation(idPlanning: number) {
		this._planificationService.addPlanification(idPlanning, this.confirmedStations).subscribe(
			(data) => { console.log(data); },
			error => this.msgError = <any>error);
		if (this.msgError == '') {
			this.reponse = 'Success';
			this.nomPlanning = '';
			this.moisDebut = null;
			this.moisFin = null;
			this.anneeDebut = null;
			this.anneeFin = null;
			this.doReset();
			setInterval(() => { this.reponse = ''; }, 3000);
			this.msgError = '';
		} else {
			this.reponse = '';
		}
	}

	private MoisByNumber(x: number): string {
		var mois: string = '' + x;
		switch (mois) {
			case '1': {
				return 'Janvier';
			}
			case '2': {
				return 'Février';
			}
			case '3': {
				return 'Mars';
			}
			case '4': {
				return 'Avril';
			}
			case '5': {
				return 'Mai';
			}
			case '6': {
				return 'Juin';
			}
			case '7': {
				return 'Juillet';
			}
			case '8': {
				return 'Août';
			}
			case '9': {
				return 'Septembre';
			}
			case '10': {
				return 'Octobre';
			}
			case '11': {
				return 'Novembre';
			}
			case '12': {
				return 'Décembre';
			}
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
