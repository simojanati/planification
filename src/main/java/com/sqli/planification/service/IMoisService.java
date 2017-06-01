package com.sqli.planification.service;

import java.util.List;

import com.sqli.planification.model.Mois;


public interface IMoisService
{
	public void addMois(Mois mois);

	public void updateMois(Mois mois);

	public void deleteMois(String mois);

	public Mois getMois(String mois);

	public List<Mois> getAllMois();
}
