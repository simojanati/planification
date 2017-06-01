import { Collaborateur } from './Collaborateur';
import { Projet } from './Projet';
import { Semaine } from './Semaine';

export interface Affecter{
    projet:Projet;
    collaborateur:Collaborateur;
    semaine:Semaine;
    nbrJour:number;
    information:string;
}