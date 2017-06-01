package com.sqli.planification.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Entity(name = "semaine")
public class Semaine implements Serializable
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_semaine")
	private Long idSemaine;

	@Column(name = "jour_debut")
	private int jourDebut;

	@Column(name = "jour_fin")
	private int jourFin;
	
	@Column(name = "nbr_jour")
	private int nbrJour;
	
	@Column(name = "jour_jour_ferie")
	private int nbrJourFerie;
	
	@Column(name = "numero_semaine")
	private int numeroSemaine;
	
	@ManyToOne
	@JoinColumn(name = "annee", referencedColumnName = "annee")
	private Annee annee;

	@ManyToOne
	@JoinColumn(name = "mois", referencedColumnName = "mois")
	private Mois mois;

	public Long getIdSemaine()
	{
		return idSemaine;
	}

	public void setIdSemaine(Long idSemaine)
	{
		this.idSemaine = idSemaine;
	}

	public int getNumeroSemaine() {
		return numeroSemaine;
	}

	public void setNumeroSemaine(int numeroSemaine) {
		this.numeroSemaine = numeroSemaine;
	}

	public int getJourDebut()
	{
		return jourDebut;
	}

	public void setJourDebut(int jourDebut)
	{
		this.jourDebut = jourDebut;
	}

	public int getJourFin()
	{
		return jourFin;
	}

	public void setJourFin(int jourFin)
	{
		this.jourFin = jourFin;
	}

	public int getNbrJour()
	{
		return nbrJour;
	}

	public void setNbrJour(int nbrJour)
	{
		this.nbrJour = nbrJour;
	}

	public int getNbrJourFerie()
	{
		return nbrJourFerie;
	}

	public void setNbrJourFerie(int nbrJourFerie)
	{
		this.nbrJourFerie = nbrJourFerie;
	}

	public Annee getAnnee()
	{
		return annee;
	}

	public void setAnnee(Annee annee)
	{
		this.annee = annee;
	}

	public Mois getMois()
	{
		return mois;
	}

	public void setMois(Mois mois)
	{
		this.mois = mois;
	}


	public Semaine(int jourDebut, int jourFin, int nbrJour, int nbrJourFerie, int numeroSemaine, Annee annee,
			Mois mois) {
		super();
		this.jourDebut = jourDebut;
		this.jourFin = jourFin;
		this.nbrJour = nbrJour;
		this.nbrJourFerie = nbrJourFerie;
		this.numeroSemaine = numeroSemaine;
		this.annee = annee;
		this.mois = mois;
	}

	public Semaine()
	{
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString()
	{
		return "Semaine [idSemaine=" + idSemaine + ", jourDebut=" + jourDebut + ", jourFin=" + jourFin + ", nbrJour=" + nbrJour
				+ ", nbrJourFerie=" + nbrJourFerie + ", annee=" + annee + ", mois=" + mois + "]";
	}

}
