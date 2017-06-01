package com.sqli.planification.service;

import java.util.List;

import com.sqli.planification.model.Planification;
import com.sqli.planification.model.PlanificationId;
import com.sqli.planification.model.Planning;

public interface IPlanificationService {

	public Planification addPlanification(Planification planification);

	public void deletePlanification(PlanificationId planificationId);

	public List<Planification> getAllPlanification();

	public List<Planification> getPlanificationByPlanning(Planning planning);
}
