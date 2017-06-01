import { Annee } from './Annee';
import { Mois } from './Mois';

export interface Semaine{
    idSemaine:number;
    jourDebut:number;
    jourFin:number;
    nbrJour:number;
    nbrJourFerie:number;
    numeroSemaine:number;
    mois:Mois;
    annee:Annee;
}