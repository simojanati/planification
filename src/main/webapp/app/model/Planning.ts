import { Mois } from './Mois'
import { Annee } from './Annee'

export interface Planning{
    idPlanning:number;
    nomPlanning:string;
    moisDebut:Mois;
    anneeDebut:Annee;
    moisFin:Mois;
    anneeFin:Annee;
}