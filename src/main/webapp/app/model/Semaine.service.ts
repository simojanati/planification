import { Injectable } from '@angular/core';
import { Semaine } from './Semaine';
import { DisplayMois } from './DisplayMois';
import { Http,Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class SemaineService{


    private _semaineUrl = 'http://localhost:8080/semaine/getSemainesByPlanning';
    private _moisUrl = 'http://localhost:8080/semaine/getMois';
    
    constructor(private _http:Http){}

    getSemaineByPlanning(idPlanning:number): Observable<Semaine[]> {
        return this._http.get(this._semaineUrl+'?idPlanning='+idPlanning)
            .map((response: Response) => <Semaine[]> response.json())
            .catch(this.handleError);
    }

    getMois(idPlanning:number): Observable<DisplayMois[]> {
        return this._http.get(this._moisUrl+'?idPlanning='+idPlanning)
            .map((response: Response) => <DisplayMois[]> response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error('ERROR : ',error);
        return Observable.throw(error.json().error || 'Server error');
    }
}