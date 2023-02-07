package com.chatapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.chatapp.model.Message;

@Repository
public interface MessageRepo  extends JpaRepository<Message, Integer>{
    
    @Query(value = "SELECT * FROM messages m WHERE m.senderID = ?1 AND m.reciverID = ?2 OR m.senderID = ?2 AND m.reciverID = ?1", nativeQuery = true)
    List<Message> findByMessagesByIds(int senderID, int reciverID);

    @Query(value = "select * from Messages m where m.msgID=1", nativeQuery = true)
    public Message findMsgId();
}
