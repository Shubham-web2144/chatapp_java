package com.chatapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.chatapp.model.Message;

@Service
public interface MessageService {

    public String sendMessage(int senderID, int reciversID, String msg);

    public List<Message> getAllMessages(int senderID, int reciversID);
    public Message demo();
    public void deleteAllMessages();
}
