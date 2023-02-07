package com.chatapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.chatapp.model.Message;
import com.chatapp.service.MessageService;

@RestController
@CrossOrigin
public class MessageController {
    
    @Autowired
    MessageService messageService;
    
    @PostMapping("/send/{senderId}/{reciverId}")
    public ResponseEntity<?> sendMessage(@PathVariable int senderId, @PathVariable int reciverId, @RequestBody String msg) {
        String sendMessage = messageService.sendMessage(senderId, reciverId, msg);
        if(sendMessage.equals("null")) {
            return new ResponseEntity<>("USer not found", HttpStatus.NOT_FOUND);
        }

        if(sendMessage.equals("success")) {
            return new ResponseEntity<>("message sent", HttpStatus.OK);
        }

        return new ResponseEntity<>("Something unexpected", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/demo")
    public Message demo() {
        return messageService.demo();
    }

    @GetMapping("/getMesgs/{sender}/{reciver}")
    public List<Message> getAllMesgesIds(@PathVariable int sender, @PathVariable int reciver) {
        return messageService.getAllMessages(sender, reciver);
    }

    @DeleteMapping("/clearMsg")
    public ResponseEntity<?> clearData() {
        messageService.deleteAllMessages();
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    
}
