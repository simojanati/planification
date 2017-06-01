package com.sqli.planification.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sqli.planification.model.Collaborateur;

public interface CollaborateurRepository extends JpaRepository<Collaborateur, Long>
{

}
