/*
usePokemonFont.ts
文字フォントを反映するフックを提供します。
説明：フォント読み込み中はピンク背景だけ表示します。
*/
import { useFonts } from 'expo-font';
import React from 'react';
import { View } from 'react-native';

type PokemonFont = {
    loaded: boolean;
    placeholder: React.ReactElement | null;
};

export const usePokemonFont = (): PokemonFont => {
    // フォント読み込み
    const [fontsLoaded] = useFonts({
        Pkmn: require('@/assets/fonts/pkmn_r.ttf'),
    });

    if (!fontsLoaded) {
        // フォント未読み込み中はピンク背景だけ表示
        return {
            loaded: false,
            placeholder: <View style={{ flex: 1, backgroundColor: 'pink' }} />,
        };
    }

    return { loaded: true, placeholder: null };
};
