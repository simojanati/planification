package com.sqli.planification.utils;

import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

public interface IDataToExcel
{
	public String convertColabProjet(String nom, Long idPlanning) throws  WriteException;
	public String convertColab(String nom, Long idPlanning) throws  WriteException;
	public String convertProjet(String nom, Long idPlanning) throws  WriteException;
	
}
