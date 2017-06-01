package com.sqli.planification.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sqli.planification.dao.AffecterRepository;
import com.sqli.planification.model.Affecter;
import com.sqli.planification.model.AffecterId;
import com.sqli.planification.model.Collaborateur;
import com.sqli.planification.model.Projet;
import com.sqli.planification.model.Semaine;
import com.sqli.planification.service.IAffecterService;
import com.sqli.planification.service.ICollaborateurService;
import com.sqli.planification.service.IProjetService;
import com.sqli.planification.service.ISemaineService;
import com.sqli.planification.utils.MsgError;


@Service
@Transactional
public class AffecterService implements IAffecterService
{

	@Autowired
	private AffecterRepository affecterRepository;

	@Autowired
	private ICollaborateurService collaborateurService;

	@Autowired
	private IProjetService projetService;

	@Autowired
	private ISemaineService semaineService;

	@Override
	public MsgError addAffectation(Long idCollaborateur, Long idSemaine, Long idProjet, int nbrJour)
	{

		Collaborateur collaborateur = collaborateurService.getCollaborateur(idCollaborateur);
		Projet projet = projetService.getProjet(idProjet);
		Semaine semaine = semaineService.getSemainById(idSemaine);
		Affecter affecterSearch = affecterRepository.findOne(new AffecterId(collaborateur, projet, semaine));
		List<Affecter> affecters = affecterRepository.getAffectationByCollabAndSemaine(idCollaborateur, idSemaine);

		System.out.println(affecters);
		int nbrJourSemaine = 0;
		int nbrJourTravailSemaine = 0;
		if (affecters.isEmpty())
		{
			nbrJourSemaine = semaine.getNbrJour();
			System.out.println(nbrJourSemaine + " - " + nbrJourTravailSemaine + " - " + nbrJour);
		}
		else
		{
			for (Affecter affecter2 : affecters)
			{
				nbrJourSemaine = affecter2.getSemaine().getNbrJour();
				if (!affecter2.equals(affecterSearch))
					nbrJourTravailSemaine = nbrJourTravailSemaine + affecter2.getNbrJour();
				System.out.println(nbrJourSemaine + " - " + nbrJourTravailSemaine + " - " + nbrJour);
			}
		}
		Affecter affecter = new Affecter(new AffecterId(collaborateur, projet, semaine), nbrJour);
		if (nbrJourSemaine < (nbrJourTravailSemaine + nbrJour))
		{
			System.out.println("Rouge");
			affecterRepository.save(affecter);
			return new MsgError("red");

		}
		else if (nbrJourSemaine == (nbrJourTravailSemaine + nbrJour))
		{
			System.out.println("Orange");
			affecterRepository.save(affecter);
			return new MsgError("orange");
		}
		else
		{
			System.out.println("vert ");
			affecterRepository.save(affecter);
			return new MsgError("green");
		}

	}

	@Override
	public void deleteAffectation(Long idCollaborateur, Long idProjet)
	{
		List<Affecter> affecters = affecterRepository.getAffeterByCollabAndProjet(idCollaborateur, idProjet);
		if (affecters.size() > 0)
		{
			for (Affecter affecter : affecters)
			{
				affecterRepository.delete(affecter);
			}
		}
	}

	@Override
	public List<Affecter> getAllAffectation()
	{
		return affecterRepository.findAll();
	}

	@Override
	public List<Affecter> getAffectationByCollaborateurSemaine(Long idCollaborateur, Long idSemaine)
	{
		return affecterRepository.getAffectationByCollabAndSemaine(idCollaborateur, idSemaine);
	}

	@Override
	public List<Affecter> getAllAffectationByPlanning(Long idPlanning)
	{
		return affecterRepository.getAffeter(idPlanning);
	}

}
