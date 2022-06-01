import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  ImageProps,
  Text
} from 'react-native';

interface OptionProps extends TouchableOpacityProps{
  title: string;
  image: ImageProps
}

import { styles } from './styles';

export function Option({title, image, ...props}:OptionProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      {...props}
    >
      <Image
        source={image}
        style={styles.image}
      />

      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}