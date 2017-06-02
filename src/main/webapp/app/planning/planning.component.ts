import {Component, OnInit} from '@angular/core';
import {PlanningService} from './../model/Planning.service';
import {PlanningProjetlist} from './../model/PlanningProjetList';
import {PlanningCollaborateurList} from './../model/PlanningCollaborateurList';
import {Planning} from './../model/Planning';
import {PlanificationService} from './../model/Planification.service';
import {Planification} from './../model/Planification';
import {Affecter} from './../model/Affecter';
import {AffecterService} from './../model/Affecter.service';
import {CollaborateurProjet} from './../model/CollaborateurProjet';
import {CollaborateurProjetService} from './../model/CollaborateurProjet.service';
import {SemaineService} from './../model/Semaine.service';
import {Semaine} from './../model/Semaine';
import {MsgError} from './../model/MsgError';
import {DisplayMois} from './../model/DisplayMois';
import {PaginationMois} from './../model/PaginationMois';
import {CollaborateurSemaine} from './../model/CollaborateurSemaine'
import {CollaborateurSemaineService} from './../model/CollaborateurSemaine.service'
import {PlanningCollaborateur} from "../model/PlanningCollaborateur";

@Component({
    templateUrl: 'app/planning/planning.component.html'
})
export class PlanningComponent implements OnInit {

    reponse: MsgError;
    plannings: Planning[];
    planification: Array<Planification>;
    semaines: Array<Semaine>;
    idPlanning: number;
    planning: Planning;
    mois: Array<DisplayMois> = [];
    affecters: Array<Affecter>;
    affecterUpdate: Array<Affecter> = [];
    affecterF: Array<CollaborateurProjet>;
    isExist: boolean = false;
    msgError: string = '';
    pagination: PaginationMois;
    buttonActive: number = 0;
    collaborateurSemaine: Array<CollaborateurSemaine>;
    cmpt: number = 0;
    information: string = '';
    update: boolean = false;
    nomCollaborateur: string = '';
    dataDissmiss: string = '';
    plannigProjets: PlanningProjetlist[];
    planningCollaborateurs: PlanningCollaborateurList[];
    radio: string;
    filterQuery = "";

    constructor(private _planninfService: PlanningService, private _planificationService: PlanificationService,
                private _semaineService: SemaineService, private _affecterService: AffecterService,
                private _collaborateurProjetService: CollaborateurProjetService,
                private _collaborateurSemaineService: CollaborateurSemaineService) {
    }


    testUpdate() {
        var existZero: boolean = false;
        for (let affecter of this.affecterUpdate) {
            let id = 'u_' + affecter.collaborateur.idCollaborateur + '_' + affecter.projet.idProjet + '_' + affecter.semaine.idSemaine;
            var test2 = (<HTMLInputElement>document.getElementById(id)).value;
            if (test2 === '') {
                this.msgError = 'Nombre jour ne doit pas ete vide';
                this.dataDissmiss = '';
                setInterval(() => {
                    this.msgError = '';
                }, 5000);
                existZero = true;
            } else if (test2 === '0') {
                this.msgError = 'Nombre jour ne doit pas ete 0';
                this.dataDissmiss = '';
                setInterval(() => {
                    this.msgError = '';
                }, 5000);
                existZero = true;
            }
        }
        if (existZero === false) {
            for (let affecter of this.affecterUpdate) {
                let id = 'u_' + affecter.collaborateur.idCollaborateur + '_' + affecter.projet.idProjet + '_' + affecter.semaine.idSemaine;
                var test: number = +(<HTMLInputElement>document.getElementById(id)).value;
                this._affecterService.addAffectation(affecter.collaborateur.idCollaborateur, affecter.projet.idProjet, affecter.semaine.idSemaine, test).subscribe(
                    (data) => {
                        this.reponse = data;
                        this.ngOnInit();
                    },
                    (error) => {
                        console.log(error)
                    });

            }
            this.dataDissmiss = 'modal';
        }
    }

    ngOnInit() {
        this._planninfService.getPlanning().subscribe(data => this.plannings = data);
        this._affecterService.getAffectations().subscribe(data => this.affecters = data);
        this._collaborateurSemaineService.getCollaborateurSemaine().subscribe(data => this.collaborateurSemaine = data);
    }


    getUpdate(idCollaborateur: number, idSemaine: number, idProjet: number) {
        this.dataDissmiss = '';
        this.affecterUpdate = [];
        for (let affecter of this.affecters) {
            if (affecter.collaborateur.idCollaborateur == idCollaborateur && affecter.semaine.idSemaine == idSemaine) {
                console.log(affecter.projet.idProjet + ' - ' + affecter.collaborateur.idCollaborateur + ' - ' + affecter.semaine.idSemaine);
                this.affecterUpdate.push(affecter);
                this.nomCollaborateur = affecter.collaborateur.nom + ' ' + affecter.collaborateur.prenom;
            }
        }
    }

    afficherInformation(idCollaborateur: number, idSemaine: number, idProjet: number, nbrJour: number) {
        for (let collaborateurSemaine of this.collaborateurSemaine) {
            if (collaborateurSemaine.idCollaborateur == idCollaborateur && collaborateurSemaine.idSemaine == idSemaine && collaborateurSemaine.idProjet == idProjet) {
                this.cmpt = collaborateurSemaine.nbrJourTotal;
                this.information = collaborateurSemaine.information;

                document.getElementById('t_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).innerHTML = this.information;
                if (this.cmpt > nbrJour) {
                    document.getElementById('s_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.color = 'white';
                    document.getElementById('champ_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.backgroundColor = 'red';
                } else if (this.cmpt == nbrJour) {
                    document.getElementById('s_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.color = 'white';
                    document.getElementById('champ_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.backgroundColor = 'orange';
                } else if (this.cmpt < nbrJour) {
                    document.getElementById('s_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.color = 'white';
                    document.getElementById('champ_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.backgroundColor = 'green';
                }
            }
        }

    }

    existeAffectation(idCollaborateur: number, idProjet: number, idSemaine: number) {
        let affecterF: Affecter = null;
        for (let affecter of this.affecters) {
            if (affecter.collaborateur.idCollaborateur == idCollaborateur &&
                affecter.projet.idProjet == idProjet &&
                affecter.semaine.idSemaine == idSemaine) {
                affecterF = affecter;
            }
        }
        return affecterF;
    }

    afficherAffectation(idCollaborateur: number, idProjet: number, idSemaine: number) {
        let affecterF: Affecter = null;
        this.information = '';
        let numeroSemaine: number = 0;
        this.cmpt = 0;
        for (let affecter of this.affecters) {
            if (affecter.collaborateur.idCollaborateur == idCollaborateur &&
                affecter.projet.idProjet == idProjet &&
                affecter.semaine.idSemaine == idSemaine) {
                affecterF = affecter;
            }
            if (affecterF != null) {
                if (affecterF.collaborateur.idCollaborateur == idCollaborateur &&
                    affecterF.semaine.idSemaine == idSemaine
                ) {
                    this.afficherInformation(affecterF.collaborateur.idCollaborateur, affecterF.semaine.idSemaine, affecterF.projet.idProjet, affecterF.semaine.nbrJour);
                    /*setTimeout(() => {
                     this.changerCouleur(affecterF.collaborateur.idCollaborateur, affecterF.semaine.idSemaine, affecterF.projet.idProjet, affecterF.semaine.nbrJour);
                     }, 1000);*/
                }
            }
        }

        return affecterF;
    }

    afficherPage(page: number) {
        this.pagination.page = page;
        this.pagination.selectdPage = this.pagination.pages[this.pagination.page];

        let start = 0;
        this.pagination.pages.forEach((b, index) => start += index < this.pagination.page ? b.reduce((a1, b1) => a1 + b1.nbrSemaine, 0) : 0);
        this.pagination.semainePage = this.semaines.slice(start, start + this.pagination.selectdPage.reduce((a, b) => a + b.nbrSemaine, 0));
        if (this.pagination.pages.length == this.pagination.page + 1) {
            (<HTMLInputElement>document.getElementById("next")).disabled = true;
            (<HTMLInputElement>document.getElementById("previews")).disabled = false;
        } else if (this.pagination.page == 0) {
            (<HTMLInputElement>document.getElementById("next")).disabled = false;
            (<HTMLInputElement>document.getElementById("previews")).disabled = true;
        } else {
            (<HTMLInputElement>document.getElementById("next")).disabled = false;
            (<HTMLInputElement>document.getElementById("previews")).disabled = false;
        }
    }

    nextPage() {
        if (this.pagination.pages.length > this.pagination.page + 1) {
            this.pagination.page++;
            this.debutPro = this.debutPro + this.pagination.semainePage.length;
            this.debutColab = this.debutColab + this.pagination.semainePage.length;
            this.pagination.selectdPage = this.pagination.pages[this.pagination.page];
            let start = 0;
            this.pagination.pages.forEach((b, index) => start += index < this.pagination.page ? b.reduce((a1, b1) => a1 + b1.nbrSemaine, 0) : 0);
            this.pagination.semainePage = this.semaines.slice(start, start + this.pagination.selectdPage.reduce((a, b) => a + b.nbrSemaine, 0));


        }
        if (this.pagination.pages.length == this.pagination.page + 1) {

            (<HTMLInputElement>document.getElementById("next")).disabled = true;
            (<HTMLInputElement>document.getElementById("previews")).disabled = false;
        } else {
            (<HTMLInputElement>document.getElementById("next")).disabled = false;
            (<HTMLInputElement>document.getElementById("previews")).disabled = false;
        }
    }

    previews() {
        if (this.pagination.page > 0) {

            this.pagination.page--;
            this.pagination.selectdPage = this.pagination.pages[this.pagination.page];
            let start = 0;
            this.pagination.pages.forEach((b, index) => start += index < this.pagination.page ? b.reduce((a1, b1) => a1 + b1.nbrSemaine, 0) : 0);
            this.pagination.semainePage = this.semaines.slice(start, start + this.pagination.selectdPage.reduce((a, b) => a + b.nbrSemaine, 0));
            this.debutPro = this.debutPro - this.pagination.semainePage.length;
            this.debutColab = this.debutColab - this.pagination.semainePage.length;
        }
        if (this.pagination.page == 0) {

            (<HTMLInputElement>document.getElementById("next")).disabled = false;
            (<HTMLInputElement>document.getElementById("previews")).disabled = true;
        } else {
            (<HTMLInputElement>document.getElementById("next")).disabled = false;
            (<HTMLInputElement>document.getElementById("previews")).disabled = false;
        }
    }

    exportToCSV() {

    }

    addPlanification(idCollaborateur: number, idProjet: number, idSemaine: number, event: any) {
        let exist: boolean = false;
        if (event.target.value !== '') {

            for (let affecter of this.affecters) {
                if (affecter.collaborateur.idCollaborateur == idCollaborateur &&
                    affecter.projet.idProjet == idProjet &&
                    affecter.semaine.idSemaine == idSemaine) {
                    exist = true;
                }
            }
            console.log('target : ' + event.target.value + ' - existe : ' + exist);
            if (event.target.value !== '0' && exist === true) {
                this._affecterService.addAffectation(idCollaborateur, idProjet, idSemaine, event.target.value).subscribe(
                    (data) => {
                        this.reponse = data;
                        this.ngOnInit();
                        this.afficherAffectation(idCollaborateur, idProjet, idSemaine);
                        document.getElementById('i_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.display = 'none';
                        document.getElementById('i_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.color = this.reponse.msgError;
                        document.getElementById('s_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.display = '';

                    },
                    (error) => {
                        console.log(error)
                    });
            } else if (event.target.value !== '0' && exist === false) {
                this._affecterService.addAffectation(idCollaborateur, idProjet, idSemaine, event.target.value).subscribe(
                    (data) => {
                        this.reponse = data;
                        this.ngOnInit();
                        this.afficherAffectation(idCollaborateur, idProjet, idSemaine);
                        document.getElementById('i_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.display = 'none';
                        document.getElementById('i_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.color = this.reponse.msgError;
                        document.getElementById('s_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.display = '';

                    },
                    (error) => {
                        console.log(error)
                    });
            } else if (event.target.value === '0' && exist === false) {
                document.getElementById('i_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.display = 'none';
                document.getElementById('s_' + idCollaborateur + '_' + idProjet + '_' + idSemaine).style.display = '';

            }


        } else {
            alert('Champ  vide');
        }
    }

    debutPro: number = 0;
    debutColab: number = 0;

    chargementDonnees() {
        this._planninfService.getPlanningById(this.idPlanning).subscribe((data) => {
            this.planning = data;
        });
        this._collaborateurProjetService.getCollaborateurProjetByPlanning(this.idPlanning).subscribe(data => this.affecterF = data);
        this._planninfService.getPlanningProjets(this.idPlanning).subscribe((data) => {
            this.plannigProjets = data;
        });
        this._planninfService.getPlanningCollaborateurs(this.idPlanning).subscribe((data) => {
            this.planningCollaborateurs = data;
        });
        this._planificationService.getPlanificationByPlanning(this.idPlanning).subscribe(data => this.planification = data);
        this._semaineService.getMois(this.idPlanning).subscribe((data) => {

            this.mois = data;
            this.pagination = new PaginationMois();
            this.pagination.pages = [];
            this.pagination.size = 3;

            for (let i = 0; i < this.mois.length / this.pagination.size; i++) {
                let start = i * this.pagination.size;
                let tab = this.mois.slice(start, start + this.pagination.size);
                this.pagination.pages.push(tab);
            }
            this.pagination.page = 0;
            console.log(this.pagination.pages.length);
            this.buttonActive = this.pagination.pages.length;
            this.pagination.selectdPage = this.pagination.pages[this.pagination.page];
            this._semaineService.getSemaineByPlanning(this.idPlanning).subscribe((data2) => {
                this.semaines = data2;
                let start = 0;
                this.pagination.pages.forEach((b, index) => start += index < this.pagination.page ? b.reduce((a1, b1) => a1 + b1.nbrSemaine, 0) : 0);
                this.pagination.semainePage = this.semaines.slice(start, start + this.pagination.selectdPage.reduce((a, b) => a + b.nbrSemaine, 0));
                this.debutPro = 0;
                this.debutColab = 0;
                
            });
        });

    }


}
