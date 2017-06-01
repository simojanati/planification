import { Injectable } from '@angular/core';
import { Collaborateur } from './Collaborateur';
import { Planning } from './Planning';
import { Projet } from './Projet';
import { PlanningProjetlist } from './PlanningProjetList';
import { Affecter } from './Affecter';
import { CollaborateurProjet } from './../model/CollaborateurProjet';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class PlanningService {


    private _PlanningUrl = 'http://localhost:8080/planning/getPlanning';
    private _PlanningByIdUrl = 'http://localhost:8080/planning/getPlanningById';
    private _deleteUrl = 'http://localhost:8080/planning/deletePlanning';
    private _addUrl = 'http://localhost:8080/planning/addPlanning';
    private _updateUrl = 'http://localhost:8080/planning/updatePlanning';
    private _PlanningProjetsUrl = 'http://localhost:8080/planning/getplanningProjets';

    constructor(private _http: Http) { }

    getPlanning(): Observable<Planning[]> {
        return this._http.get(this._PlanningUrl)
            .map((response: Response) => <Planning[]>response.json())
            .catch(this.handleError);
    }

    getPlanningById(idPlanning: number): Observable<Planning> {
        return this._http.get(this._PlanningByIdUrl + '?idPlanning=' + idPlanning)
            .map((response: Response) => <Planning[]>response.json())
            .catch(this.handleError);
    }

    getPlanningProjets(idPlanning: number): Observable<PlanningProjetlist[]> {
        return this._http.get(this._PlanningProjetsUrl + '?idPlanning=' + idPlanning)
            .map((response: Response) => <PlanningProjetlist[]>response.json())
            .catch(this.handleError);
    }

    deletePlanning(idPlanning: number): Observable<string> {
        return this._http.get(this._deleteUrl + '?idPlanning=' + idPlanning)
            .map((response: Response) => <string>response.text())
            .catch(this.handleError);
    }

    addPlanning(nomPlanning: string, moisDebut: string, anneeDebut: string, moisFin: string, anneeFin: string) {

        let body = 'nomPlanning=' + nomPlanning + '&&moisDebut=' + moisDebut + '&&anneeDebut=' + anneeDebut + '&&moisFin=' + moisFin + '&&anneeFin=' + anneeFin;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._addUrl, body, { headers: headers })
            .map(res => res.json());
    }

    updatePlanning(idPlanning: number, nomPlanning: string, moisDebut: string, anneeDebut: string, moisFin: string, anneeFin: string) {

        let body = 'idPlanning=' + idPlanning + '&&nomPlanning=' + nomPlanning + '&&moisDebut=' + moisDebut + '&&anneeDebut=' + anneeDebut + '&&moisFin=' + moisFin + '&&anneeFin=' + anneeFin;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._updateUrl, body, { headers: headers })
            .map(res => res.json());
    }


    private handleError(error: Response) {
        console.error('ERROR : ', error);
        return Observable.throw(error.json().error || 'Server error');
    }
}