import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';
import { Copyright } from '../Copyright';
import { Option } from '../Option';
import { FeedbackTypes } from '../Widget';

import { feedbackTypes } from '../../utils/feedbackTypes';

interface OptionsProps{
    onFeedbackTypeChange:( feedbackType: FeedbackTypes) => void
}


export function Options({onFeedbackTypeChange}:OptionsProps) {
  return (
      <View style={styles.container}>
            <Text style={styles.title}>
                Deixe seu feedback
            </Text>   
          
            <View style={styles.options}>
                {Object.entries(feedbackTypes).map(([key, value]) => {
                    return (
                        <Option
                            key={key}
                            title={value.title}
                            image={value.image}
                            onPress={()=>onFeedbackTypeChange(key as FeedbackTypes)}
                        />
                    )})
                }
            </View>

            <Copyright />
    </View>
  );
}