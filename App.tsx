import React from 'react';
import {View, StyleSheet, Button, SafeAreaView} from 'react-native';
import {useImagePicker} from './hooks/useImagePicker';
import {
  Image,
  Canvas,
  Skia,
  Blur,
  ColorMatrix,
} from '@shopify/react-native-skia';

const App = () => {
  const [blur, showBlur] = React.useState(false);
  const [matrix, showMatrix] = React.useState(false);

  const {pickImage, image, setImage} = useImagePicker();
  const skiaImage = Skia.Image.MakeImageFromEncoded(
    Skia.Data.fromBase64(image?.data ?? ''),
  );

  return (
    <SafeAreaView style={{flex: 1, width: '100%', height: '100%'}}>
      <View style={styles.container}>
        {image && skiaImage ? (
          <>
            <Canvas style={{flex: 1, width: '100%', height: '100%'}}>
              <Image
                image={skiaImage}
                fit="contain"
                x={0}
                y={0}
                width={skiaImage?.width()}
                height={skiaImage?.height()}
              />
              {matrix ? (
                <Blur blur={2} mode="clamp">
                  <ColorMatrix
                    matrix={[
                      -0.578, 0.99, 0.588, 0, 0, 0.469, 0.535, -0.003, 0, 0,
                      0.015, 1.69, -0.703, 0, 0, 0, 0, 0, 1, 0,
                    ]}
                  />
                </Blur>
              ) : (
                <Blur blur={blur ? 5 : 0} />
              )}
            </Canvas>
            <Button
              title={blur ? 'Remove Blur' : 'Add Blur'}
              onPress={() => showBlur(prev => !prev)}
            />
            <Button
              title={matrix ? 'Remove Matric' : 'Add Matric'}
              onPress={() => showMatrix(prev => !prev)}
            />
            <Button title="Remove image" onPress={() => setImage(null)} />
          </>
        ) : (
          <Button title="Pick an image" onPress={pickImage} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: 'red',
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
  },
});
