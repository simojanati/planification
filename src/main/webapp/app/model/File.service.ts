/**
 * Created by IJANATI on 05/06/2017.
 */
import {Injectable} from '@angular/core';
import {File} from './File';
import {Http, Response} from '@angular/http';
import {URLRest} from './URLRest';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class FileService {


    private _fileUrl = this.urlRest.getUrl() + 'file/getFilesByIdPlanning';

    private _addFile = this.urlRest.getUrl() + 'file/getFile';

    constructor(private _http: Http, private urlRest: URLRest) {
    }

    getFileByIdPlanning(idPlanning: number): Observable<File[]> {
        return this._http.get(this._fileUrl + "?idPlanning=" + idPlanning)
            .map((response: Response) => <File[]>response.json())
            .catch(this.handleError);
    }

    addFile(idPlanning: number, type: string): Observable<File> {
        return this._http.get(this._addFile + "?idPlanning=" + idPlanning + "&type=" + type)
            .map((response: Response) => <File>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error('ERROR : ', error);
        return Observable.throw(error.json().error || 'Server error');
    }
}