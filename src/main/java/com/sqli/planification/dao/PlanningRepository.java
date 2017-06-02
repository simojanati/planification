package com.sqli.planification.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sqli.planification.model.Planning;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigInteger;
import java.util.List;

public interface PlanningRepository extends JpaRepository<Planning, Long> {

    @Query(nativeQuery = true, value = "select DISTINCT cp.id_collaborateur from collaborateur_projet cp,planification p where p.id_projet=cp.id_projet and p.id_planning=:x")
    public List<BigInteger> getIdCollaborateurByPlanning(@Param("x") Long idPlanning);

}
