package com.sqli.planification.utils;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sqli.planification.model.Affecter;
import com.sqli.planification.model.CollaborateurProjet;
import com.sqli.planification.model.Planning;
import com.sqli.planification.model.Projet;
import com.sqli.planification.model.Semaine;
import com.sqli.planification.service.IAffecterService;
import com.sqli.planification.service.ICollaborateurProjetService;
import com.sqli.planification.service.IPlanningService;
import com.sqli.planification.service.ISemaineService;

import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.format.Colour;
import jxl.format.Pattern;
import jxl.format.UnderlineStyle;
import jxl.write.Label;
import jxl.write.Number;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;


@Service
public class DataToCsv implements IDataToCsv
{
	@Autowired
	private ICollaborateurProjetService collaborateurProjetService;

	@Autowired
	private ISemaineService semaineService;

	@Autowired
	private IPlanningService planningService;

	@Autowired
	private IAffecterService affecterService;

	private List<Affecter> affecters = new ArrayList<>();

	private List<AffecterCollaborateurSemaine> collaborateurSemaines = new ArrayList<>();

	private List<AffecterCollaborateurSemaine> getAffectationBySemaineCollaborateur()
	{
		List<Affecter> affecters = affecterService.getAllAffectation();
		List<AffecterCollaborateurSemaine> affecterCollaborateurSemaines = new ArrayList<>();
		String information = "";
		int nbrJourTotal = 0;
		for (Affecter affecter : affecters)
		{
			List<Affecter> affecters2 = affecterService.getAffectationByCollaborateurSemaine(
					affecter.getCollaborateur().getIdCollaborateur(), affecter.getSemaine().getIdSemaine());
			for (Affecter affecter2 : affecters2)
			{
				if (affecters2.size() == 1 || affecters2.get(0).equals(affecter2))
				{
					information = affecter2.getInformation();
					nbrJourTotal = affecter2.getNbrJour();
				}
				else
				{
					information = information + "<br/>" + affecter2.getInformation();
					nbrJourTotal = nbrJourTotal + affecter2.getNbrJour();
				}
			}
			affecterCollaborateurSemaines.add(new AffecterCollaborateurSemaine(affecter.getCollaborateur().getIdCollaborateur(),
					affecter.getSemaine().getIdSemaine(), affecter.getProjet().getIdProjet(), information, nbrJourTotal));

		}
		return affecterCollaborateurSemaines;
	}


	private WritableCellFormat createFormatCellStatus() throws WriteException
	{
		Colour colour = Colour.WHITE;
		WritableFont wfontStatus = new WritableFont(WritableFont.createFont("Arial"), WritableFont.DEFAULT_POINT_SIZE,
				WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, colour);
		WritableCellFormat fCellstatus = new WritableCellFormat(wfontStatus);
		fCellstatus.setBackground(Colour.GRAY_80);
		fCellstatus.setWrap(true);
		fCellstatus.setAlignment(Alignment.CENTRE);
		fCellstatus.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
		fCellstatus.setBorder(Border.ALL, BorderLineStyle.MEDIUM, Colour.GRAY_25);

		return fCellstatus;
	}

	private WritableCellFormat createFormatCellStatusNormal(Colour colourBack, Colour colourText) throws WriteException
	{
		Colour colour = colourText;
		WritableFont wfontStatus = new WritableFont(WritableFont.createFont("Arial"), WritableFont.DEFAULT_POINT_SIZE,
				WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, colour);
		WritableCellFormat fCellstatus = new WritableCellFormat(wfontStatus);
		fCellstatus.setBackground(colourBack);
		fCellstatus.setWrap(true);
		fCellstatus.setAlignment(Alignment.CENTRE);
		fCellstatus.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
		fCellstatus.setBorder(Border.ALL, BorderLineStyle.MEDIUM, Colour.GRAY_25);

		return fCellstatus;
	}



	private int getNbrJour(Long idSemaine, Long idProjet, Long idCollaborateur)
	{
		int x = 0;
		for (Affecter affecter : affecters)
		{
			if (affecter.getCollaborateur().getIdCollaborateur() == idCollaborateur
					&& affecter.getSemaine().getIdSemaine() == idSemaine && affecter.getProjet().getIdProjet() == idProjet)
			{
				x = affecter.getNbrJour();
			}
		}
		return x;
	}

	private Colour getCoLour(Semaine semaine, Long idProjet, Long idCollaborateur)
	{
		Colour colour = Colour.WHITE;
		for (AffecterCollaborateurSemaine collaborateurSemaine : collaborateurSemaines)
		{
			if (collaborateurSemaine.getIdCollaborateur() == idCollaborateur && collaborateurSemaine.getIdProjet() == idProjet
					&& collaborateurSemaine.getIdSemaine() == semaine.getIdSemaine())
			{
				if (collaborateurSemaine.getNbrJourTotal() > semaine.getNbrJour())
				{
					colour = Colour.RED;
				}
				else if (collaborateurSemaine.getNbrJourTotal() < semaine.getNbrJour())
				{
					colour = Colour.GREEN;
				}
				else
				{
					colour = Colour.LIGHT_ORANGE;
				}

			}
		}
		return colour;
	}

	@Override
	public void convert2(String nom, Long idPlanning) throws RowsExceededException, WriteException
	{

		try
		{
			System.out.println("------------1----------");
			collaborateurSemaines = getAffectationBySemaineCollaborateur();
			List<CollaborateurProjet> collaborateurProjets = collaborateurProjetService.getCollaborateurProjetByPlanning(idPlanning);
			Planning planning = planningService.getPlanning(idPlanning);
			List<Semaine> semaines = planningService.getSemainesByPlanning(planning);
			List<DisplayMois> displayMois = semaineService.getMoisByPlanning(planning);
			this.affecters = affecterService.getAllAffectationByPlanning(idPlanning);
			System.out.println("------------2----------");

			File f = new File("D:\\" + nom + ".xls");
			WritableWorkbook myExcel = Workbook.createWorkbook(f);
			WritableSheet mySheet = myExcel.createSheet("mySheet", 0);
			int x = 4;
			int start = 2;
			for (DisplayMois displayMois2 : displayMois)
			{
				String moisAnnee = displayMois2.getMois() + "/" + displayMois2.getAnnee();
				mySheet.mergeCells(start, 0, (start + displayMois2.getNbrSemaine()) - 1, 0);
				mySheet.addCell(new Label(start, 0, moisAnnee, createFormatCellStatus()));
				start = (start + displayMois2.getNbrSemaine());
			}

			mySheet.mergeCells(0, 0, 1, 0);
			mySheet.addCell(new Label(0, 0, "SQLI", createFormatCellStatus()));
			mySheet.mergeCells(0, 1, 1, 1);
			mySheet.addCell(new Label(0, 1, "Numéro de la semaine", createFormatCellStatus()));
			mySheet.mergeCells(0, 2, 1, 2);
			mySheet.addCell(new Label(0, 2, "Nbr jours de travail", createFormatCellStatus()));

			mySheet.addCell(new Label(0, 3, "Collaborateur", createFormatCellStatus()));
			mySheet.addCell(new Label(1, 3, "Projet", createFormatCellStatus()));
			mySheet.setColumnView(0, 4);
			mySheet.setColumnView(1, 4);

			for (CollaborateurProjet collaborateurProjet : collaborateurProjets)
			{
				String nomPrenom = collaborateurProjet.getCollaborateur().getNom() + " "
						+ collaborateurProjet.getCollaborateur().getPrenom();
				String titreProjet = collaborateurProjet.getProjet().getTitreProjet();
				int np = nomPrenom.length();
				int tp = titreProjet.length();
				mySheet.addCell(new Label(0, x, nomPrenom));
				mySheet.addCell(new Label(1, x, titreProjet));
				mySheet.setColumnView(0, np);
				mySheet.setColumnView(1, tp);

				int y = 2;
				for (Semaine semaine : semaines)
				{

					double s = getNbrJour(semaine.getIdSemaine(), collaborateurProjet.getProjet().getIdProjet(),
							collaborateurProjet.getCollaborateur().getIdCollaborateur());
					if (s != 0)
					{
						mySheet.addCell(new Number(y, x, s,
								createFormatCellStatusNormal(getCoLour(semaine, collaborateurProjet.getProjet().getIdProjet(),
										collaborateurProjet.getCollaborateur().getIdCollaborateur()), Colour.WHITE)));
					}
					else
					{
						mySheet.addCell(new Number(y, x, s));
					}

					y++;
				}

				x++;
			}
			int y = 2;
			for (Semaine semaine : semaines)
			{
				double s = semaine.getNumeroSemaine();
				mySheet.addCell(new Number(y, 1, s, createFormatCellStatus()));
				y++;
			}
			y = 2;
			for (Semaine semaine : semaines)
			{

				double s = semaine.getNbrJour();
				mySheet.addCell(new Number(y, 2, s, createFormatCellStatus()));
				y++;
			}
			y = 2;
			for (Semaine semaine : semaines)
			{
				String s = semaine.getJourDebut() + " - " + semaine.getJourFin();
				mySheet.addCell(new Label(y, 3, s, createFormatCellStatus()));
				y++;
			}

			myExcel.write();
			myExcel.close();
			System.out.println("Finish .............");

		}
		catch (IOException e)
		{
			System.out.println(e.getMessage());
		}
	}

}
