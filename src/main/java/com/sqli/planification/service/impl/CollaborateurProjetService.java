package com.sqli.planification.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sqli.planification.dao.CollaborateurProjetRepository;
import com.sqli.planification.model.Collaborateur;
import com.sqli.planification.model.CollaborateurProjet;
import com.sqli.planification.model.CollaborateurProjetId;
import com.sqli.planification.model.Projet;
import com.sqli.planification.service.ICollaborateurProjetService;


@Service
@Transactional
public class CollaborateurProjetService implements ICollaborateurProjetService
{

	@Autowired
	private CollaborateurProjetRepository collaborateurProjetRepository;

	@Autowired
	private CollaborateurService collaborateurService;

	@Autowired
	private ProjetService projetService;

	@Autowired
	private AffecterService affecterService;

	@Override
	public List<CollaborateurProjet> getCollaborateurProjet()
	{
		return collaborateurProjetRepository.findAll();
	}

	@Override
	public boolean addCollaborateurProjet(Long idCollaborateur, List<Projet> projets)
	{
		try
		{
			Collaborateur collaborateur = collaborateurService.getCollaborateur(idCollaborateur);
			for (Projet projet : projets)
			{
				collaborateurProjetRepository.save(new CollaborateurProjet(new CollaborateurProjetId(collaborateur, projet)));
			}
			return true;
		}
		catch (Exception e)
		{
			System.out.println(e.getMessage());
			return false;
		}

	}

	@Override
	public List<CollaborateurProjet> getCollaborateurProjetByPlanning(Long idPlanning)
	{
		return collaborateurProjetRepository.getCollaborateurProjetsByPlanning(idPlanning);
	}

	@Override
	public void deleteCollaborateurProjet(Long idCollaborateur, Long idProjet)
	{
		Collaborateur collaborateur = collaborateurService.getCollaborateur(idCollaborateur);
		Projet projet = projetService.getProjet(idProjet);
		collaborateurProjetRepository.delete(new CollaborateurProjetId(collaborateur, projet));
		affecterService.deleteAffectation(idCollaborateur, idProjet);

	}

}
