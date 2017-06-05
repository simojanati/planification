package com.sqli.planification.utils;

import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

public interface IDataToExcel
{
	public String convert2(String nom, Long idPlanning) throws RowsExceededException, WriteException;
	
}
