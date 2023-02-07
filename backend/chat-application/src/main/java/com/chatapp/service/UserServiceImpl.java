package com.chatapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chatapp.model.User;
import com.chatapp.repository.UserRepo;
import com.chatapp.utils.RandomIDGenerator;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepo userRepo;

    
    @Override
    public User creatUser(User user)  {
        User findByEmail = userRepo.findByEmail(user.getEmail());
        if(findByEmail == null) {
            int generateUniqueIdForUser = RandomIDGenerator.generateUniqueIdForUser();
            user.setUserId(generateUniqueIdForUser);
            user.setActive(true);
            return userRepo.save(user);
        }
        return null;
    }

    @Override
    public List<User> getAllUser() {
        return userRepo.findAll();
    }

    @Override
    public User getUser(int userId) {
        return userRepo.findById(userId).isPresent() ? userRepo.findById(userId).get() : null;
    }

    @Override
    public User logUser(String username, String password) {
        User findByUsername = userRepo.findByUsername(username);
        if(findByUsername != null) {
            String password2 = findByUsername.getPassword();
            if(password2.equals(password)) {
                findByUsername.setActive(true);
                userRepo.save(findByUsername);
                return findByUsername;
            }
        }
        return null;
    }

    @Override
    public String editUserDetails(int userId, User newUser) {
        User user = userRepo.findById(userId).get();
        user.setUsername(newUser.getUsername());
        user.setEmail(newUser.getEmail());
        user.setGender(newUser.getGender());
        user.setPassword(newUser.getPassword());

        User u = userRepo.save(user);
        return u != null ? "success" : null;
    }

    @Override
    public String logOutUser(int userId) {
       User user = userRepo.findById(userId).get();
       user.setActive(false);
       userRepo.save(user);
        return "success";
    }

    @Override
    public void deleteAllUsers() {
        userRepo.deleteAll();
    }

    @Override
    public void deleteUserById(int id) {
        userRepo.deleteById(id);
    }

}
