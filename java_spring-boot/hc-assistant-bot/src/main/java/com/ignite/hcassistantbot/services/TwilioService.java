package com.ignite.hcassistantbot.services;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.Credentials;
import com.google.cloud.dialogflow.v2.*;
import com.twilio.rest.conversations.v1.conversation.Message;
import com.twilio.rest.conversations.v1.conversation.MessageCreator;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TwilioService {

    public void sendToDialogflow(String projectId, String sessionId, String query) throws Exception {
//        SessionsSettings sessionsSettings = SessionsSettings.newBuilder().setCredentialsProvider(
//                FixedCredentialsProvider.create()
//        ) Look into adding the google auth as an environment variable here
        try (SessionsClient sessionsClient = SessionsClient.create()) {
            SessionName session = SessionName.ofProjectSessionName("ProjectId", "SessionId");
            QueryInput queryInput = QueryInput.newBuilder().build();
            DetectIntentResponse response = sessionsClient.detectIntent(session, queryInput);
            /*Continue implementing logic from here*/
        }
    }

    public void sendToTwilio(String response, String conversationSid) {
        MessageCreator messageCreator = Message.creator("CONVERSATION_SID");
        messageCreator.setAuthor("system").setBody(response).create(); /*response will change*/

    }
}
