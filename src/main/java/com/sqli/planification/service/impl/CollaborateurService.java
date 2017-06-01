package com.sqli.planification.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sqli.planification.dao.CollaborateurRepository;
import com.sqli.planification.model.Collaborateur;
import com.sqli.planification.service.ICollaborateurService;

@Service
@Transactional
public class CollaborateurService implements ICollaborateurService {

	@Autowired
	private CollaborateurRepository collaborateurRepository;

	@Override
	public Collaborateur addCollaborateur(Collaborateur collaborateur) {
		return collaborateurRepository.save(collaborateur);
	}

	@Override
	public Collaborateur updateCollaborateur(Collaborateur collaborateur) {
		Collaborateur collaborateur2 = getCollaborateur(collaborateur.getIdCollaborateur());
		collaborateur2.setEmail(collaborateur.getEmail());
		collaborateur2.setNom(collaborateur.getNom());
		collaborateur2.setPrenom(collaborateur.getPrenom());
		collaborateur2.setTel(collaborateur.getTel());
		collaborateur2.setDateRecrutement(collaborateur.getDateRecrutement());
		return collaborateur2;
	}

	@Override
	public void deleteCollaborateur(Long idCollaborateur) {
		collaborateurRepository.delete(idCollaborateur);
	}

	@Override
	public Collaborateur getCollaborateur(Long idCollaborateur) {
		return collaborateurRepository.findOne(idCollaborateur);
	}

	@Override
	public List<Collaborateur> getAllCollaborateur() {
		return collaborateurRepository.findAll();
	}

}
