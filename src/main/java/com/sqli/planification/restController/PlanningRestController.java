package com.sqli.planification.restController;

import java.util.List;

import com.sqli.planification.utils.PlanningCollaborateurList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sqli.planification.model.Annee;
import com.sqli.planification.model.Mois;
import com.sqli.planification.model.Planning;
import com.sqli.planification.service.ICollaborateurService;
import com.sqli.planification.service.IPlanificationService;
import com.sqli.planification.service.IPlanningService;
import com.sqli.planification.service.IProjetService;
import com.sqli.planification.utils.PlanningProjetsList;


@RestController
@CrossOrigin("*")
@RequestMapping("/planning")
public class PlanningRestController {

    @Autowired
    private IPlanningService planningService;

    @Autowired
    private ICollaborateurService collaborateurService;

    @Autowired
    private IProjetService projetService;

    @Autowired
    private IPlanificationService planificationService;

    @GetMapping("/getPlanning")
    public List<Planning> getPlanning() {
        return planningService.getAllPlanning();
    }

    @GetMapping("/getplanningProjets")
    public List<PlanningProjetsList> getPlanningProjets(@RequestParam(value = "idPlanning", required = true) Long idPlanning) {
        return planningService.getPlanningProjets(idPlanning);
    }

    @GetMapping("/getplanningCollaborateurs")
    public List<PlanningCollaborateurList> getPlanningCollaborateurs(@RequestParam(value = "idPlanning", required = true) Long idPlanning) {
        return planningService.getPlanningCollaborateurs(idPlanning);
    }

    @GetMapping("/getPlanningById")
    public Planning getPlanningById(@RequestParam(value = "idPlanning", required = true) Long idPlanning) {
        return planningService.getPlanning(idPlanning);
    }

    @PostMapping(value = "/addPlanning")
    public Planning addPlanning(@RequestParam(value = "nomPlanning", required = true) String nomPlanning,
                                @RequestParam(value = "moisDebut", required = true) String moisDebut,
                                @RequestParam(value = "anneeDebut", required = true) String anneeDebut,
                                @RequestParam(value = "moisFin", required = true) String moisFin,
                                @RequestParam(value = "anneeFin", required = true) String anneeFin) {
        System.out.println("---------------- add planning ---------------");
        Planning planning = new Planning(nomPlanning, new Mois(moisDebut), new Annee(anneeDebut), new Mois(moisFin),
                new Annee(anneeFin));
        Planning planningFinal = planningService.addPlanning(planning);
        return planningFinal;
    }


    @PostMapping(value = "/updatePlanning")
    public Planning updatePlanning(@RequestParam(value = "idPlanning", required = true) Long idPlanning,
                                   @RequestParam(value = "nomPlanning", required = true) String nomPlanning,
                                   @RequestParam(value = "moisDebut", required = true) String moisDebut,
                                   @RequestParam(value = "anneeDebut", required = true) String anneeDebut,
                                   @RequestParam(value = "moisFin", required = true) String moisFin,
                                   @RequestParam(value = "anneeFin", required = true) String anneeFin) {
        System.out.println("---------------- update planning ---------------");
        Planning planning = new Planning(idPlanning, nomPlanning, new Mois(moisDebut), new Annee(anneeDebut), new Mois(moisFin),
                new Annee(anneeFin));
        Planning planningFinal = planningService.updatePlanning(planning);
        return planningFinal;
    }

    @GetMapping("/deletePlanning")
    public String deletePlanning(@RequestParam("idPlanning") Long idPlanning) {
        try {
            planningService.deletePlanning(idPlanning);
            return "success";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return e.getMessage();
        }
    }
}
