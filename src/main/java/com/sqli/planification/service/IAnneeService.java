package com.sqli.planification.service;

import java.util.List;

import com.sqli.planification.model.Annee;


public interface IAnneeService
{
	public void addAnnee(Annee annee);

	public void updateAnnee(Annee annee);

	public void deleteAnnee(String annee);

	public Annee getAnnee(String annee);

	public List<Annee> getAllAnnee();
}
