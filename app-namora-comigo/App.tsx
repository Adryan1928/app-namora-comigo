import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './utils/dimensions';
import { useState } from 'react';

export default function App() {
  const [randoCoordinates, setRandomCoordinates] = useState({ x: 0, y: 0 });
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  const randomizeCoordinates = () => {
    const relativeDimensions = {
      width: containerDimensions.width + 64,
      height: containerDimensions.height + 400,
    }
    const x = Math.floor(Math.random() * relativeDimensions.width);
    const y = Math.floor(Math.random() * relativeDimensions.height);
    setRandomCoordinates({ x, y });
  };

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerDimensions({ width, height });
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={[styles.title, styles.textColor]}>Quer namorar comigo?</Text>
      <View style={styles.containerButton} onLayout={handleContainerLayout}>
        <TouchableOpacity onPress={() => {setRandomCoordinates({x:0, y:0});alert('Agora somos um casal❤️')}} style={[styles.button, styles.buttonYes]}>
          <Text style={styles.textColor}>Sim</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {randomizeCoordinates()}} style={[styles.button, styles.buttonNo, randoCoordinates.x != 0 && {position: 'absolute', left: randoCoordinates.x, bottom: randoCoordinates.y}]}>
          <Text style={styles.textColor}>Não</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bb0e22ef',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 120,
  },
  textColor: {
    color: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#ffffff48',
  },
  buttonYes: {
    backgroundColor: '#009200',
  },
  buttonNo: {
    backgroundColor: '#ad0404',
  } 
});
