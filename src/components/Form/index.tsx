import React from 'react';
import {
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';

import { FeedbackTypes } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';
import { SubmitButton } from '../SubmitButton';


import { feedbackTypes } from '../../utils/feedbackTypes';
import { styles } from './styles';
import { theme } from '../../theme';

interface FormProsp{
    feedbackType: FeedbackTypes
}

export function Form({ feedbackType }: FormProsp) {
    
    const feedbackTypesInfo = feedbackTypes[feedbackType];

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity>
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
        />
      
        <View style={styles.footer}>
        
        <ScreenshotButton
          onRemoveShot={()=>{}}
          onTakeShot={ ()=>{}}
          screenshot="https://avatars.githubusercontent.com/u/53803076?v=4"
        />
        <SubmitButton isLoading={false}/>
      </View> 
       
    </View>
  );
}