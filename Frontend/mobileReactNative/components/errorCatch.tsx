import React from 'react';
import { Text } from 'react-native';

export function ErrorCatch({ children }) {
    try {
        return children;
    } catch(e) {
        return <Text>catch error</Text>;
    }
}