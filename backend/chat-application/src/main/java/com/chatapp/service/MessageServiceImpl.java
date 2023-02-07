package com.chatapp.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chatapp.model.Message;
import com.chatapp.model.User;
import com.chatapp.repository.MessageRepo;
import com.chatapp.repository.UserRepo;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    MessageRepo messageRepo;

    @Autowired
    UserRepo userRepo;

    @Override
    public String sendMessage(int senderID, int reciversID, String msg) {
        Optional<User> findById = userRepo.findById(reciversID);
        if(findById.get() == null) {
            return "null";
        }
        Date date = new Date();
        String d = String.valueOf(date);
        Message message = new Message(senderID, reciversID, d, msg);
        Message save = messageRepo.save(message);
        return save != null ? "success" : "error";
    }

    @Override
    public List<Message> getAllMessages(int senderID, int reciversID) {
        return messageRepo.findByMessagesByIds(senderID, reciversID);
    }
    

    public Message demo() {
        System.out.println(messageRepo.findMsgId());
        return messageRepo.findMsgId();
    }

    @Override
    public void deleteAllMessages() {
        messageRepo.deleteAll();
    }
}
