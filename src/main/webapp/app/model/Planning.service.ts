import {Injectable} from '@angular/core';
import {Planning} from './Planning';
import {PlanningProjetlist} from './PlanningProjetList';
import {PlanningCollaborateurList} from './PlanningCollaborateurList';
import {Http, Response, Headers} from '@angular/http';
import {URLRest} from './URLRest';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class PlanningService {


    private _PlanningUrl = this.urlRest.getUrl() + 'planning/getPlanning';
    private _PlanningByIdUrl = this.urlRest.getUrl() + 'planning/getPlanningById';
    private _deleteUrl = this.urlRest.getUrl() + 'planning/deletePlanning';
    private _addUrl = this.urlRest.getUrl() + 'planning/addPlanning';
    private _updateUrl = this.urlRest.getUrl() + 'planning/updatePlanning';
    private _PlanningProjetsUrl = this.urlRest.getUrl() + 'planning/getplanningProjets';
    private _PlanningCollaborateursUrl = this.urlRest.getUrl() + 'planning/getplanningCollaborateurs';

    constructor(private _http: Http, private urlRest: URLRest) {
    }

    getPlanning(): Observable<Planning[]> {
        console.log(this.urlRest.getUrl());
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

    getPlanningCollaborateurs(idPlanning: number): Observable<PlanningCollaborateurList[]> {
        return this._http.get(this._PlanningCollaborateursUrl + '?idPlanning=' + idPlanning)
            .map((response: Response) => <PlanningCollaborateurList[]>response.json())
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
        return this._http.post(this._addUrl, body, {headers: headers})
            .map(res => res.json());
    }

    updatePlanning(idPlanning: number, nomPlanning: string, moisDebut: string, anneeDebut: string, moisFin: string, anneeFin: string) {

        let body = 'idPlanning=' + idPlanning + '&&nomPlanning=' + nomPlanning + '&&moisDebut=' + moisDebut + '&&anneeDebut=' + anneeDebut + '&&moisFin=' + moisFin + '&&anneeFin=' + anneeFin;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._updateUrl, body, {headers: headers})
            .map(res => res.json());
    }


    private handleError(error: Response) {
        console.error('ERROR : ', error);
        return Observable.throw(error.json().error || 'Server error');
    }
}