package com.ignite.hcassistantbot.controllers;

import com.ignite.hcassistantbot.services.DialogflowService;
import com.ignite.hcassistantbot.services.TwilioService;
import com.twilio.jwt.accesstoken.AccessToken;
import com.twilio.jwt.accesstoken.ChatGrant;
import com.twilio.jwt.accesstoken.VoiceGrant;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.voice.Number;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    private static final String TWIML_APP_SID = System.getenv("TWIML_APP_SID");
    private static final String TWILIO_NUMBER = System.getenv("TWILIO_NUMBER");
    private static final String PHONE_NUMBER = System.getenv("PHONE_NUMBER");

    @PostMapping(value = "/create/token", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createToken(@RequestBody AppIdentity identity) {
        String name = identity.getName();
        ChatGrant grant = new ChatGrant();
        grant.setServiceSid(SERVICE_SID);
        AccessToken token = new AccessToken.Builder(ACCOUNT_SID, API_KEY, API_SECRET)
                .identity(name).grant(grant).build();
        return ResponseEntity.status(201).body(token.toJwt());
    }

    @PostMapping(value = "/create/token/call")
    public ResponseEntity<String> createTokenCall() {
        VoiceGrant grant = new VoiceGrant();
        grant.setOutgoingApplicationSid(TWIML_APP_SID);
        grant.setIncomingAllow(true);
        AccessToken token = new AccessToken.Builder(ACCOUNT_SID,API_KEY, API_SECRET)
                .grant(grant).build();
        return ResponseEntity.status(201).body(token.toJwt());
    }

    @PostMapping(value = "/call/connect")
    public ResponseEntity<String> getXmlResponse() {
        String twilioPhoneNumber = TWILIO_NUMBER;
        String phoneNumber = PHONE_NUMBER;
        Number number = new Number.Builder(phoneNumber).build();
        Dial dial = new Dial.Builder().number(number).callerId(twilioPhoneNumber).build();
        VoiceResponse twimlResponse = new VoiceResponse.Builder().dial(dial).build();
        return ResponseEntity.ok(twimlResponse.toXml());
    }
}

class AppIdentity {
    private String name;

    public String getName() { return this.name; }

    public void setName(String name) {
        this.name = name;
    }
}
