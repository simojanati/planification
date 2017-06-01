package com.sqli.planification.utils;

public class DisplayMois
{
	private int nbrSemaine;
	private String mois;
	private String annee;

	public int getNbrSemaine()
	{
		return nbrSemaine;
	}

	public void setNbrSemaine(int nbrSemaine)
	{
		this.nbrSemaine = nbrSemaine;
	}

	public String getMois()
	{
		return mois;
	}

	public void setMois(String mois)
	{
		this.mois = mois;
	}

	public String getAnnee()
	{
		return annee;
	}

	public void setAnnee(String annee)
	{
		this.annee = annee;
	}

	public DisplayMois(int nbrSemaine, String mois, String annee)
	{
		super();
		this.nbrSemaine = nbrSemaine;
		this.mois = mois;
		this.annee = annee;
	}

	public DisplayMois()
	{
		super();
		// TODO Auto-generated constructor stub
	}



}
