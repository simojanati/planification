package com.sqli.planification.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name = "planning")
public class Planning implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_planning")
	private Long idPlanning;

	@Column(name = "nom_planning")
	private String nomPlanning;

	@ManyToOne
	@JoinColumn(name = "mois_debut", referencedColumnName = "mois")
	private Mois moisDebut;

	@ManyToOne
	@JoinColumn(name = "annee_debut", referencedColumnName = "annee")
	private Annee anneeDebut;

	@ManyToOne
	@JoinColumn(name = "mois_fin", referencedColumnName = "mois")
	private Mois moisFin;

	@ManyToOne
	@JoinColumn(name = "annee_fin", referencedColumnName = "annee")
	private Annee anneeFin;

	@OneToMany(mappedBy = "planificationId.planning", orphanRemoval = true, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Planification> planifications;

	public Long getIdPlanning() {
		return idPlanning;
	}

	public void setIdPlanning(Long idPlanning) {
		this.idPlanning = idPlanning;
	}

	public List<Planification> getPlanifications() {
		return planifications;
	}

	public void setPlanifications(List<Planification> planifications) {
		this.planifications = planifications;
	}

	public String getNomPlanning() {
		return nomPlanning;
	}

	public void setNomPlanning(String nomPlanning) {
		this.nomPlanning = nomPlanning;
	}

	public Mois getMoisDebut() {
		return moisDebut;
	}

	public void setMoisDebut(Mois moisDebut) {
		this.moisDebut = moisDebut;
	}

	public Annee getAnneeDebut() {
		return anneeDebut;
	}

	public void setAnneeDebut(Annee anneeDebut) {
		this.anneeDebut = anneeDebut;
	}

	public Mois getMoisFin() {
		return moisFin;
	}

	public void setMoisFin(Mois moisFin) {
		this.moisFin = moisFin;
	}

	public Annee getAnneeFin() {
		return anneeFin;
	}

	public void setAnneeFin(Annee anneeFin) {
		this.anneeFin = anneeFin;
	}

	public Planning(String nomPlanning, Mois moisDebut, Annee anneeDebut, Mois moisFin, Annee anneeFin) {
		super();
		this.nomPlanning = nomPlanning;
		this.moisDebut = moisDebut;
		this.anneeDebut = anneeDebut;
		this.moisFin = moisFin;
		this.anneeFin = anneeFin;
	}

	public Planning(Long idPlanning, String nomPlanning, Mois moisDebut, Annee anneeDebut, Mois moisFin,
			Annee anneeFin) {
		super();
		this.idPlanning = idPlanning;
		this.nomPlanning = nomPlanning;
		this.moisDebut = moisDebut;
		this.anneeDebut = anneeDebut;
		this.moisFin = moisFin;
		this.anneeFin = anneeFin;
	}

	public Planning() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Planning other = (Planning) obj;
		if (anneeDebut == null) {
			if (other.anneeDebut != null)
				return false;
		} else if (!anneeDebut.equals(other.anneeDebut))
			return false;
		if (anneeFin == null) {
			if (other.anneeFin != null)
				return false;
		} else if (!anneeFin.equals(other.anneeFin))
			return false;
		if (idPlanning == null) {
			if (other.idPlanning != null)
				return false;
		} else if (!idPlanning.equals(other.idPlanning))
			return false;
		if (moisDebut == null) {
			if (other.moisDebut != null)
				return false;
		} else if (!moisDebut.equals(other.moisDebut))
			return false;
		if (moisFin == null) {
			if (other.moisFin != null)
				return false;
		} else if (!moisFin.equals(other.moisFin))
			return false;
		if (nomPlanning == null) {
			if (other.nomPlanning != null)
				return false;
		} else if (!nomPlanning.equals(other.nomPlanning))
			return false;
		return true;
	}

}
