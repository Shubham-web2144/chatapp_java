package com.chatapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.chatapp.model.User;

@Service
public interface UserService {
    
    public User creatUser(User user);

    public List<User> getAllUser();

    public User getUser(int userId);

    public User logUser(String username, String password);

    public String editUserDetails(int userId, User newUser);

    public String logOutUser(int userId);

    public void deleteAllUsers();

    public void deleteUserById(int id);

}
