import * as _ from "lodash";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "dataFilterPlanning"
})
export class DataFilterPlanningPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.nomPlanning.indexOf(query) > -1);
        }
        return array;
    }
}