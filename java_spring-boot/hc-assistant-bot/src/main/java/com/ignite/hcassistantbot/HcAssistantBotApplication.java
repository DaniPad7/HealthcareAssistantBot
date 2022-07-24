package com.ignite.hcassistantbot;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.dialogflow.v2.SessionsSettings;
import com.twilio.Twilio;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;

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

	@Bean
	public SessionsSettings buildSessionsSettings() throws Exception {
		SessionsSettings sessionsSettings = SessionsSettings.newBuilder().setCredentialsProvider(
				FixedCredentialsProvider.create(GoogleCredentials.fromStream(
						new ClassPathResource(env.getProperty("GOOGLE_AUTH_JSON")).getInputStream()
				).createScoped("https://www.googleapis.com/auth/cloud-platform"))
		).build();
		return sessionsSettings;
	}
}
