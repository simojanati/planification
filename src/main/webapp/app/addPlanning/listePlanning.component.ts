import { Component, OnInit } from '@angular/core';
import { Planning } from './../model/Planning';
import { PlanningService } from './../model/Planning.service';
import { Planification } from './../model/Planification';
import { PlanificationService } from './../model/Planification.service';
import { MoisService } from './../model/Mois.service';
import { Mois } from './../model/Mois';
import { DataTableModule } from "angular2-datatable";

@Component({
    templateUrl: 'app/addPlanning/listePlanning.component.html',
    styleUrls: ['app/addPlanning/listePlanning.component.css']
})
export class ListePlanningComponent {
    public data: Planning[];
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "nomPlanning";
    public sortOrder = "asc";
    planifications: Planification[];
    planning: Planning[];
    message: string = '';
    mois: Mois[];
    msgError: string = '';
    dataDissmiss: string = '';
    idPlanning: number;
    nomPlanning: string;
    idMoisDebut: number;
    idMoisFin: number;
    moisDebut: string;
    moisFin: string;
    anneeDebut: string;
    anneeFin: string;
    reponse: string = '';


    constructor(private _planningService: PlanningService, private _planificationService: PlanificationService
        , private _moisService: MoisService) {
    }

    ngOnInit(): void {
        this._planificationService.getAllPlanification()
            .subscribe((data) => {
                this.planifications = data;
            });
        this._moisService.getMois()
            .subscribe(mois => this.mois = mois,
            error => this.msgError = <any>error);
        this._planningService.getPlanning()
            .subscribe((data) => {
                setTimeout(() => {
                    this.data = data;
                }, 1000);
            });
    }

    remplirDonnee(idPlanning: number, nomPlanning: string, moisDebut: string, moisFin: string, anneeDebut: string, anneeFin: string) {
        this.idPlanning = idPlanning;
        this.nomPlanning = nomPlanning;
        this.moisDebut = moisDebut;
        this.moisFin = moisFin;
        this.anneeDebut = anneeDebut;
        this.anneeFin = anneeFin;
    }

    updatePlanning() {
        if (this.nomPlanning === '') {
            this.msgError = 'Le champe nom ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(() => { this.msgError = ''; }, 5000);
        } else if (this.anneeDebut === null) {
            this.msgError = 'Le champe année debut ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(() => { this.msgError = ''; }, 5000);
        } else if (this.anneeFin === null) {
            this.msgError = 'Le champe année fin ne doit pas etre vide';
            this.dataDissmiss = '';
            setInterval(() => { this.msgError = ''; }, 5000);
        } else {
            this.dataDissmiss = 'modal';
            this._planningService.updatePlanning(this.idPlanning, this.nomPlanning, this.MoisByNumber(this.moisDebut), this.anneeDebut, this.MoisByNumber(this.moisFin), this.anneeFin)
                .subscribe((result) => {
                    this.planning = result;
                    this.msgError = '';
                    this.ngOnInit();
                },
                (error) => {
                    this.msgError = <any>error;
                    console.log(error);
                }

                );
        }
    }

    private MoisByNumber(x: string): string {
        var mois: string = x;
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
            default: {
                return mois;
            }

        }
    }

    getProjetByPlanning(idPlanning: number) {
        let projets = '';
        for (let planification of this.planifications) {
            if (planification.planning.idPlanning == idPlanning) {
                if (projets != '') {
                    projets = projets + ', ' + planification.projet.titreProjet;
                } else {
                    projets = planification.projet.titreProjet;
                }
            }
        }
        return projets;
    }

    deletePlanning(idPlanning: number) {

        this._planningService.deletePlanning(idPlanning)
            .subscribe((data) => {
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