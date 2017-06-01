import { Injectable } from '@angular/core';
import { Mois } from './Mois';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class MoisService{

    private _moisUrl = 'app/model/Mois.json';

    constructor(private _http:Http){}

    getMois(): Observable<Mois[]> {
        return this._http.get(this._moisUrl)
            .map((response: Response) => <Mois[]> response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error('ERROR : ',error);
        return Observable.throw(error.json().error || 'Server error');
    }

}