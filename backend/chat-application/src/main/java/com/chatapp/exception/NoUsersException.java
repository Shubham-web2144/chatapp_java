package com.chatapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NoUsersException extends RuntimeException {
    private static final Long serialVersionUID = 1L;
    private String message;

    public NoUsersException(String message) {
        super(message);
        this.message = message;
    }
}

