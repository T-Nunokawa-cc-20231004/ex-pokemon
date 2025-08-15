/*
Background.tsx
共通で使用する背景を提供します。
*/
import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

type Props = {
    children: ReactNode;
};

export default function BackgroundLayout({ children }: Props) {
    return (
        <ImageBackground
            source={require('@/assets/images/poke/zukan.jpg')}
            style={styles.background}
        >
            <View style={styles.content}>{children}</View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    content: { flex: 1 },
});
