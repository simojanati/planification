package com.sqli.planification.utils;

import java.io.Serializable;


public class AddAffectation implements Serializable
{

	private Long idCollaborateur;
	private Long idProjet;
	private Long idSemaine;
	private int nbrJour;

	public Long getIdCollaborateur()
	{
		return idCollaborateur;
	}

	public void setIdCollaborateur(Long idCollaborateur)
	{
		this.idCollaborateur = idCollaborateur;
	}

	public Long getIdProjet()
	{
		return idProjet;
	}

	public void setIdProjet(Long idProjet)
	{
		this.idProjet = idProjet;
	}

	public Long getIdSemaine()
	{
		return idSemaine;
	}

	public void setIdSemaine(Long idSemaine)
	{
		this.idSemaine = idSemaine;
	}

	public int getNbrJour()
	{
		return nbrJour;
	}

	public void setNbrJour(int nbrJour)
	{
		this.nbrJour = nbrJour;
	}

	public AddAffectation(Long idCollaborateur, Long idProjet, Long idSemaine, int nbrJour)
	{
		super();
		this.idCollaborateur = idCollaborateur;
		this.idProjet = idProjet;
		this.idSemaine = idSemaine;
		this.nbrJour = nbrJour;
	}

	public AddAffectation()
	{
		super();
		// TODO Auto-generated constructor stub
	}


}
