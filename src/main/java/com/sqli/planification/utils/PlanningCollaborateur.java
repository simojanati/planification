package com.sqli.planification.utils;

import com.sqli.planification.model.Semaine;


public class PlanningCollaborateur
{
	private Semaine semaine;
	private int nbrTotal;


	public Semaine getSemaine()
	{
		return semaine;
	}

	public void setSemaine(Semaine semaine)
	{
		this.semaine = semaine;
	}

	public int getNbrTotal()
	{
		return nbrTotal;
	}

	public void setNbrTotal(int nbrTotal)
	{
		this.nbrTotal = nbrTotal;
	}

	public PlanningCollaborateur(Semaine semaine, int nbrTotal)
	{
		super();
		this.semaine = semaine;
		this.nbrTotal = nbrTotal;
	}

	public PlanningCollaborateur()
	{
		super();
		// TODO Auto-generated constructor stub
	}

	
}
