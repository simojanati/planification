package com.sqli.planification.utils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sqli.planification.model.Affecter;
import com.sqli.planification.model.CollaborateurProjet;
import com.sqli.planification.model.Planning;
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
import jxl.format.UnderlineStyle;
import jxl.write.Label;
import jxl.write.Number;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;


@Service
public class DataToExcel implements IDataToExcel {
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

    private List<AffecterCollaborateurSemaine> getAffectationBySemaineCollaborateur() {
        List<Affecter> affecters = affecterService.getAllAffectation();
        List<AffecterCollaborateurSemaine> affecterCollaborateurSemaines = new ArrayList<>();
        String information = "";
        int nbrJourTotal = 0;
        for (Affecter affecter : affecters) {
            List<Affecter> affecters2 = affecterService.getAffectationByCollaborateurSemaine(
                    affecter.getCollaborateur().getIdCollaborateur(), affecter.getSemaine().getIdSemaine());
            for (Affecter affecter2 : affecters2) {
                if (affecters2.size() == 1 || affecters2.get(0).equals(affecter2)) {
                    information = affecter2.getInformation();
                    nbrJourTotal = affecter2.getNbrJour();
                } else {
                    information = information + "<br/>" + affecter2.getInformation();
                    nbrJourTotal = nbrJourTotal + affecter2.getNbrJour();
                }
            }
            affecterCollaborateurSemaines.add(new AffecterCollaborateurSemaine(affecter.getCollaborateur().getIdCollaborateur(),
                    affecter.getSemaine().getIdSemaine(), affecter.getProjet().getIdProjet(), information, nbrJourTotal));

        }
        return affecterCollaborateurSemaines;
    }


    private WritableCellFormat createFormatCellStatus() throws WriteException {
        Colour colour = Colour.WHITE;
        WritableFont wfontStatus = new WritableFont(WritableFont.createFont("Times New Roman"), WritableFont.DEFAULT_POINT_SIZE,
                WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, colour);
        wfontStatus.setPointSize(12);
        WritableCellFormat fCellstatus = new WritableCellFormat(wfontStatus);
        fCellstatus.setBackground(Colour.GRAY_80);

        fCellstatus.setWrap(true);
        fCellstatus.setAlignment(Alignment.CENTRE);
        fCellstatus.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
        fCellstatus.setBorder(Border.ALL, BorderLineStyle.MEDIUM, Colour.GRAY_25);

        return fCellstatus;
    }

    private WritableCellFormat createFormatCellStatusNormal(Colour colourBack, Colour colourText) throws WriteException {
        Colour colour = colourText;
        WritableFont wfontStatus = new WritableFont(WritableFont.createFont("Times New Roman"), WritableFont.DEFAULT_POINT_SIZE,
                WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, colour);
        wfontStatus.setPointSize(12);
        WritableCellFormat fCellstatus = new WritableCellFormat(wfontStatus);
        fCellstatus.setBackground(colourBack);
        fCellstatus.setWrap(true);
        fCellstatus.setAlignment(Alignment.CENTRE);
        fCellstatus.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
        fCellstatus.setBorder(Border.ALL, BorderLineStyle.MEDIUM, Colour.GRAY_25);

        return fCellstatus;
    }

    private WritableCellFormat createFormatCellTitreStatusNormal(Colour colourBack, Colour colourText) throws WriteException {
        Colour colour = colourText;
        WritableFont wfontStatus = new WritableFont(WritableFont.createFont("Times New Roman"), WritableFont.DEFAULT_POINT_SIZE,
                WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, colour);
        wfontStatus.setPointSize(14);
        WritableCellFormat fCellstatus = new WritableCellFormat(wfontStatus);
        fCellstatus.setBackground(colourBack);
        fCellstatus.setWrap(true);
        fCellstatus.setAlignment(Alignment.CENTRE);
        fCellstatus.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
        fCellstatus.setBorder(Border.ALL, BorderLineStyle.MEDIUM, Colour.GRAY_25);

        return fCellstatus;
    }


    private int getNbrJour(Long idSemaine, Long idProjet, Long idCollaborateur) {
        int x = 0;
        for (Affecter affecter : affecters) {
            if (affecter.getCollaborateur().getIdCollaborateur() == idCollaborateur
                    && affecter.getSemaine().getIdSemaine() == idSemaine && affecter.getProjet().getIdProjet() == idProjet) {
                x = affecter.getNbrJour();
            }
        }
        return x;
    }

    private Colour getCoLour(Semaine semaine, Long idProjet, Long idCollaborateur) {
        Colour colour = Colour.WHITE;
        for (AffecterCollaborateurSemaine collaborateurSemaine : collaborateurSemaines) {
            if (collaborateurSemaine.getIdCollaborateur() == idCollaborateur && collaborateurSemaine.getIdProjet() == idProjet
                    && collaborateurSemaine.getIdSemaine() == semaine.getIdSemaine()) {
                if (collaborateurSemaine.getNbrJourTotal() > semaine.getNbrJour()) {
                    colour = Colour.RED;
                } else if (collaborateurSemaine.getNbrJourTotal() < semaine.getNbrJour()) {
                    colour = Colour.GREEN;
                } else {
                    colour = Colour.LIGHT_ORANGE;
                }

            }
        }
        return colour;
    }

    @Override
    public String convertColabProjet(String nom, Long idPlanning) throws WriteException {

        try {
            System.out.println("------------1----------");
            collaborateurSemaines = getAffectationBySemaineCollaborateur();
            List<CollaborateurProjet> collaborateurProjets = collaborateurProjetService.getCollaborateurProjetByPlanning(idPlanning);
            Planning planning = planningService.getPlanning(idPlanning);
            List<Semaine> semaines = planningService.getSemainesByPlanning(planning);
            List<DisplayMois> displayMois = semaineService.getMoisByPlanning(planning);
            this.affecters = affecterService.getAllAffectationByPlanning(idPlanning);
            System.out.println("------------2----------");
            String path = new File(".").getCanonicalPath();
            System.out.println(path);
            String lien1 = path + "/src/main/webapp/app/excelColabProjet/".replace('/', '\\');
            String lien = (lien1 + nom + ".xls");
            System.out.println(lien1);
            System.out.println(lien);
            File f = new File(lien);
            System.out.println("------------ f 1 ----------");
            if (f.exists()) {
                f.delete();
                f = new File(lien);
                System.out.println("------------ f 2 ----------");
            }
            System.out.println(f.getAbsoluteFile().toString());
            WritableWorkbook myExcel = Workbook.createWorkbook(f);

            WritableSheet mySheet = myExcel.createSheet("mySheet", 0);
            int init = 5;
            int x = init - 1;
            int start = 2;
            for (DisplayMois displayMois2 : displayMois) {
                String moisAnnee = displayMois2.getMois() + "/" + displayMois2.getAnnee();
                mySheet.mergeCells(start, init + 0, (start + displayMois2.getNbrSemaine()) - 1, init + 0);
                mySheet.addCell(new Label(start, init + 0, moisAnnee, createFormatCellStatus()));
                start = (start + displayMois2.getNbrSemaine());
            }
            mySheet.mergeCells(2, 1, 14, 1);
            mySheet.addCell(new Label(2, 1, " Calendrier du nombre des jours travaillés par un collaborateur dans un projet ", createFormatCellTitreStatusNormal(Colour.WHITE, Colour.RED)));
            mySheet.mergeCells(5, 3, 6, 3);
            mySheet.addCell(new Label(5, 3, planning.getNomPlanning() + " : ", createFormatCellStatusNormal(Colour.WHITE, Colour.BLACK)));
            mySheet.mergeCells(7, 3, 11, 3);
            mySheet.addCell(new Label(7, 3, "De " + planning.getMoisDebut().getMois() + "/" + planning.getAnneeDebut().getAnnee() + " jusqu'à " + planning.getMoisFin().getMois() + "/" + planning.getAnneeFin().getAnnee(), createFormatCellStatusNormal(Colour.WHITE, Colour.BLACK)));

            mySheet.mergeCells(0, init + 0, 1, init + 0);
            mySheet.addCell(new Label(0, init + 0, "Mois/Année", createFormatCellStatus()));
            mySheet.mergeCells(0, init + 1, 1, init + 1);
            mySheet.addCell(new Label(0, init + 1, "Numéro de la semaine", createFormatCellStatus()));
            mySheet.mergeCells(0, init + 2, 1, init + 2);
            mySheet.addCell(new Label(0, init + 2, "Nbr jours de travail", createFormatCellStatus()));

            mySheet.addCell(new Label(0, init + 3, "Collaborateur", createFormatCellStatus()));
            mySheet.addCell(new Label(1, init + 3, "Projet", createFormatCellStatus()));
            mySheet.setColumnView(0, init + 3);
            mySheet.setColumnView(1, init + 3);

            for (CollaborateurProjet collaborateurProjet : collaborateurProjets) {
                String nomPrenom = collaborateurProjet.getCollaborateur().getNom() + " "
                        + collaborateurProjet.getCollaborateur().getPrenom();
                String titreProjet = collaborateurProjet.getProjet().getTitreProjet();
                int np = nomPrenom.length();
                int tp = titreProjet.length();
                mySheet.addCell(new Label(0, init + x, nomPrenom, createFormatCellStatusNormal(Colour.WHITE, Colour.BLACK)));
                mySheet.addCell(new Label(1, init + x, titreProjet, createFormatCellStatusNormal(Colour.WHITE, Colour.BLACK)));
                mySheet.setColumnView(0, init + np);
                mySheet.setColumnView(1, init + tp);

                int y = 2;
                for (Semaine semaine : semaines) {

                    double s = getNbrJour(semaine.getIdSemaine(), collaborateurProjet.getProjet().getIdProjet(),
                            collaborateurProjet.getCollaborateur().getIdCollaborateur());
                    if (s != 0) {
                        mySheet.addCell(new Number(y, init + x, s,
                                createFormatCellStatusNormal(getCoLour(semaine, collaborateurProjet.getProjet().getIdProjet(),
                                        collaborateurProjet.getCollaborateur().getIdCollaborateur()), Colour.WHITE)));
                    } else {
                        mySheet.addCell(new Number(y, init + x, s, createFormatCellStatusNormal(Colour.WHITE, Colour.BLACK)));
                    }

                    y++;
                }

                x++;
            }
            int y = 2;
            for (Semaine semaine : semaines) {
                double s = semaine.getNumeroSemaine();
                mySheet.addCell(new Number(y, init + 1, s, createFormatCellStatus()));
                y++;
            }
            y = 2;
            for (Semaine semaine : semaines) {

                double s = semaine.getNbrJour();
                mySheet.addCell(new Number(y, init + 2, s, createFormatCellStatus()));
                y++;
            }
            y = 2;
            for (Semaine semaine : semaines) {
                String s = semaine.getJourDebut() + " - " + semaine.getJourFin();
                mySheet.addCell(new Label(y, init + 3, s, createFormatCellStatus()));
                y++;
            }

            myExcel.write();
            myExcel.close();
            System.out.println("Finish .............");
            return f.getAbsoluteFile().toString();
        } catch (IOException e) {
            System.out.println(e.getMessage());
            return e.getMessage();
        }
    }

    @Override
    public String convertColab(String nom, Long idPlanning) throws WriteException {

        try {
            System.out.println("------------1----------");
            collaborateurSemaines = getAffectationBySemaineCollaborateur();
            List<PlanningCollaborateurList> planningCollaborateurLists = planningService.getPlanningCollaborateurs(idPlanning);
            Planning planning = planningService.getPlanning(idPlanning);
            List<Semaine> semaines = planningService.getSemainesByPlanning(planning);
            List<DisplayMois> displayMois = semaineService.getMoisByPlanning(planning);
            this.affecters = affecterService.getAllAffectationByPlanning(idPlanning);
            System.out.println("------------2----------");
            String path = new File(".").getCanonicalPath();
            System.out.println(path);
            String lien1 = path + "/src/main/webapp/app/excelColab/".replace('/', '\\');
            String lien = (lien1 + nom + ".xls");
            System.out.println(lien1);
            System.out.println(lien);
            File f = new File(lien);
            System.out.println("------------ f 1 ----------");
            if (f.exists()) {
                f.delete();
                f = new File(lien);
                System.out.println("------------ f 2 ----------");
            }
            System.out.println(f.getAbsoluteFile().toString());
            WritableWorkbook myExcel = Workbook.createWorkbook(f);

            WritableSheet mySheet = myExcel.createSheet("mySheet", 0);
            int init = 5;
            int x = init - 1;
            int start = 2;
            for (DisplayMois displayMois2 : displayMois) {
                String moisAnnee = displayMois2.getMois() + "/" + displayMois2.getAnnee();
                mySheet.mergeCells(start, init + 0, (start + displayMois2.getNbrSemaine()) - 1, init + 0);
                mySheet.addCell(new Label(start, init + 0, moisAnnee, createFormatCellStatus()));
                start = (start + displayMois2.getNbrSemaine());
            }
            mySheet.mergeCells(2, 1, 14, 1);
            mySheet.addCell(new Label(2, 1, " Calendrier du nombre des jours travaillés par un collaborateur", createFormatCellTitreStatusNormal(Colour.WHITE, Colour.RED)));
            mySheet.mergeCells(5, 3, 6, 3);
            mySheet.addCell(new Label(5, 3, planning.getNomPlanning() + " : ", createFormatCellStatusNormal(Colour.WHITE, Colour.BLACK)));
            mySheet.mergeCells(7, 3, 11, 3);
            mySheet.addCell(new Label(7, 3, "De " + planning.getMoisDebut().getMois() + "/" + planning.getAnneeDebut().getAnnee() + " jusqu'à " + planning.getMoisFin().getMois() + "/" + planning.getAnneeFin().getAnnee(), createFormatCellStatusNormal(Colour.WHITE, Colour.BLACK)));

            mySheet.mergeCells(0, init + 0, 1, init + 0);
            mySheet.addCell(new Label(0, init + 0, "Mois/Année", createFormatCellStatus()));
            mySheet.mergeCells(0, init + 1, 1, init + 1);
            mySheet.addCell(new Label(0, init + 1, "Numéro de la semaine", createFormatCellStatus()));
            mySheet.mergeCells(0, init + 2, 1, init + 2);
            mySheet.addCell(new Label(0, init + 2, "Nbr jours de travail", createFormatCellStatus()));

            mySheet.addCell(new Label(0, init + 3, "Collaborateur", createFormatCellStatus()));
            mySheet.addCell(new Label(1, init + 3, "Nbr Total", createFormatCellStatus()));
            mySheet.setColumnView(0, init + 3);
            mySheet.setColumnView(1, init + 3);

            for (PlanningCollaborateurList planningCollaborateurList : planningCollaborateurLists) {
                String nomPrenom = planningCollaborateurList.getCollaborateur().getNom() + " "
                        + planningCollaborateurList.getCollaborateur().getPrenom();
                String nbrTotal = planningCollaborateurList.getNbrTotal() + " Jours";
                int np = nomPrenom.length();
                int tp = nbrTotal.length();
                mySheet.addCell(new Label(0, init + x, nomPrenom, createFormatCellStatusNormal(Colour.WHITE, Colour.BLACK)));
                mySheet.addCell(new Label(1, init + x, nbrTotal, createFormatCellStatusNormal(Colour.WHITE, Colour.BLACK)));
                mySheet.setColumnView(0, init + np);
                mySheet.setColumnView(1, init + tp);

                int y = 2;
                for (PlanningCollaborateur planningCollaborateur : planningCollaborateurList.getPlanningCollaborateurs()) {
                    if (planningCollaborateur.getNbrTotal() != 0)
                        mySheet.addCell(new Number(y, init + x, planningCollaborateur.getNbrTotal(),
                                createFormatCellStatusNormal(Colour.GREEN, Colour.WHITE)));
                    else
                        mySheet.addCell(new Number(y, init + x, planningCollaborateur.getNbrTotal(),
                                createFormatCellStatusNormal(Colour.WHITE, Colour.BLACK)));
                    y++;
                }

                x++;
            }
            int y = 2;
            for (Semaine semaine : semaines) {
                double s = semaine.getNumeroSemaine();
                mySheet.addCell(new Number(y, init + 1, s, createFormatCellStatus()));
                y++;
            }
            y = 2;
            for (Semaine semaine : semaines) {

                double s = semaine.getNbrJour();
                mySheet.addCell(new Number(y, init + 2, s, createFormatCellStatus()));
                y++;
            }
            y = 2;
            for (Semaine semaine : semaines) {
                String s = semaine.getJourDebut() + " - " + semaine.getJourFin();
                mySheet.addCell(new Label(y, init + 3, s, createFormatCellStatus()));
                y++;
            }

            myExcel.write();
            myExcel.close();
            System.out.println("Finish .............");
            return f.getAbsoluteFile().toString();
        } catch (IOException e) {
            System.out.println(e.getMessage());
            return e.getMessage();
        }
    }


    @Override
    public String convertProjet(String nom, Long idPlanning) throws WriteException {

        try {
            System.out.println("------------1----------");
            collaborateurSemaines = getAffectationBySemaineCollaborateur();
            List<PlanningProjetsList> planningProjetsLists = planningService.getPlanningProjets(idPlanning);
            Planning planning = planningService.getPlanning(idPlanning);
            List<Semaine> semaines = planningService.getSemainesByPlanning(planning);
            List<DisplayMois> displayMois = semaineService.getMoisByPlanning(planning);
            this.affecters = affecterService.getAllAffectationByPlanning(idPlanning);
            System.out.println("------------2----------");
            String path = new File(".").getCanonicalPath();
            System.out.println(path);
            String lien1 = path + "/src/main/webapp/app/excelProjet/".replace('/', '\\');
            String lien = (lien1 + nom + ".xls");
            System.out.println(lien1);
            System.out.println(lien);
            File f = new File(lien);
            System.out.println("------------ f 1 ----------");
            if (f.exists()) {
                f.delete();
                f = new File(lien);
                System.out.println("------------ f 2 ----------");
            }
            System.out.println(f.getAbsoluteFile().toString());
            WritableWorkbook myExcel = Workbook.createWorkbook(f);

            WritableSheet mySheet = myExcel.createSheet("mySheet", 0);
            int init = 5;
            int x = init - 1;
            int start = 2;
            for (DisplayMois displayMois2 : displayMois) {
                String moisAnnee = displayMois2.getMois() + "/" + displayMois2.getAnnee();
                mySheet.mergeCells(start, init + 0, (start + displayMois2.getNbrSemaine()) - 1, init + 0);
                mySheet.addCell(new Label(start, init + 0, moisAnnee, createFormatCellStatus()));
                start = (start + displayMois2.getNbrSemaine());
            }
            mySheet.mergeCells(2, 1, 14, 1);
            mySheet.addCell(new Label(2, 1, " Calendrier du nombre des jours travaillés dans un projet ", createFormatCellTitreStatusNormal(Colour.WHITE, Colour.RED)));
            mySheet.mergeCells(5, 3, 6, 3);
            mySheet.addCell(new Label(5, 3, planning.getNomPlanning() + " : ", createFormatCellStatusNormal(Colour.WHITE, Colour.BLACK)));
            mySheet.mergeCells(7, 3, 11, 3);
            mySheet.addCell(new Label(7, 3, "De " + planning.getMoisDebut().getMois() + "/" + planning.getAnneeDebut().getAnnee() + " jusqu'à " + planning.getMoisFin().getMois() + "/" + planning.getAnneeFin().getAnnee(), createFormatCellStatusNormal(Colour.WHITE, Colour.BLACK)));

            mySheet.mergeCells(0, init + 0, 1, init + 0);
            mySheet.addCell(new Label(0, init + 0, "Mois/Année", createFormatCellStatus()));
            mySheet.mergeCells(0, init + 1, 1, init + 1);
            mySheet.addCell(new Label(0, init + 1, "Numéro de la semaine", createFormatCellStatus()));
            mySheet.mergeCells(0, init + 2, 1, init + 2);
            mySheet.addCell(new Label(0, init + 2, "Nbr jours de travail", createFormatCellStatus()));

            mySheet.addCell(new Label(0, init + 3, "Projet", createFormatCellStatus()));
            mySheet.addCell(new Label(1, init + 3, "Nbr Total", createFormatCellStatus()));
            mySheet.setColumnView(0, init + 3);
            mySheet.setColumnView(1, init + 3);

            for (PlanningProjetsList planningProjetsList : planningProjetsLists) {

                String titreProjet = planningProjetsList.getProjet().getTitreProjet();
                String nbrTotal = planningProjetsList.getNbrTotal() + " Jours";
                int np = titreProjet.length();
                int tp = nbrTotal.length();
                mySheet.addCell(new Label(0, init + x, titreProjet, createFormatCellStatusNormal(Colour.WHITE, Colour.BLACK)));
                mySheet.addCell(new Label(1, init + x, nbrTotal, createFormatCellStatusNormal(Colour.WHITE, Colour.BLACK)));
                mySheet.setColumnView(0, init + np);
                mySheet.setColumnView(1, init + tp);

                int y = 2;
                for (PlanningProjet planningProjet : planningProjetsList.getPlanningProjets()) {
                    if (planningProjet.getNbrTotal() != 0) {
                        mySheet.addCell(new Number(y, init + x, planningProjet.getNbrTotal(),
                                createFormatCellStatusNormal(Colour.GREEN, Colour.WHITE)));
                    } else {
                        mySheet.addCell(new Number(y, init + x, planningProjet.getNbrTotal(), createFormatCellStatusNormal(Colour.WHITE, Colour.BLACK)));
                    }
                    y++;
                }

                x++;
            }
            int y = 2;
            for (Semaine semaine : semaines) {
                double s = semaine.getNumeroSemaine();
                mySheet.addCell(new Number(y, init + 1, s, createFormatCellStatus()));
                y++;
            }
            y = 2;
            for (Semaine semaine : semaines) {

                double s = semaine.getNbrJour();
                mySheet.addCell(new Number(y, init + 2, s, createFormatCellStatus()));
                y++;
            }
            y = 2;
            for (Semaine semaine : semaines) {
                String s = semaine.getJourDebut() + " - " + semaine.getJourFin();
                mySheet.addCell(new Label(y, init + 3, s, createFormatCellStatus()));
                y++;
            }

            myExcel.write();
            myExcel.close();
            System.out.println("Finish .............");
            return f.getAbsoluteFile().toString();
        } catch (IOException e) {
            System.out.println(e.getMessage());
            return e.getMessage();
        }
    }

}
