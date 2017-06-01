import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilterCollabProjet"
})
export class DataFilterCollabProjetPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.collaborateur.nom.indexOf(query) > -1);
        }
        return array;
    }
}