import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator
} from 'react-native';
import { theme } from '../../theme';

interface SubmitButtonProsp extends TouchableOpacityProps{
  isLoading: boolean
}

import { styles } from './styles';

export function SubmitButton({ isLoading, ...props }:SubmitButtonProsp) {
  return (
    <TouchableOpacity
      style={styles.container}
      {...props}
    >
      {
        isLoading ?
          <ActivityIndicator
            color={theme.colors.text_on_brand_color}

          />
          :
          <Text style={styles.title}>
            Enviar Feedback
          </Text>
      }
    </TouchableOpacity>
  );
}