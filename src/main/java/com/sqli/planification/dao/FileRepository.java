package com.sqli.planification.dao;

import com.sqli.planification.model.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface FileRepository extends JpaRepository<File, Long> {
    @Query(nativeQuery = true, value = "SELECT * FROM file f WHERE f.nom=:x")
    public File getFileByNom(@Param("x") String nom);
}
