package com.sqli.planification.utils;

import java.io.Serializable;
import java.util.List;

import com.sqli.planification.model.CollaborateurProjet;
import com.sqli.planification.model.Projet;


public class AddPlanification implements Serializable
{

	private Long idPlanning;
	private List<Projet> projets;

	public Long getIdPlanning()
	{
		return idPlanning;
	}

	public void setIdPlanning(Long idPlanning)
	{
		this.idPlanning = idPlanning;
	}

	public List<Projet> getProjets()
	{
		return projets;
	}

	public void setProjets(List<Projet> projets)
	{
		this.projets = projets;
	}

	public AddPlanification(Long idPlanning, List<Projet> projets)
	{
		super();
		this.idPlanning = idPlanning;
		this.projets = projets;
	}

	public AddPlanification()
	{
		super();
		// TODO Auto-generated constructor stub
	}


}
