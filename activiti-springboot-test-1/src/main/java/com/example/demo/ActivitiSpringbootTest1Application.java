package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.activiti.spring.boot.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class ActivitiSpringbootTest1Application {

	public static void main(String[] args) {
		SpringApplication.run(ActivitiSpringbootTest1Application.class, args);
	}
}
