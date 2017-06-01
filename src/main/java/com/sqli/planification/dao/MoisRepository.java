package com.sqli.planification.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sqli.planification.model.Mois;

public interface MoisRepository extends JpaRepository<Mois, String>
{

}
