package com.sqli.planification.utils;

import java.io.Serializable;
import java.util.List;

import com.sqli.planification.model.Projet;


public class AddCollaborateurProjet implements Serializable
{

	private Long idCollaborateur;
	private List<Projet> projets;

	public Long getIdCollaborateur()
	{
		return idCollaborateur;
	}

	public void setIdCollaborateur(Long idCollaborateur)
	{
		this.idCollaborateur = idCollaborateur;
	}

	public List<Projet> getProjets()
	{
		return projets;
	}

	public void setProjets(List<Projet> projets)
	{
		this.projets = projets;
	}

	public AddCollaborateurProjet(Long idCollaborateur, List<Projet> projets)
	{
		super();
		this.idCollaborateur = idCollaborateur;
		this.projets = projets;
	}

	public AddCollaborateurProjet()
	{
		super();
		// TODO Auto-generated constructor stub
	}

}
