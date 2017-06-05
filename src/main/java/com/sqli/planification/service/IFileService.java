package com.sqli.planification.service;

import com.sqli.planification.model.File;

import java.util.List;


public interface IFileService {

    public File addFile(String nom, String type, Long idPlanning);

    public File getFileByNom(String nom);

    public List<File> getFilesByIdPlanning(Long idPlanning);

}
