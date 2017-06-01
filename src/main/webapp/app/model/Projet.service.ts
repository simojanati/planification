import { Injectable } from '@angular/core';
import { Projet } from './Projet';
import { Http, Response, Headers } from '@angular/http';
import { URLRest } from './URLRest';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProjetService {


    private _projetsUrl = this.urlRest.getUrl() + 'projet/getProjets';
    private _addUrl = this.urlRest.getUrl() + 'projet/addProjet';
    private _updateUrl = this.urlRest.getUrl() + 'projet/updateProjet';
    private _projetUrl = this.urlRest.getUrl() + 'projet/getProjet';
    private _deleteUrl = this.urlRest.getUrl() + 'projet/deleteProjet';
    private _projetByPlanningUrl = this.urlRest.getUrl() + 'projet/getProjetByPlanning';

    constructor(private _http: Http, private urlRest: URLRest) { }

    getProjets(idCollaborateur: number): Observable<Projet[]> {
        return this._http.get(this._projetsUrl + '?idCollaborateur=' + idCollaborateur)
            .map((response: Response) => <Projet[]>response.json())
            .catch(this.handleError);
    }

    addProjet(titreProjet: string, descriptionProjet: string) {
        let body = 'titreProjet=' + titreProjet + '&&descriptionProjet=' + descriptionProjet;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._addUrl, body, { headers: headers })
            .map(res => res.json());
    }

    updateProjet(idProjet: number, titreProjet: string, descriptionProjet: string) {
        let body = 'idProjet=' + idProjet + '&&titreProjet=' + titreProjet + '&&descriptionProjet=' + descriptionProjet;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._updateUrl, body, { headers: headers })
            .map(res => res.json());
    }

    deleteProjet(idProjet: number): Observable<string> {
        return this._http.get(this._deleteUrl + '?idProjet=' + idProjet)
            .map((response: Response) => <string>response.text())
            .catch(this.handleError);
    }

    getProjetsByPlanning(idPlanning: number): Observable<Projet[]> {
        return this._http.get(this._projetByPlanningUrl + '?idPLanning=' + idPlanning)
            .map((response: Response) => <Projet[]>response.json())
            .catch(this.handleError);
    }

    getProjet(): Observable<Projet[]> {
        return this._http.get(this._projetUrl)
            .map((response: Response) => <Projet[]>response.json())
            .catch(this.handleError);
    }


    private handleError(error: Response) {
        console.error('ERROR : ', error);
        return Observable.throw(error.json().error || 'Server error');
    }
}