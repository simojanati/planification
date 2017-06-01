import { Injectable } from '@angular/core';
import { Collaborateur } from './Collaborateur';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class CollaborateurService {


    private _collaborateurUrl = 'http://localhost:8080/collaborateur/getCollaborateurs';
    private _deleteUrl = 'http://localhost:8080/collaborateur/deleteCollaborateur';
    private _addUrl = 'http://localhost:8080/collaborateur/addCollaborateur';
    private _updateUrl = 'http://localhost:8080/collaborateur/updateCollaborateur';

    constructor(private _http: Http) { }

    getCollaborateurs(): Observable<Collaborateur[]> {
        return this._http.get(this._collaborateurUrl)
            .map((response: Response) => <Collaborateur[]>response.json())
            .catch(this.handleError);
    }

    addCollaborateur(nom: string, prenom: string, email: string, tel: string, dateRecrutement: string) {
        let body = 'nom=' + nom + '&&prenom=' + prenom + '&&email=' + email + '&&tel=' + tel + '&&dateRecrutement=' + dateRecrutement;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._addUrl, body, { headers: headers })
            .map(res => res.json());
    }

    updateCollaborateur(idCollaborateur: number, nom: string, prenom: string, email: string, tel: string, dateRecrutement: string) {
        let body = 'idCollaborateur=' + idCollaborateur + '&&nom=' + nom + '&&prenom=' + prenom + '&&email=' + email + '&&tel=' + tel + '&&dateRecrutement=' + dateRecrutement;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._updateUrl, body, { headers: headers })
            .map(res => res.json());
    }

    deleteCollaborateurs(idCollaborateur: number): Observable<string> {
        return this._http.get(this._deleteUrl + '?idCollaborateur=' + idCollaborateur)
            .map((response: Response) => <string>response.text())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error('ERROR : ', error);
        return Observable.throw(error.json().error || 'Server error');
    }
}