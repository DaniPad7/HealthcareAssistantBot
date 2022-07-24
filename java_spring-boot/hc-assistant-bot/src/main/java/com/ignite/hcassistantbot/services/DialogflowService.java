package com.ignite.hcassistantbot.services;

import com.google.cloud.dialogflow.v2.*;
import com.google.protobuf.ByteString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DialogflowService {
    @Autowired
    private SessionsSettings sessionsSettings;

    public DetectIntentResponse sendTextToDialogflow(String projectId, String sessionId, String query) throws Exception {
        try (SessionsClient sessionsClient = SessionsClient.create(sessionsSettings)) {
            SessionName session = SessionName.ofProjectSessionName(projectId, sessionId);
            QueryInput queryInput = QueryInput.newBuilder().setText(
                    TextInput.newBuilder()
                            .setLanguageCode("languageCode-2092349083")
                            .setText(query)).build();
            DetectIntentResponse response = sessionsClient.detectIntent(session, queryInput);
            return response;
        }
    }

    public DetectIntentResponse sendVoiceToDialogFlow(String projectId, String sessionId,byte[] query)  throws Exception {
        try (SessionsClient sessionsClient = SessionsClient.create(sessionsSettings)) {
            InputAudioConfig inputAudioConfig = InputAudioConfig.newBuilder()
                    .setAudioEncoding(AudioEncoding.AUDIO_ENCODING_UNSPECIFIED)
                    .setLanguageCode("en-US").build();
            QueryInput queryInput = QueryInput.newBuilder().setAudioConfig(inputAudioConfig).build();
            ByteString bytes = ByteString.copyFrom(query);
            DetectIntentRequest request = DetectIntentRequest.newBuilder()
                    .setSession(SessionName.ofProjectSessionName(projectId, sessionId).toString())
                    .setQueryInput(queryInput)
                    .setInputAudio(bytes).build();
            DetectIntentResponse response = sessionsClient.detectIntent(request);
            return response;
        }
    }
}
