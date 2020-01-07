import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Input, Icon, Card, Button } from 'react-native-elements';
import { Tiles } from './components/tiles/tiles.component';
import { ErrorCatch } from './components/errorCatch';
export default function App() {
  return (
    <View style={styles.container}>
      <ErrorCatch>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Arbor Portal', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <Tiles tiles={[{ name: 'tile 1' }, { name: 'tile 2' }, { name: 'tile 3' }, { name: 'tile other' }]} />
      </ErrorCatch>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
