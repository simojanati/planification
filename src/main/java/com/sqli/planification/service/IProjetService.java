package com.sqli.planification.service;

import java.util.List;

import com.sqli.planification.model.Projet;


public interface IProjetService
{
	public Projet addProjet(Projet projet);

	public Projet updateProjet(Projet projet);

	public void deleteProjet(Long idProjet);

	public Projet getProjet(Long idProjet);

	public List<Projet> getAllProjet();
	
	public List<Projet> getProjetNonAffecter(Long idCollaborateur);
	
	public List<Projet> getProjetByPlanning(Long idPlanning);
}
