package com.sqli.planification.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sqli.planification.model.Planning;

public interface PlanningRepository extends JpaRepository<Planning, Long>
{

}
