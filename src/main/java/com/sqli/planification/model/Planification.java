package com.sqli.planification.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;


@Entity(name = "planification")
public class Planification implements Serializable
{
	@Id
	private PlanificationId planificationId;

	public PlanificationId getPlanificationId()
	{
		return planificationId;
	}

	public void setPlanificationId(PlanificationId planificationId)
	{
		this.planificationId = planificationId;
	}

	public Projet getProjet()
	{
		return this.getPlanificationId().getProjet();
	}

	public void setProjet(Projet projet)
	{
		this.getPlanificationId().setProjet(projet);
	}

	public Planning getPlanning()
	{
		return this.getPlanificationId().getPlanning();
	}
	
	public void setPlanning(Planning planning){
		this.getPlanificationId().setPlanning(planning);
	}

	public Planification(PlanificationId planificationId)
	{
		super();
		this.planificationId = planificationId;
	}

	public Planification()
	{
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
