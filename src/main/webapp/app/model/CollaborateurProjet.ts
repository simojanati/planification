import { Collaborateur } from './Collaborateur'
import { Projet } from './Projet'

export interface CollaborateurProjet{
    collaborateur:Collaborateur;
    projet:Projet;
    libelle:string;
    idCollabProjet:number;
}