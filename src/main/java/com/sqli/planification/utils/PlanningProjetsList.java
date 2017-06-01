package com.sqli.planification.utils;

import java.util.List;

import com.sqli.planification.model.Projet;


public class PlanningProjetsList
{

	private Projet projet;
	private int nbrTotal;
	private List<PlanningProjet> planningProjets;

	public Projet getProjet()
	{
		return projet;
	}

	public void setProjet(Projet projet)
	{
		this.projet = projet;
	}

	public int getNbrTotal()
	{
		return nbrTotal;
	}

	public void setNbrTotal(int nbrTotal)
	{
		this.nbrTotal = nbrTotal;
	}

	public List<PlanningProjet> getPlanningProjets()
	{
		return planningProjets;
	}

	public void setPlanningProjets(List<PlanningProjet> planningProjets)
	{
		this.planningProjets = planningProjets;
	}

	public PlanningProjetsList(Projet projet, List<PlanningProjet> planningProjets)
	{
		super();
		this.projet = projet;
		this.planningProjets = planningProjets;
		this.nbrTotal = 0;
		for (PlanningProjet planningProjet : planningProjets)
		{
			this.nbrTotal = this.nbrTotal + planningProjet.getNbrTotal();
		}
	}

	public PlanningProjetsList()
	{
		super();
		// TODO Auto-generated constructor stub
	}


}
