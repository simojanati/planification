package com.sqli.planification.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sqli.planification.dao.PlanningRepository;
import com.sqli.planification.model.Affecter;
import com.sqli.planification.model.Planification;
import com.sqli.planification.model.Planning;
import com.sqli.planification.model.Semaine;
import com.sqli.planification.service.IAffecterService;
import com.sqli.planification.service.IPlanningService;
import com.sqli.planification.service.ISemaineService;
import com.sqli.planification.utils.PlanningProjet;
import com.sqli.planification.utils.PlanningProjetsList;


@Service
@Transactional
public class PlanningService implements IPlanningService
{

	@Autowired
	private PlanningRepository planningRepository;

	@Autowired
	private PlanificationService planificationService;

	@Autowired
	private ISemaineService semaineService;

	@Autowired
	private IPlanningService planningService;

	@Autowired
	private IAffecterService affecterService;

	@Override
	public Planning addPlanning(Planning planning)
	{
		List<Semaine> semaines = getSemainesByPlanning(planning);
		return planningRepository.save(planning);
	}

	@Override
	public Planning updatePlanning(Planning planning)
	{
		try
		{
			Planning planning2 = getPlanning(planning.getIdPlanning());
			System.out.println("nom : " + planning.getNomPlanning() + " - mois debut : " + planning.getMoisDebut().getMois()
					+ " - annee debut : " + planning.getAnneeDebut().getAnnee() + " - mois fin : " + planning.getMoisFin().getMois()
					+ " - annee fin : " + planning.getAnneeFin().getAnnee());
			planning2.setNomPlanning(planning.getNomPlanning());
			planning2.setMoisDebut(planning.getMoisDebut());
			planning2.setMoisFin(planning.getMoisFin());
			planning2.setAnneeDebut(planning.getAnneeDebut());
			planning2.setAnneeFin(planning.getAnneeFin());
			List<Semaine> semaines = getSemainesByPlanning(planning2);
			return planning2;
		}
		catch (Exception e)
		{
			System.out.println(e.getMessage());
			return null;
		}

	}

	@Override
	public void deletePlanning(Long idPlanning)
	{
		Planning planning = getPlanning(idPlanning);
		planningRepository.delete(idPlanning);

	}

	@Override
	public Planning getPlanning(Long idPlanning)
	{
		return planningRepository.findOne(idPlanning);
	}

	@Override
	public List<Planning> getAllPlanning()
	{
		return planningRepository.findAll();
	}

	@Override
	public List<Semaine> getSemainesByPlanning(Planning planning)
	{
		return semaineService.getSemainesByMoisEtAnnee(planning.getMoisDebut().getMois(), planning.getAnneeDebut().getAnnee(),
				planning.getMoisFin().getMois(), planning.getAnneeFin().getAnnee());
	}

	@Override
	public List<PlanningProjetsList> getPlanningProjets(Long idplanning)
	{
		Planning planning = planningService.getPlanning(idplanning);
		List<Affecter> affecters = affecterService.getAllAffectation();
		List<Planification> planifications = planificationService.getPlanificationByPlanning(planning);
		List<PlanningProjet> planningProjets = new ArrayList<>();
		List<PlanningProjetsList> planningprojetsLists = new ArrayList<>();
		int cmpt = 0;
		for (Planification planification : planifications)
		{
			List<Semaine> semaines = semaineService.getSemainesByMoisEtAnnee(planification.getPlanning().getMoisDebut().getMois(),
					planification.getPlanning().getAnneeDebut().getAnnee(), planification.getPlanning().getMoisFin().getMois(),
					planification.getPlanning().getAnneeFin().getAnnee());
			for (Semaine semaine2 : semaines)
			{
				cmpt = 0;
				for (Affecter affecter : affecters)
				{
					//System.out.println(affecter.getProjet().getIdProjet()+" = "+planification.getProjet().getIdProjet()+" | "+affecter.getSemaine().getIdSemaine()+" = "+semaine2.getIdSemaine());
					if (affecter.getProjet().getIdProjet() == planification.getProjet().getIdProjet()
							&& affecter.getSemaine().getIdSemaine() == semaine2.getIdSemaine())
					{
						cmpt = cmpt + affecter.getNbrJour();
						//System.out.println(affecter.getProjet().getTitreProjet() + " --> " + cmpt);
					}

				}
				planningProjets.add(new PlanningProjet(semaine2, cmpt));
			}
			planningprojetsLists.add(new PlanningProjetsList(planification.getProjet(), planningProjets));
			planningProjets = new ArrayList<>();
		}
		return planningprojetsLists;
	}

}
