package com.chatapp.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ExceptionController extends ResponseEntityExceptionHandler {
    
    @ExceptionHandler(value = NoUsersException.class)
    public ResponseEntity<?> noUsersException(NoUsersException exception, WebRequest request) {
        ExceptionDetails details = new ExceptionDetails("Users not available", new Date(), HttpStatus.NOT_FOUND.toString(), request.getDescription(false));
        return new ResponseEntity<>(details, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = NoUserFoundException.class)
    public ResponseEntity<?> userNotFoundException(NoUserFoundException exception, WebRequest request) {
        ExceptionDetails details = new ExceptionDetails("User not found", new Date(), HttpStatus.NOT_FOUND.toString(), request.getDescription(false));
        return new ResponseEntity<>(details, HttpStatus.NOT_FOUND);
    }
}
