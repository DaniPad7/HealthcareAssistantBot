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
            messageCreator.setAuthor("Alphius")
                    .setBody(response.getQueryResult().getFulfillmentText()).create();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean sendQueryToTwilio(DetectIntentResponse response, String conversationSid, String author) {
        try {
            MessageCreator messageCreator = Message.creator(conversationSid);
            messageCreator.setAuthor(author)
                    .setBody(response.getQueryResult().getQueryText()).create();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
