package com.sqli.planification.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;


@Entity(name = "mois")
public class Mois implements Serializable
{
	@Id
	@Column(name = "mois")
	private String mois;

	public String getMois()
	{
		return mois;
	}

	public void setMois(String mois)
	{
		this.mois = mois;
	}

	public Mois(String mois)
	{
		super();
		this.mois = mois;
	}

	public Mois()
	{
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public boolean equals(Object obj)
	{
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Mois other = (Mois) obj;
		if (mois == null)
		{
			if (other.mois != null)
				return false;
		}
		else if (!mois.equals(other.mois))
			return false;
		return true;
	}



}
