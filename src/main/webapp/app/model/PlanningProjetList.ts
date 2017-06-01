import { Projet } from './Projet';
import { PlanningProjets } from './PlanningProjets';

export interface PlanningProjetlist{
    projet:Projet;
    planningProjets:PlanningProjets[];
    nbrTotal:number;
}