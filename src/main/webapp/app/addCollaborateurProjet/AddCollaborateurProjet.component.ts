import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DualListComponent } from 'angular-dual-listbox';
import { Collaborateur } from './../model/Collaborateur';
import { Projet } from './../model/Projet';
import { ProjetService } from './../model/Projet.service';
import { Affecter } from './../model/Affecter';
import { MsgError } from './../model/MsgError';
import { CollaborateurProjet } from './../model/CollaborateurProjet';
import { CollaborateurService } from './../model/Collaborateur.service';
import { AffecterService } from './../model/Affecter.service';
import { CollaborateurProjetService } from './../model/CollaborateurProjet.service';


@Component({
    templateUrl: 'app/addCollaborateurProjet/AddCollaborateurProjet.component.html'
})
export class AddCollaborateurProjetComponent implements OnInit {

    tab = 1;
    keepSorted = true;
    key: string;
    display: string;
    filter = true;
    source: Array<Projet>;
    confirmed: Array<Projet>;
    userAdd = '';
    stations: Array<Projet>;
    sourceLeft = true;
    format: any = DualListComponent.DEFAULT_FORMAT;
    private sourceStations: Array<Projet>;
    private confirmedStations: Array<Projet>;
    private toggle = true;
    idCollaborateur: number;
    existCollaborateur: boolean = false;
    collaborateurs: Array<Collaborateur>;
    reponses: MsgError;
    msgError: string = '';
    reponse: string = '';

    constructor(private _collaborateurProjetService: CollaborateurProjetService, private _projetService: ProjetService
        , private _collaborateurService: CollaborateurService) {
    }

    ngOnInit() {
        this._collaborateurService.getCollaborateurs().subscribe(data => this.collaborateurs = data);
    }

    addCollaborateurProjet() {
        console.log(this.confirmedStations);
        if (this.confirmedStations.length != 0) {
            this._collaborateurProjetService.addCollaborateurProjet(this.idCollaborateur, this.confirmedStations).subscribe(
                (data) => {
                    this.reponses = data;
                    console.log(data);

                    if (this.reponses.msgError != 'success') {
                        this.msgError = this.reponses.msgError;
                    } else {
                        this.reponse = this.reponses.msgError;
                        setInterval(() => { this.reponse = ''; }, 3000);
                        this.msgError = '';
                        this.idCollaborateur = null;
                        this.doReset();
                        this.existCollaborateur = false;
                    }

                },
                error => this.msgError = <any>error
            );
        } else {
            this.reponse = '';
            this.msgError = 'Sélectionner au moin un projet'
        }

    }

    afficherProjet(idCollaborateur: number) {
        this._projetService.getProjets(idCollaborateur).subscribe((data) => {
            this.stations = data;
            this.doReset();
            this.existCollaborateur = true;
        });
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