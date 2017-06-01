package com.sqli.planification.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Embeddable
public class PlanificationId implements Serializable
{

	@ManyToOne
	@JoinColumn(name = "id_projet", referencedColumnName = "id_projet")
	private Projet projet;

	@ManyToOne
	@JoinColumn(name = "id_planning", referencedColumnName = "id_planning")
	private Planning planning;

	public Projet getProjet()
	{
		return projet;
	}

	public void setProjet(Projet projet)
	{
		this.projet = projet;
	}

	public Planning getPlanning()
	{
		return planning;
	}

	public void setPlanning(Planning planning)
	{
		this.planning = planning;
	}

	public PlanificationId(Projet projet, Planning planning)
	{
		super();
		this.projet = projet;
		this.planning = planning;
	}

	public PlanificationId()
	{
		super();
		// TODO Auto-generated constructor stub
	}



}
