package com.ignite.hcassistantbot.controllers;

import com.google.cloud.dialogflow.v2.DetectIntentResponse;
import com.ignite.hcassistantbot.services.DialogflowService;
import com.ignite.hcassistantbot.services.TwilioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/nlu")
public class DialogflowController {

    private final TwilioService twilioService;
    private final DialogflowService dialogflowService;
    @Autowired
    public DialogflowController(TwilioService twilioService, DialogflowService dialogflowService) {
        this.dialogflowService = dialogflowService;
        this.twilioService = twilioService;
    }
    private static final String DF_PROJECT_ID = System.getenv("DF_PROJECT_ID");
    private static final String CONV_SID_1DF = System.getenv("CONV_SID_1DF");

    @PostMapping(value = "/text/dialogflow")
    public ResponseEntity<String> textToDialogflow(@RequestBody() String query) throws Exception{
        DetectIntentResponse response = dialogflowService.sendTextToDialogflow(DF_PROJECT_ID, CONV_SID_1DF, query);
        if (!response.getQueryResult().hasIntent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No intent found.");
        }
        boolean result = twilioService.sendToTwilio(response, CONV_SID_1DF);
        if (result) { return ResponseEntity.status(HttpStatus.CREATED).body("Message created");}
        else { return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Could not send message to Twilio");}
    }

    @PostMapping(value = "/voice/dialogflow/{channel}")
    public ResponseEntity<String> voiceToDialogflow(@RequestBody byte[] app, @PathVariable(name = "channel") String sid,
                                                    @RequestParam(name = "typeonrep") String type,
                                                    @RequestParam(name = "author") String author) throws Exception {
        boolean result;
        DetectIntentResponse response = dialogflowService.sendVoiceToDialogFlow(DF_PROJECT_ID, sid, app);
        if (!response.hasQueryResult()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No intent found.");
        }
        result = (type.equals("true")) ?
                twilioService.sendQueryToTwilio(response, sid, author) : twilioService.sendToTwilio(response, sid);
//        Implementation above is improved by using the Speech-To-Text API
        return (result == true) ? ResponseEntity.status(HttpStatus.CREATED).body("Message created"):
         ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Could not send message to Twilio");
    }
}
