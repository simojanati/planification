package com.sqli.planification.service;

import java.util.List;

import com.sqli.planification.model.Annee;
import com.sqli.planification.model.Planning;
import com.sqli.planification.model.Semaine;
import com.sqli.planification.utils.DisplayMois;


public interface ISemaineService
{

	public void addSemainesByAnnee(List<Semaine> semaines, String annee);

	public List<DisplayMois> getMoisByPlanning(Planning planning);
	
	public Semaine getSemainById(Long idSemaine);
	
	public List<Semaine> getSemaine(String annee);

	public Annee getAnnee(String annee);

	public List<Semaine> getSemainesByMoisEtAnnee(String moisDebut, String anneeDebut, String moisFin, String anneeFin);

}
