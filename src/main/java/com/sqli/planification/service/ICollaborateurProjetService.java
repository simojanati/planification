package com.sqli.planification.service;

import java.util.List;

import com.sqli.planification.model.CollaborateurProjet;
import com.sqli.planification.model.CollaborateurProjetId;
import com.sqli.planification.model.Projet;


public interface ICollaborateurProjetService
{

	public boolean addCollaborateurProjet(Long idCollaborateur, List<Projet> projets);

	public void deleteCollaborateurProjet(Long idCollaborateur,Long idProjet);

	public List<CollaborateurProjet> getCollaborateurProjet();

	public List<CollaborateurProjet> getCollaborateurProjetByPlanning(Long idPlanning);

}
