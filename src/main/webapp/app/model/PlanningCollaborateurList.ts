/**
 * Created by IJANATI on 02/06/2017.
 */
import {Collaborateur} from './Collaborateur';
import {PlanningCollaborateur} from './PlanningCollaborateur';

export interface PlanningCollaborateurList {
    collaborateur: Collaborateur;
    planningCollaborateurs: PlanningCollaborateur[];
    nbrTotal: number;
}