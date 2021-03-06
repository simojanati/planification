package com.sqli.planification;

import com.sqli.planification.dao.PlanningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.sqli.planification.dao.AffecterRepository;
import com.sqli.planification.dao.PlanificationRepository;
import com.sqli.planification.dao.SemaineRepository;
import com.sqli.planification.service.ICollaborateurProjetService;
import com.sqli.planification.service.ICollaborateurService;
import com.sqli.planification.service.IPlanificationService;
import com.sqli.planification.service.IPlanningService;
import com.sqli.planification.service.IProjetService;
import com.sqli.planification.service.ISemaineService;
import com.sqli.planification.service.impl.AffecterService;
import com.sqli.planification.utils.IDataToExcel;
import org.springframework.boot.web.support.SpringBootServletInitializer;


@SpringBootApplication
public class SqliProjetApplication implements CommandLineRunner {

    @Autowired
    private ISemaineService semaineService;

    @Autowired
    private IPlanningService planningService;

    @Autowired
    private IPlanificationService planificationService;

    @Autowired
    private PlanificationRepository planificationRepository;

    @Autowired
    private ICollaborateurService collaborateurService;

    @Autowired
    private SemaineRepository semaineRepository;

    @Autowired
    private AffecterRepository affecterRepository;

    @Autowired
    private AffecterService affecterService;

    @Autowired
    private IProjetService projetService;

    @Autowired
    private ICollaborateurProjetService collaborateurProjetService;

    @Autowired
    private IDataToExcel csv;

    @Autowired
    private PlanningRepository planningRepository;


    public static void main(String[] args) {
        SpringApplication.run(SqliProjetApplication.class, args);
    }

    @Override
    public void run(String... arg0) throws Exception {


       // csv.convert2("file2", 2L);


	/*	List<PlanningProjetsList> planningProjets = planningService.getPlanningProjets(1L);

		for (PlanningProjetsList planningProjet : planningProjets)
		{
			System.out.println(
					"Projet : " + planningProjet.getProjet().getTitreProjet() + " - nbrTotal : " + planningProjet.getNbrTotal());
			for (PlanningProjet p : planningProjet.getPlanningProjets())
			{
				System.out.println("Semaine : " + p.getSemaine().getIdSemaine() + " - nbrJour : " + p.getNbrTotal());
			}
		}



        List<PlanningCollaborateurList> planningCollaborateurLists = planningService.getPlanningCollaborateurs(1L);

        for (PlanningCollaborateurList x : planningCollaborateurLists) {
            System.out.println(x.getCollaborateur().getEmail() + " --> " + x.getNbrTotal());
            for (PlanningCollaborateur y : x.getPlanningCollaborateurs()) {
                System.out.println(y.getSemaine().getMois().getMois() + "/" + y.getSemaine().getAnnee().getAnnee() + " --> " + y.getNbrTotal());
            }
        }*/

		/*
         * List<Planning> plannings = planningService.getAllPlanning(); for (Planning planning : plannings) {
		 * System.out.println("-----> "+planning.getNomPlanning()); }
		 */
        /*
         * Planning planning = planningService.getPlanning(4L); List<Planification> planifications =
		 * planificationService.getPlanificationByPlanning(planning); List<Semaine> semaines =
		 * planningService.getSemainesByPlanning(planning); List<String> mois =
		 * semaineService.getMoisByPlanning(planning);
		 * 
		 * for (Planification planification : planifications) { System.out.println("collaborateur : " +
		 * planification.getCollaborateur().getEmail() + " - projet : " + planification.getProjet().getTitreProjet()); }
		 * 
		 * for (Semaine semaine : semaines) { if (semaine.getMois().getMois().equals("Avril") ||
		 * semaine.getMois().getMois().equals("Mai") || semaine.getMois().getMois().equals("Juin"))
		 * System.out.println(semaine.getJourDebut() + " - " + semaine.getJourFin() + " ==> Mois/Année : " +
		 * semaine.getMois().getMois() + ", " + semaine.getAnnee().getAnnee()); }
		 * 
		 * for (String string : mois) { System.out.println("mois :" + string); }
		 */
        //Affecter affecter = affecterRepository.addAffectation(1L, 77L, 1L, 2);

        // List<Semaine> semaines = semaineService.getSemaine("2017");

		/*
         * try { planningService.addPlanning( new Planning("test2", new Mois("Décembre"), new Annee("2017"), new
		 * Mois("Décembre"), new Annee("2018"))); System.out.println("---------------success-------------"); } catch
		 * (Exception e) { System.out.println(e.getMessage()); }
		 */
        /*
		 * List<Projet> projets = projetService.getProjetNonAffecter(2L); for (Projet projet : projets) {
		 * System.out.println("----------------------------------------"); System.out.println(projet.getTitreProjet());
		 * System.out.println("----------------------------------------"); }
		 */

		/*
		 * List<Affecter> affecters = affecterRepository.getAllAffectation(); for (Affecter affecter : affecters) {
		 * System.out.println(affecter.getInformation()); }
		 */
    }
}
