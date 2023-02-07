package com.chatapp.utils;

public class RandomIDGenerator {
    
    public static int generateUniqueIdForUser() {
        return (int) Math.floor(Math.random() * 1000000);
    }
}
