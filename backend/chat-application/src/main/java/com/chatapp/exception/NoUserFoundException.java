package com.chatapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NoUserFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    private String message;

    public NoUserFoundException() {
    }
    public NoUserFoundException(String message) {
        super(message);
        this.message = message;
    }
    
    
}
