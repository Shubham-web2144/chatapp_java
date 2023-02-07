package com.chatapp.exception;

import java.util.Date;

public class ExceptionDetails {
    private String message;
    private Date date;
    private String status;
    private String webpath;
    public ExceptionDetails(String message, Date date, String status, String webpath) {
        this.message = message;
        this.date = date;
        this.status = status;
        this.webpath = webpath;
    }

    
}
