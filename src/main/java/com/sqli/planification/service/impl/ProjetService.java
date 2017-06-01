package com.sqli.planification.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sqli.planification.dao.ProjetRepository;
import com.sqli.planification.model.Projet;
import com.sqli.planification.service.IProjetService;


@Service
@Transactional
public class ProjetService implements IProjetService
{

	@Autowired
	private ProjetRepository projetRepository;

	@Override
	public Projet addProjet(Projet projet)
	{
		return projetRepository.save(projet);
	}

	@Override
	public Projet updateProjet(Projet projet)
	{
		Projet projet2 = getProjet(projet.getIdProjet());
		projet2.setTitreProjet(projet.getTitreProjet());
		projet2.setDescriptionProjet(projet.getDescriptionProjet());
		return projet2;
	}

	@Override
	public void deleteProjet(Long idProjet)
	{
		projetRepository.delete(idProjet);
	}

	@Override
	public Projet getProjet(Long idProjet)
	{
		return projetRepository.findOne(idProjet);
	}

	@Override
	public List<Projet> getAllProjet()
	{
		return projetRepository.findAll();
	}

	@Override
	public List<Projet> getProjetNonAffecter(Long idCollaborateur)
	{
		return projetRepository.getProjetsNonAffecter(idCollaborateur);
	}

	@Override
	public List<Projet> getProjetByPlanning(Long idPlanning)
	{
		return projetRepository.getProjetsByPlanning(idPlanning);
	}

}
