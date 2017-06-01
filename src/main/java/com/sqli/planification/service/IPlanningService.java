package com.sqli.planification.service;

import java.util.List;

import com.sqli.planification.model.Planning;
import com.sqli.planification.model.Semaine;
import com.sqli.planification.utils.PlanningProjetsList;


public interface IPlanningService
{
	public Planning addPlanning(Planning planning);

	public Planning updatePlanning(Planning planning);

	public void deletePlanning(Long idPlanning);

	public Planning getPlanning(Long idPlanning);

	public List<Planning> getAllPlanning();
	
	public List<Semaine> getSemainesByPlanning(Planning planning);
	
	public List<PlanningProjetsList> getPlanningProjets(Long idplanning); 
}
