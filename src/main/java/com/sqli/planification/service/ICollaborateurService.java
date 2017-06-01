package com.sqli.planification.service;

import java.util.List;

import com.sqli.planification.model.Collaborateur;


public interface ICollaborateurService
{
	public Collaborateur addCollaborateur(Collaborateur collaborateur);

	public Collaborateur updateCollaborateur(Collaborateur collaborateur);

	public void deleteCollaborateur(Long idCollaborateur);

	public Collaborateur getCollaborateur(Long idCollaborateur);

	public List<Collaborateur> getAllCollaborateur();
}
