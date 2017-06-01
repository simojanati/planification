import { Injectable } from '@angular/core';
import { CollaborateurProjet } from './CollaborateurProjet';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Projet } from './Projet';
import { MsgError } from './MsgError';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class CollaborateurProjetService {


    private _affecterUrl = 'http://localhost:8080/collaborateurProjet/getCollaborateurProjet';
    private _addAffecterUrl = 'http://localhost:8080/collaborateurProjet/addCollaborateurProjet';
    private _affecterByPlanningUrl = 'http://localhost:8080/collaborateurProjet/getCollaborateurProjetByPlanning';
    private _deleteUrl = 'http://localhost:8080/collaborateurProjet/deleteCollaborateurProjet';

    constructor(private _http: Http) { }

    getCollaborateurProjet(): Observable<CollaborateurProjet[]> {
        return this._http.get(this._affecterUrl)
            .map((response: Response) => <CollaborateurProjet[]>response.json())
            .catch(this.handleError);
    }

    getCollaborateurProjetByPlanning(idPlanning: number): Observable<CollaborateurProjet[]> {
        return this._http.get(this._affecterByPlanningUrl + '?idPlanning=' + idPlanning)
            .map((response: Response) => <CollaborateurProjet[]>response.json())
            .catch(this.handleError);
    }

    deleteCollaborateurProjet(idCollaborateur: number, idProjet: number): Observable<string> {
        return this._http.get(this._deleteUrl + '?idCollaborateur=' + idCollaborateur + '&idProjet=' + idProjet)
            .map((response: Response) => <string>response.text())
            .catch(this.handleError);
    }

    addCollaborateurProjet(idCollaborateur: number, projets: Array<Projet>): Observable<MsgError> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var result = this._http.post(this._addAffecterUrl, {
            idCollaborateur: idCollaborateur,
            projets: projets
        }, { headers: headers })
            .map((response: Response) => <MsgError>response.json());
        return result;
    }

    private handleError(error: Response) {
        console.error('ERROR : ', error);
        return Observable.throw(error.json().error || 'Server error');
    }
}