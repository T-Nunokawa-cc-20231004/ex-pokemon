/*
index.tsx
トップページを提供します。
*/
import { BallImage } from '@/components/poke/top/BallImage';
import BackgroundLayout from '@/components/poke/utils/Background';
import { usePokemonFont } from '@/hooks/poke/utils/usePokemonFont';
import appInfo from '@/package.json';
import { styles } from '@/styles/poke/top/topPageCss';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
export default function TopPage() {
    const router = useRouter();
    const { loaded, placeholder } = usePokemonFont();
    if (!loaded) {
        return placeholder;
    }

    return (
        <BackgroundLayout>
            <View style={styles.container}>
                <Text style={[styles.title]}>ポケモンずかん</Text>
                <Text style={[styles.subTitle]}>カントーちほう</Text>
                <BallImage style={styles.ballImage} />
                <TouchableOpacity
                    onPress={() => router.push('/pokemonZukanPage')}
                >
                    <View style={styles.button}>
                        <Text style={[styles.buttonText]}>
                            タップ：ポケモンをしらべる
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={[styles.version]}>V.{appInfo.version}</Text>
            </View>
        </BackgroundLayout>
    );
}
