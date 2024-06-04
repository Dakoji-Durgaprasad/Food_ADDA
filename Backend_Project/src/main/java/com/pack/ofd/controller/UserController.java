package com.pack.ofd.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pack.ofd.dao.OnlineFoodDeliveryDAO;
import com.pack.ofd.model.User;
import com.pack.ofd.repository.UserRepository;

@RestController
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@RequestMapping("/")
    public String home(){
        return "Hello World!";
    }
	
	@PostMapping("/register")
	User newUser(@RequestBody User newUser) {
		return userRepository.save(newUser);
	}
	
	@GetMapping("/users")
	List<User> getAllUsers(){
		return userRepository.findAll();
	}
	
	@PostMapping("/login/{email}/{pswd}")
//	List<User> validateUser(@PathVariable("email") String email,@PathVariable("pswd") String password ){
//		
//	}
	public List<User> verifyUserToLogin(@PathVariable("email") String email,@PathVariable("pswd") String password ){
		return userRepository.findByEmailAndPassword( email,  password);
	}
}