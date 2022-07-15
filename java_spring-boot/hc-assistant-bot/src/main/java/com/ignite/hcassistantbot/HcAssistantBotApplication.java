package com.ignite.hcassistantbot;

import com.twilio.Twilio;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class HcAssistantBotApplication implements CommandLineRunner {
	private final Environment env;

	public HcAssistantBotApplication(Environment env) {
		this.env = env;
	}

	public static void main(String[] args) {
		SpringApplication.run(HcAssistantBotApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Twilio.init(env.getProperty("TWILIO_ACCOUNT_SID"), env.getProperty("TWILIO_AUTH_TOKEN"));
	}
}
