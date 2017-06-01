import { Injectable } from '@angular/core';
import { CollaborateurProjet } from './CollaborateurProjet';
import { Http, Response, Headers } from '@angular/http';
import { URLRest } from './URLRest';
import { Observable } from 'rxjs/Observable';
import { CollaborateurSemaine } from './CollaborateurSemaine';
import { MsgError } from './MsgError';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class CollaborateurSemaineService {

    
    private _infoUrl = this.urlRest.getUrl() + 'affecter/getAffectationCollaborateurSemaine';

    constructor(private _http: Http, private urlRest: URLRest) { }

    getCollaborateurSemaine(): Observable<CollaborateurSemaine[]> {
        return this._http.get(this._infoUrl)
            .map((response: Response) => <CollaborateurSemaine[]>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error('ERROR : ', error);
        return Observable.throw(error.json().error || 'Server error');
    }
}