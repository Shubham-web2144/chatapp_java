package com.chatapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int msgID;

    private int senderID;

    private int reciverID;

    private String date;

    private String message;

    public Message(int senderID, int reciverID, String date, String message) {
     
        this.senderID = senderID;
        this.reciverID = reciverID;
        this.date = date;
        this.message = message;
    }

    public Message() {
    }

    public int getMsgID() {
        return msgID;
    }

    public void setMsgID(int msgID) {
        this.msgID = msgID;
    }

    public int getSenderID() {
        return senderID;
    }

    public void setSenderID(int senderID) {
        this.senderID = senderID;
    }

    public int getReciverID() {
        return reciverID;
    }

    public void setReciverID(int reciverID) {
        this.reciverID = reciverID;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
