package com.sqli.planification.utils;

import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

public interface IDataToCsv
{
	public void convert2(String nom, Long idPlanning) throws RowsExceededException, WriteException;
	
}
