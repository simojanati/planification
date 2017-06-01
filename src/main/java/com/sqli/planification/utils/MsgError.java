package com.sqli.planification.utils;

import java.io.Serializable;

public class MsgError implements Serializable {

	private String msgError;

	public String getMsgError() {
		return msgError;
	}

	public void setMsgError(String msgError) {
		this.msgError = msgError;
	}

	public MsgError(String msgError) {
		super();
		this.msgError = msgError;
	}

	public MsgError() {
		super();
		// TODO Auto-generated constructor stub
	}

}
