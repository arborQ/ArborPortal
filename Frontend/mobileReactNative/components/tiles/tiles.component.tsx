import React from 'react';
import { Header, Input, Icon, Card, Button } from 'react-native-elements';
import { Text, View, ScrollView, SafeAreaView, Image } from 'react-native';
import styles from './tiles.component.styles';

interface ITile {
    name: string;
}

interface ITilesProps {
    tiles: ITile[];
}

export function Tiles(props: ITilesProps) {
    const { tiles } = props;
    return (
        <SafeAreaView>
            <ScrollView horizontal style={styles.container}>
                {
                    tiles.map((tile, index) => <Card title={`${tile.name}`} containerStyle={styles.card} key={index}>
                        <Image style={{ width: 200, height: 200, resizeMode: 'contain' }} source={require('../../assets/car.png')} />
                    </Card>)
                }
            </ScrollView>
        </SafeAreaView>
    );
}
