/*
pokemonZukanPage.tsx
図鑑ページを提供します。
*/
import { PokemonSelectModal } from '@/components/poke/pokemonZukan/PokemonSelectModal';
import BackgroundLayout from '@/components/poke/utils/Background';
import {
    usePokemonData,
    usePokemonList,
    useShakeAnimation,
} from '@/hooks/poke/pokemonZukan/usePokemonZukan';
import { usePokemonFont } from '@/hooks/poke/utils/usePokemonFont';
import { styles } from '@/styles/poke/pokemonZukan/pokemonZukanCss';
import React, { useState } from 'react';
import {
    Animated,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function PokemonZukanPage() {
    const { pokemonList } = usePokemonList();
    const [pokemonNumber, setPokemonNumber] = useState(1);
    const { pokemon, pokemonName, pokemonTypes, pokemonDescription } =
        usePokemonData(pokemonNumber);
    const { animatedStyle, triggerAnimation } = useShakeAnimation(pokemon);
    const [modalVisible, setModalVisible] = useState(false);
    const getRandomNumber = () => Math.floor(Math.random() * 151) + 1;
    const selectNumber = (num: number) => {
        setPokemonNumber(num);
        setModalVisible(false);
    };
    const { loaded, placeholder } = usePokemonFont();
    if (!loaded) {
        return placeholder;
    }

    return (
        <BackgroundLayout>
            <View style={styles.mainContainer}>
                <View style={styles.imageViewArea}>
                    <Image
                        style={styles.fieldImage}
                        source={require('@/assets/images/poke/field.png')}
                        resizeMode="contain"
                    />
                </View>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.selectionArea}>
                        <Text style={[styles.selectionText]}>
                            ばんごうをタッチしてください：
                        </Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            style={[styles.seletionNoArea]}
                        >
                            <Text style={[styles.selectionNoColor]}>
                                NO.{pokemonNumber}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* モーダル */}
                    <PokemonSelectModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        pokemonList={pokemonList}
                        onSelect={selectNumber}
                        onRandom={() => selectNumber(getRandomNumber())}
                    />

                    {pokemon && (
                        <View style={styles.informationArea}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={triggerAnimation}
                            >
                                <Animated.Image
                                    source={{
                                        uri: pokemon.sprites.front_default,
                                    }}
                                    style={[styles.pokeObject, animatedStyle]}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <View style={[styles.pokeInfo]}>
                                <Text style={[styles.pokeName]}>
                                    {pokemonName}
                                </Text>
                                <Text style={[styles.pokeInfoText]}>
                                    たかさ : {(pokemon.height * 10).toFixed(1)}{' '}
                                    センチ
                                </Text>
                                <Text style={[styles.pokeInfoText]}>
                                    おもさ : {pokemon.weight} グラム
                                </Text>
                                <Text style={[styles.pokeInfoText]}>
                                    タイプ : {pokemonTypes.join(', ')}
                                </Text>
                                <Text style={[styles.pokeInfoText]}>
                                    せつめい ： {pokemonDescription}
                                </Text>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </View>
        </BackgroundLayout>
    );
}
