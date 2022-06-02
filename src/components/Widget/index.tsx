import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropText } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import { Options } from '../Options';
import { Form } from '../Form';
import { SuccessStep } from '../SuccessStep';

import { styles } from './styles';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';

export type FeedbackTypes = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackTypes | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  

  const bottomSheetRef = useRef<BottomSheet>(null)

  function handleOpen() {
    bottomSheetRef.current?.expand()
  }

  function handleFeedbackRestart() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  function handleFeedbackSent() {
    
    setFeedbackSent(true);
  }

  return (
    <>
      <TouchableOpacity style={styles.button}
      onPress={handleOpen}>
        <ChatTeardropText 
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />

      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ?
          <SuccessStep
            onFeedbackRestart={handleFeedbackRestart}
          />
          :
          <>
            {feedbackType ?
            <Form
                feedbackType={feedbackType}
                onFeedbackRestart={handleFeedbackRestart}
                onFeedbackSent={handleFeedbackSent}
              />
              :
              <Options
                onFeedbackTypeChange={setFeedbackType}  
              />      
            }
          </>
        }
        
      </BottomSheet>
    </>
    
  );
}

export default gestureHandlerRootHOC(Widget);