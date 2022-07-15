package com.ignite.hcassistantbot.controllers;

import com.ignite.hcassistantbot.services.TwilioService;
import com.twilio.jwt.accesstoken.AccessToken;
import com.twilio.jwt.accesstoken.ChatGrant;
import com.twilio.rest.conversations.v1.Conversation;
import com.twilio.rest.conversations.v1.conversation.Participant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/twilio")
public class TwilioController {
    private final TwilioService twilioService;
    @Autowired
    public TwilioController(TwilioService twilioService) {
        this.twilioService = twilioService;
    }
    private static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    private static final String API_KEY = System.getenv("TWILIO_API_KEY");
    private static final String API_SECRET = System.getenv("TWILIO_API_SECRET");
    private static final String SERVICE_SID = System.getenv("TWILIO_SERVICE_SID");
    private static final String CONVERSATION_SID = System.getenv("TWILIO_CONVERSATION_SID");


    @GetMapping(value = "/hello")
    public String sayHello() {
        return "hello";
    }

    @PostMapping(value = "/create-conversation")
    public ResponseEntity<String> createConversation() {
        Conversation conversation = Conversation.creator()
                .setFriendlyName("My First Conversation").create();
        return ResponseEntity.ok().body(conversation.getSid());
    }

    @GetMapping(value = "/fetch-conversation")
    public ResponseEntity<String> fetchConversation() {
        Conversation conversation = Conversation
                .fetcher(CONVERSATION_SID).fetch();
        return ResponseEntity.ok().body(conversation.getSid());
    }
    @PostMapping(value = "/create-smsparticipant")
    public ResponseEntity<String> createSMSParticipant() {
        Participant participant = Participant.creator(CONVERSATION_SID)
                .setMessagingBindingAddress("Done")
                .setMessagingBindingProxyAddress("Done").create();
        return ResponseEntity.ok().body(participant.getSid());
    }
    @PostMapping(value = "/create-chatparticipant")
    public ResponseEntity<String> createChatParticipant() {
        Participant participant = Participant.creator(CONVERSATION_SID)
                .setIdentity("testPineapple"/*Implement with H2 maybe*/).create();
        return ResponseEntity.ok().body(participant.getSid());
    }

    @PostMapping(value = "/create-token")
    public ResponseEntity<String> createToken(@RequestBody AppIdentity identity) {
        String name = identity.getName();
//        Implement above identity with H2
        ChatGrant grant = new ChatGrant();
        grant.setServiceSid(SERVICE_SID);
        AccessToken token = new AccessToken.Builder(ACCOUNT_SID, API_KEY, API_SECRET)
                .identity(name).grant(grant).build();
        return ResponseEntity.ok().body(token.toJwt());
    }

//    @PostMapping(value = "/dialogflow")
//    public ResponseEntity<String> toDialogflow(@RequestBody() AppBody appBody) {
//        String sessionId = appBody.conversationSid;
//        String query = appBody.query;
//        let response = twilioService.sendToDialogflow(projectId, sessionId, query);/*will equal to something*/
//        if (response.isNotOk) { send 500 status code}
//
//        let result = twilioService.sendToTwilio(response, sessionId);
//        if (result.isOk) {send 201 status code}
//    }
}

class AppIdentity {
    private String name;

    public String getName() { return this.name; }

    public void setName(String name) {
        this.name = name;
    }
}
