import { DisplayMois } from './DisplayMois'
import { Semaine } from './Semaine';
import { PlanningProjets } from './PlanningProjets';

export class PaginationMois{
    pages:Array<Array<DisplayMois>>;
    selectdPage:Array<DisplayMois>;
    semainePage:Array<Semaine>;
    planningProjets:Array<PlanningProjets>;
    page:number;
    size:number;
    
}