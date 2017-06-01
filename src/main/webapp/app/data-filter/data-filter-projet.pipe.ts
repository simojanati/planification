import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilterProjet"
})
export class DataFilterProjet implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.titreProjet.indexOf(query) > -1);
        }
        return array;
    }
}