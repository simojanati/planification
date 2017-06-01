package com.sqli.planification.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Embeddable
public class AffecterId implements Serializable
{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7975761472767281151L;

	@ManyToOne
	@JoinColumn(name = "id_collaborateur", referencedColumnName = "id_collaborateur")
	private Collaborateur collaborateur;

	@ManyToOne
	@JoinColumn(name = "id_projet", referencedColumnName = "id_projet")
	private Projet projet;

	@ManyToOne
	@JoinColumn(name = "id_semaine", referencedColumnName = "id_semaine")
	private Semaine semaine;

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

	public Semaine getSemaine()
	{
		return semaine;
	}

	public void setSemaine(Semaine semaine)
	{
		this.semaine = semaine;
	}

	public AffecterId(Collaborateur collaborateur, Projet projet, Semaine semaine)
	{
		super();
		this.collaborateur = collaborateur;
		this.projet = projet;
		this.semaine = semaine;
	}

	public AffecterId()
	{
		super();
		// TODO Auto-generated constructor stub
	}


}
