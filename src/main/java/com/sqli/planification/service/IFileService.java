package com.sqli.planification.service;

import com.sqli.planification.model.File;


public interface IFileService {

    public File addFile(String nom, Long idPlanning);

    public File getFileByNom(String nom);

}
