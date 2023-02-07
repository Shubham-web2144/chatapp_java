package com.chatapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.chatapp.exception.NoUserFoundException;
import com.chatapp.exception.NoUsersException;
import com.chatapp.model.User;
import com.chatapp.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        User creatUser = userService.creatUser(user);
        if (creatUser == null) {
            return new ResponseEntity<>("User already have account", HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(creatUser, HttpStatus.CREATED);
    }

    @GetMapping("/getAllUser")
    public ResponseEntity<?> getAllUsers() throws NoUsersException {
        List<User> allUser = userService.getAllUser();
        if(allUser.size() == 0 || allUser.size() == 1) {
            throw new NoUsersException("No Users available");
        }
        return new ResponseEntity<>(allUser, HttpStatus.OK);

    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<?> getUser(@PathVariable("id") int id) throws NoUserFoundException {
        User user = userService.getUser(id);
        if(user == null) throw new NoUserFoundException("User not found");
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/log")
    public ResponseEntity<?> logUser(@Param("username") String username, @Param("password") String password) {
        User logUser = userService.logUser(username, password);
        if (logUser != null) {
            return new ResponseEntity<>(logUser, HttpStatus.OK);
        }
        return new ResponseEntity<>("Error", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/edit/{userId}")
    public ResponseEntity<?> editUserData(@PathVariable int userId, @RequestBody User newUser) {
        String editUserDetails = userService.editUserDetails(userId, newUser);

        if (editUserDetails.equals("success")) {
            return new ResponseEntity<>("success", HttpStatus.OK);
        }
        return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/logOut/{userId}")
    public ResponseEntity<?> logOutUser(@PathVariable int userId) {
        String msg = userService.logOutUser(userId);
        if (msg.equals("success")) {
            return new ResponseEntity<>("success", HttpStatus.OK);
        }
        return new ResponseEntity<>("Error", HttpStatus.FORBIDDEN);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> deleteUsers() {
        userService.deleteAllUsers();
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @DeleteMapping("/clear/{id}")
    public ResponseEntity<?> deleteById(@PathVariable int id) {
        userService.deleteUserById(id);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }
}
