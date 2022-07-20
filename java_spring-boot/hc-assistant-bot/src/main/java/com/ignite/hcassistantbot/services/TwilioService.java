package com.ignite.hcassistantbot.services;


import com.google.cloud.dialogflow.v2.DetectIntentResponse;
import com.twilio.rest.conversations.v1.conversation.Message;
import com.twilio.rest.conversations.v1.conversation.MessageCreator;
import org.springframework.stereotype.Service;

@Service
public class TwilioService {

    public boolean sendToTwilio(DetectIntentResponse response, String conversationSid) {
        try {
            MessageCreator messageCreator = Message.creator(conversationSid);
            messageCreator.setAuthor("system1")
                    .setBody(response.getQueryResult().getFulfillmentText()).create();
            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
}
