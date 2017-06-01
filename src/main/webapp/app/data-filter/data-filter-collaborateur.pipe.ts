import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilterCollaborateur"
})
export class DataFilterCollaborateur implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.nom.indexOf(query) > -1);
        }
        return array;
    }
}