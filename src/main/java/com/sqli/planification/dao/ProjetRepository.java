package com.sqli.planification.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sqli.planification.model.Projet;


public interface ProjetRepository extends JpaRepository<Projet, Long>
{
	@Query(nativeQuery = true, value = "select * from projet WHERE id_projet not in (SELECT p.id_projet FROM projet p,collaborateur_projet cp WHERE p.id_projet = cp.id_projet and cp.id_collaborateur =:x)")
	public List<Projet> getProjetsNonAffecter(@Param("x") Long idCollaborateur);

	@Query(nativeQuery = true, value = "SELECT p.* FROM projet p,planification pl WHERE p.id_projet = pl.id_projet and pl.id_planning =:x")
	public List<Projet> getProjetsByPlanning(@Param("x") Long idPlanning);
	
}
