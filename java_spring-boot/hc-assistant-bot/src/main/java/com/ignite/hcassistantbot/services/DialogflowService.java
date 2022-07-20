package com.ignite.hcassistantbot.services;

import com.google.cloud.dialogflow.v2.*;
import com.google.protobuf.ByteString;
import com.google.protobuf.Descriptors;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DialogflowService {
    @Autowired
    private SessionsSettings sessionsSettings;

    public DetectIntentResponse sendToDialogflow(String projectId, String sessionId, String query) throws Exception {
        try (SessionsClient sessionsClient = SessionsClient.create(sessionsSettings)) {
            SessionName session = SessionName.ofProjectSessionName(projectId, sessionId);
            QueryInput queryInput = QueryInput.newBuilder().setText(
                    TextInput.newBuilder()
                            .setLanguageCode("languageCode-2092349083")
                            .setText(query)).build();
            DetectIntentResponse response = sessionsClient.detectIntent(session, queryInput);
            /*Continue implementing logic from here*/
            System.out.println(response.toString());
            return response;
        }
    }

    public DetectIntentResponse sendVoiceToDialogFlow(String projectId, String sessionId,byte[] query)  throws Exception {
        try (SessionsClient sessionsClient = SessionsClient.create(sessionsSettings)) {
            InputAudioConfig inputAudioConfig = InputAudioConfig.newBuilder()
                    .setAudioEncoding(AudioEncoding.AUDIO_ENCODING_UNSPECIFIED)
                    .setLanguageCode("en-US")
                    /*.setSampleRateHertz(48000)*/.build();
            QueryInput queryInput = QueryInput.newBuilder().setAudioConfig(inputAudioConfig).build();
            ByteString bytes = ByteString.copyFrom(query);
//            System.out.println(bytes.toString("UTF-8"));
            DetectIntentRequest request = DetectIntentRequest.newBuilder()
                    .setSession(SessionName.ofProjectSessionName(projectId, sessionId).toString())
                    .setQueryInput(queryInput)
                    .setInputAudio(bytes).build();
            DetectIntentResponse response = sessionsClient.detectIntent(request);
            return response;
        }
    }
}
