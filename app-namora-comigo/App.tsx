import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './utils/dimensions';
import { useState } from 'react';

export default function App() {
  const [randoCoordinates, setRandomCoordinates] = useState({ x: 0, y: 0 });
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0, x:0, y:0 });

  const randomizeCoordinates = () => {
    const relativeDimensions = {
      width: Math.floor(SCREEN_WIDTH) - Math.floor(containerDimensions.x),
      height: Math.floor(0) - Math.floor(containerDimensions.y) + 120,
    }
    // x: -100 || 0; y: +120 || +160;
    let x = Math.floor(Math.random() * SCREEN_WIDTH) - Math.floor(containerDimensions.x);
    let y = Math.floor(Math.random() * SCREEN_HEIGHT) - Math.floor(containerDimensions.y) + 120;

    if (x >= relativeDimensions.width -100) {
      x = relativeDimensions.width - 100;
    }

    if (y <= relativeDimensions.height + 40) {
      y = relativeDimensions.height + 160;
    }

    setRandomCoordinates({ x, y });
  };

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    console.log("x:", x, "y:", y);
    console.log("width:", width, "height:", height);
    setContainerDimensions({ width, height, x, y });
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
