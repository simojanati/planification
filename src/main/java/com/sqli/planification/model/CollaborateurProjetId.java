package com.sqli.planification.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class CollaborateurProjetId implements Serializable
{

	/**
	 * 
	 */
	private static final long serialVersionUID = -5143350938980713631L;

	@ManyToOne
	@JoinColumn(name = "id_collaborateur", referencedColumnName = "id_collaborateur")
	private Collaborateur collaborateur;

	@ManyToOne
	@JoinColumn(name = "id_projet", referencedColumnName = "id_projet")
	private Projet projet;


	public Collaborateur getCollaborateur()
	{
		return collaborateur;
	}

	public void setCollaborateur(Collaborateur collaborateur)
	{
		this.collaborateur = collaborateur;
	}

	public Projet getProjet()
	{
		return projet;
	}

	public void setProjet(Projet projet)
	{
		this.projet = projet;
	}

	public CollaborateurProjetId(Collaborateur collaborateur, Projet projet)
	{
		super();
		this.collaborateur = collaborateur;
		this.projet = projet;
	}

	public CollaborateurProjetId()
	{
		super();
		// TODO Auto-generated constructor stub
	}



}
