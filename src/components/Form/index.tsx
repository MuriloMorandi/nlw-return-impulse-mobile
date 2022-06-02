import React, { useState } from 'react';
import {
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { captureScreen } from 'react-native-view-shot'

import * as FileSystem from 'expo-file-system';

import { ArrowLeft } from 'phosphor-react-native';

import { FeedbackTypes } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';
import { SubmitButton } from '../SubmitButton';


import { feedbackTypes } from '../../utils/feedbackTypes';
import { styles } from './styles';
import { theme } from '../../theme';
import { sendFeedback } from '../../Api/api';

interface FormProsp{
  feedbackType: FeedbackTypes
  onFeedbackRestart: () => void
  onFeedbackSent: () => void
}

export function Form({ feedbackType, onFeedbackRestart, onFeedbackSent }: FormProsp) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false);
  const [comment, setComment] = useState("");

  const feedbackTypesInfo = feedbackTypes[feedbackType];

  function handleScreenshot() {
    
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
      .then(uri =>  setScreenshot(uri))
      .catch(error => console.log(error))
  
  }

  function handleScreenshotNull() {
    setScreenshot(null)
  }

  async function handleSendFeedback() {
    if (isSending) return
    setIsSending(true)
    
    const screenshotBase64 = screenshot &&
      await FileSystem.readAsStringAsync(screenshot, {
        encoding:'base64'
      })   

    try {
      sendFeedback({
        data: {
          screenshot: `data:image/png;base64, ${screenshotBase64}`,
          type: feedbackType,
          comment
        }
      })
      onFeedbackSent()
    }
    catch (error) {
      console.log(error)
      setIsSending(false)
    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onFeedbackRestart}>
                  <ArrowLeft
                    size={24}
                    weight="bold"
                    color={theme.colors.text_secondary}
                    />
            </TouchableOpacity>
            
              <View style={styles.titleContainer}>
                  <Image
                      source={feedbackTypesInfo.image}
                      style={styles.image}
                    />

                    <Text style={styles.titleText}>
                        {feedbackTypesInfo.title}
                    </Text>
            </View>

        </View>
      
        <TextInput
          multiline
          placeholder='Conte com detalhes o que está acontecendo...'
          placeholderTextColor={theme.colors.text_secondary}
          style={styles.input}
          autoCorrect={false}
          onChangeText={setComment}
        />
      
        <View style={styles.footer}>
        
        <ScreenshotButton
          onRemoveShot={handleScreenshotNull}
          onTakeShot={ handleScreenshot }
          screenshot={screenshot}
        />

        <SubmitButton
          isLoading={isSending}
          onPress={handleSendFeedback}
        />
      </View> 
       
    </View>
  );
}