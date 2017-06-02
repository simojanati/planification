package com.sqli.planification.utils;

import com.sqli.planification.model.Collaborateur;

import java.util.List;

public class PlanningCollaborateurList {

    private Collaborateur collaborateur;
    private int nbrTotal;
    private List<PlanningCollaborateur> planningCollaborateurs;

    public PlanningCollaborateurList(Collaborateur collaborateur, List<PlanningCollaborateur> planningCollaborateurs) {
        this.collaborateur = collaborateur;
        this.planningCollaborateurs = planningCollaborateurs;
        this.nbrTotal = 0;
        for (PlanningCollaborateur planningCollaborateur : planningCollaborateurs) {
            this.nbrTotal = this.nbrTotal + planningCollaborateur.getNbrTotal();
        }

    }

    public PlanningCollaborateurList() {
    }

    public Collaborateur getCollaborateur() {

        return collaborateur;
    }

    public void setCollaborateur(Collaborateur collaborateur) {
        this.collaborateur = collaborateur;
    }

    public int getNbrTotal() {
        return nbrTotal;
    }

    public void setNbrTotal(int nbrTotal) {
        this.nbrTotal = nbrTotal;
    }

    public List<PlanningCollaborateur> getPlanningCollaborateurs() {
        return planningCollaborateurs;
    }

    public void setPlanningCollaborateurs(List<PlanningCollaborateur> planningCollaborateurs) {
        this.planningCollaborateurs = planningCollaborateurs;
    }
}
