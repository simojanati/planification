import { Injectable } from '@angular/core';
import { Affecter } from './Affecter';
import { MsgError } from './MsgError';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class AffecterService {


    private _AffectaerUrl = 'http://localhost:8080/affecter/getAffectations';

    constructor(private _http: Http) { }

    getAffectations(): Observable<Affecter[]> {
        return this._http.get(this._AffectaerUrl)
            .map((response: Response) => <Affecter[]>response.json())
            .catch(this.handleError);
    }

    reponse: MsgError;
    addAffectation(idCollaborateur: number, idProjet: number, idSemaine: number, nbrJour: number): Observable<MsgError> {
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');

        let result = this._http.post('http://localhost:8080/affecter/addAffectation', {
            idCollaborateur: idCollaborateur,
            idProjet: idProjet,
            idSemaine: idSemaine,
            nbrJour: nbrJour
        }, { headers: headers })
            .map((response: Response) => <MsgError>response.json());
        return result;
    }

    private handleError(error: Response) {
        console.error('ERROR : ', error);
        return Observable.throw(error.json().error || 'Server error');
    }
}