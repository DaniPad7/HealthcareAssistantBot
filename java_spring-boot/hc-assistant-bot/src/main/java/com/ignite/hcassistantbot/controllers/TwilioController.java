package com.ignite.hcassistantbot.controllers;

import com.twilio.Twilio;
import com.twilio.jwt.accesstoken.AccessToken;
import com.twilio.jwt.accesstoken.ChatGrant;
import com.twilio.rest.conversations.v1.Conversation;
import com.twilio.rest.conversations.v1.conversation.Participant;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/twilio")
public class TwilioController {
    private static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    private static final String API_KEY = System.getenv("TWILIO_API_KEY");
    private static final String API_SECRET = System.getenv("TWILIO_API_SECRET");
    private static final String SERVICE_SID = System.getenv("TWILIO_SERVICE_SID");
    private static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    @GetMapping(value = "/hello")
    public String sayHello() {
        return "hello";
    }

    @PostMapping(value = "/create-conversation")
    public ResponseEntity<String> createConversation() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Conversation conversation = Conversation.creator()
                .setFriendlyName("My First Conversation").create();
        return ResponseEntity.ok().body(conversation.getSid());
    }

    @PostMapping(value = "/fetch-conversation")
    public ResponseEntity<String> fetchConversation() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Conversation conversation = Conversation
                .fetcher("CONVERSATION_SID").fetch();
        return ResponseEntity.ok().body(conversation.getSid());
    }
    @PostMapping(value = "/create-smsparticipant")
    public ResponseEntity<String> createSMSParticipant() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Participant participant = Participant.creator("CONVERSATION_SID")
                .setMessagingBindingAddress("Personal phone")
                .setMessagingBindingProxyAddress("Twilio phone").create();
        return ResponseEntity.ok().body(participant.getSid());
    }
    @PostMapping(value = "/create-chatparticipant")
    public ResponseEntity<String> createChatParticipant() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Participant participant = Participant.creator("CONVERSATION_SID")
                .setIdentity("testPineapple"/*Implement with H2 maybe*/).create();
        return ResponseEntity.ok().body(participant.getSid());
    }

    @PostMapping(value = "/create-token")
    public ResponseEntity<String> createToken() {
        String identity = "testPineapple";
//        Implement identity with H2
        ChatGrant grant = new ChatGrant();
        grant.setServiceSid(SERVICE_SID);
        AccessToken token = new AccessToken.Builder(ACCOUNT_SID, API_KEY, API_SECRET)
                .identity(identity).grant(grant).build();
        return ResponseEntity.ok().body(token.toJwt());
    }
}
