import { Injectable } from '@angular/core';
import { Collaborateur } from './Collaborateur';
import { Planification } from './Planification';
import { Projet } from './Projet';
import { Affecter } from './Affecter';
import { CollaborateurProjet } from './../model/CollaborateurProjet';
import { Http, Response, Headers } from '@angular/http';
import { URLRest } from './URLRest';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class PlanificationService {


    private _PlanificationUrl = this.urlRest.getUrl() + 'planification/getPlanification';
    private _PlanificationsUrl = this.urlRest.getUrl() + 'planification/getAllPlanification';

    constructor(private _http: Http, private urlRest: URLRest) { }

    getAllPlanification(): Observable<Planification[]> {
        return this._http.get(this._PlanificationsUrl)
            .map((response: Response) => <Planification[]>response.json())
            .catch(this.handleError);
    }

    getPlanificationByPlanning(idPlanning: number): Observable<Planification[]> {
        return this._http.get(this._PlanificationUrl + '?idPlanning=' + idPlanning)
            .map((response: Response) => <Planification[]>response.json())
            .catch(this.handleError);
    }

    addPlanification(idPlanning: number, affecters: Array<Projet>) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var result = this._http.post(this.urlRest.getUrl() + 'planification/addPlanification', {
            idPlanning: idPlanning,
            projets: affecters
        }, { headers: headers })
            .map(res => res.json());
        return result;
    }

    private handleError(error: Response) {
        console.error('ERROR : ', error);
        return Observable.throw(error.json().error || 'Server error');
    }
}