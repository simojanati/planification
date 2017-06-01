package com.sqli.planification.utils;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.sqli.planification.model.Annee;
import com.sqli.planification.model.Mois;
import com.sqli.planification.model.Semaine;


public class Calendrier
{
	private List<Semaine> semaines = new ArrayList<>();
	private int maxWeeknumber = 0;

	public List<Semaine> getSemaines()
	{
		return semaines;
	}

	public void setSemaines(List<Semaine> semaines)
	{
		this.semaines = semaines;
	}

	public int getMaxWeeknumber()
	{
		return maxWeeknumber;
	}

	public void setMaxWeeknumber(int maxWeeknumber)
	{
		this.maxWeeknumber = maxWeeknumber;
	}

	public void getSemaines(int annee)
	{
		try
		{
			for (int i = 0; i < 12; i++)
			{
				Calendar calendar = Calendar.getInstance();
				calendar.set(annee, i, 1);
				nbWorkingDays(calendar, i + 1, annee);
			}
		}
		catch (Exception e)
		{
			System.out.println("error getSemaines: " + e.getMessage());
		}


	}

	private void nbWorkingDays(Calendar calendar, int mois, int annee)
	{
		int nbrJours = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
		int d = nbrJours;
		int jourDebut = 0;
		int jourFin = 0;

		maxWeeknumber = calendar.getActualMaximum(Calendar.WEEK_OF_MONTH);

		try
		{
			for (int i = 1; i <= d; i++)
			{

				calendar.set(Calendar.DAY_OF_MONTH, i);
				if (calendar.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY || calendar.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY)
				{
					nbrJours--;
				}
				else
				{
					if (calendar.get(Calendar.DAY_OF_WEEK) == Calendar.MONDAY)
					{
						jourDebut = calendar.get(Calendar.DAY_OF_MONTH);
					}
					else if (calendar.get(Calendar.DAY_OF_WEEK) == Calendar.TUESDAY && jourDebut == 0)
					{
						jourDebut = calendar.get(Calendar.DAY_OF_MONTH);
					}
					else if (calendar.get(Calendar.DAY_OF_WEEK) == Calendar.WEDNESDAY && jourDebut == 0)
					{
						jourDebut = calendar.get(Calendar.DAY_OF_MONTH);
					}
					else if (calendar.get(Calendar.DAY_OF_WEEK) == Calendar.THURSDAY && jourDebut == 0)
					{
						jourDebut = calendar.get(Calendar.DAY_OF_MONTH);
					}
					if (calendar.get(Calendar.DAY_OF_WEEK) == Calendar.FRIDAY)
					{
						jourFin = calendar.get(Calendar.DAY_OF_MONTH);
						int numeroSemaine = calendar.get(Calendar.WEEK_OF_YEAR);
						semaines.add(new Semaine(jourDebut, jourFin, (jourFin - jourDebut) + 1, 0, numeroSemaine, new Annee(String.valueOf(annee)),
								new Mois(getMonthByNumber(mois))));
					}
					else if (calendar.get(Calendar.DAY_OF_WEEK) != Calendar.FRIDAY && i == d)
					{
						jourFin = d;
						int numeroSemaine = calendar.get(Calendar.WEEK_OF_YEAR);
						semaines.add(new Semaine(jourDebut, jourFin, (jourFin - jourDebut) + 1, 0,numeroSemaine , new Annee(String.valueOf(annee)),
								new Mois(getMonthByNumber(mois))));
					}

				}
			}
		}
		catch (Exception e)
		{
			System.out.println("error nbWorkingDays: " + e.getMessage());
		}

	}

	public static void main(String[] args)
	{
		Calendrier calendrier = new Calendrier();
		calendrier.getSemaines(2017);
		for (Semaine semaine : calendrier.getSemaines())
		{
			if (semaine.getJourDebut() != 0)
				System.out.println("jours : (" + semaine.getJourDebut() + " - " + semaine.getJourFin() + ") -- >Mois/Année : "
						+ semaine.getMois().getMois() + " / " + semaine.getAnnee().getAnnee());
			else
				System.out.println("jours : (" + semaine.getJourFin() + ") -- >Mois/Année : " + semaine.getMois().getMois() + " / "
						+ semaine.getAnnee().getAnnee());
			System.out.println("-----------------");
		}
	}

	private static String getMonthByNumber(int num)
	{

		switch (num)
		{
			case 1:
				return "Janvier";
			case 2:
				return "Février";
			case 3:
				return "Mars";
			case 4:
				return "Avril";
			case 5:
				return "Mai";
			case 6:
				return "Juin";
			case 7:
				return "Juillet";
			case 8:
				return "Août";
			case 9:
				return "Septembre";
			case 10:
				return "Octobre";
			case 11:
				return "Novembre";
			case 12:
				return "Décembre";

			default:
				return "n'exist pas";
		}

	}
}
