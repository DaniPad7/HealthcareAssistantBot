package com.ignite.hcassistantbot.controllers;

import com.google.cloud.dialogflow.v2.DetectIntentResponse;
import com.google.protobuf.ByteString;
import com.ignite.hcassistantbot.services.DialogflowService;
import com.ignite.hcassistantbot.services.TwilioService;
import com.twilio.jwt.accesstoken.AccessToken;
import com.twilio.jwt.accesstoken.ChatGrant;
import com.twilio.rest.conversations.v1.Conversation;
import com.twilio.rest.conversations.v1.conversation.Participant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping(value = "/twilio")
public class TwilioController {
    private final TwilioService twilioService;
    private final DialogflowService dialogflowService;
    @Autowired
    public TwilioController(TwilioService twilioService, DialogflowService dialogflowService) {
        this.dialogflowService = dialogflowService;
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
                .setFriendlyName("My Third Conversation").create();
        return ResponseEntity.ok().body(conversation.getSid());
    }

    @GetMapping(value = "/fetch-conversation")
    public ResponseEntity<String> fetchConversation() {
        Conversation conversation = Conversation
                .fetcher("CONVERSATION_SID").fetch();
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
        Participant participant = Participant.creator("CONVERSATION_SID")
                .setIdentity("appUser"/*Implement with H2 maybe*/).create();
        return ResponseEntity.ok().body(participant.getSid());
    }

    @PostMapping(value = "/create-token", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createToken(@RequestBody AppIdentity identity) {
        String name = identity.getName();
//        Implement above identity with H2
        ChatGrant grant = new ChatGrant();
        grant.setServiceSid(SERVICE_SID);
        AccessToken token = new AccessToken.Builder(ACCOUNT_SID, API_KEY, API_SECRET)
                .identity(name).grant(grant).build();
        return ResponseEntity.ok().body(token.toJwt());
    }

    @PostMapping(value = "/dialogflow")
    public ResponseEntity<String> toDialogflow(@RequestBody() String appBody) throws Exception{
        String query = appBody;
        DetectIntentResponse response = dialogflowService.sendToDialogflow("projectId", CONVERSATION_SID, query);
        if (!response.getQueryResult().hasIntent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No intent found.");
        }
        boolean result = twilioService.sendToTwilio(response, CONVERSATION_SID);
        if (result) { return ResponseEntity.status(HttpStatus.CREATED).body("Message created");}
        else { return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Could not send message to Twilio");}
    }

    @PostMapping(value = "/voice-dialogflow/{channel}")
    public void voiceToDialogflow(@RequestBody byte[] app, @PathVariable(name = "channel") String sid,
                                  @RequestParam(name = "typeonrep") String type) throws Exception {
        System.out.println(ByteString.copyFrom(app).toString("UTF-8"));
        System.out.println(sid + " " + type);
        DetectIntentResponse response = dialogflowService.sendVoiceToDialogFlow("projectId", CONVERSATION_SID, app);
        System.out.println(response.toString());
    }
}

class AppIdentity {
    private String name;

    public String getName() { return this.name; }

    public void setName(String name) {
        this.name = name;
    }
}
