import React from 'react';
import * as ImagePicker from 'react-native-image-crop-picker';

export const useImagePicker = () => {
  const [image, setImage] = React.useState<any>(null);

  const pickImage = async () => {
    const result: any = await ImagePicker.openPicker({
      width: 800,
      height: 600,
      cropping: true,
      includeBase64: true,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  return {pickImage, image, setImage};
};
