/*
usePokemonZukan.ts
図鑑ページで使用するフックを提供します。
*/
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

// -------------------------
// 全ポケモン名リスト取得
// -------------------------
export const usePokemonList = () => {
    const [pokemonList, setPokemonList] = useState<
        { id: number; name: string }[]
    >([]);

    useEffect(() => {
        const fetchAllPokemonNames = async () => {
            try {
                const list: { id: number; name: string }[] = [];
                for (let id = 1; id <= 151; id++) {
                    const res = await axios.get(
                        `https://pokeapi.co/api/v2/pokemon-species/${id}`
                    );
                    const jaName = res.data.names.find(
                        (n: any) => n.language.name === 'ja-Hrkt'
                    );
                    list.push({ id, name: jaName?.name || res.data.name });
                }
                setPokemonList(list);
            } catch (error) {
                console.error('ポケモンリスト取得エラー:', error);
            }
        };

        fetchAllPokemonNames();
    }, []);

    return { pokemonList };
};

// -------------------------
// ポケモンデータ取得
// -------------------------
export const usePokemonData = (pokemonNumber: number) => {
    const [pokemon, setPokemon] = useState<any>(null);
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
    const [pokemonDescription, setPokemonDescription] = useState('');

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`
                );
                const speciesResponse = await axios.get(
                    response.data.species.url
                );

                const japaneseName = speciesResponse.data.names.find(
                    (n: any) => n.language.name === 'ja-Hrkt'
                );
                setPokemonName(
                    japaneseName ? japaneseName.name : response.data.name
                );

                const types = await Promise.all(
                    response.data.types.map(async (typeInfo: any) => {
                        const typeRes = await axios.get(typeInfo.type.url);
                        const jaType = typeRes.data.names.find(
                            (n: any) => n.language.name === 'ja-Hrkt'
                        );
                        return jaType ? jaType.name : typeInfo.type.name;
                    })
                );
                setPokemonTypes(types);

                const flavorTextEntry =
                    speciesResponse.data.flavor_text_entries.find(
                        (entry: any) => entry.language.name === 'ja-Hrkt'
                    );
                setPokemonDescription(
                    flavorTextEntry
                        ? flavorTextEntry.flavor_text
                        : 'せつめいがありません'
                );

                setPokemon(response.data);
            } catch (error) {
                console.error('データ取得エラー:', error);
            }
        };

        fetchPokemon();
    }, [pokemonNumber]);

    return { pokemon, pokemonName, pokemonTypes, pokemonDescription };
};

// -------------------------
// シェイクアニメーション
// -------------------------
export const useShakeAnimation = (triggerKey?: any) => {
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    // 1.横揺れアニメーション
    const runHorizontalShake = () => {
        Animated.sequence([
            Animated.timing(translateX, {
                toValue: 25, // 揺れ幅
                duration: 100, // スピード
                useNativeDriver: true,
            }),
            Animated.timing(translateX, {
                toValue: -25,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(translateX, {
                toValue: 25, // 揺れ幅
                duration: 100, // スピード
                useNativeDriver: true,
            }),
            Animated.timing(translateX, {
                toValue: -25,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(translateX, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    // 2.縦揺れアニメーション
    const runVerticalShake = () => {
        Animated.sequence([
            // Animated.timing(translateY, {
            //     toValue: 20,
            //     duration: 250,
            //     useNativeDriver: true,
            // }),
            Animated.timing(translateY, {
                toValue: -40,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: -40,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    // 3.拡大縮小アニメーション
    const runScale = () => {
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 1.6, // 拡大率
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1.6,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    // 初回 or triggerKey が変わったときに発火
    useEffect(() => {
        if (triggerKey) {
            triggerAnimation();
        }
    }, [triggerKey]);

    const triggerAnimation = () => {
        // 0 = 横揺れ, 1 = 縦揺れ, 2 = 拡大縮小
        const animationType = Math.floor(Math.random() * 3);
        if (animationType === 0) {
            runHorizontalShake();
        } else if (animationType === 1) {
            runVerticalShake();
        } else {
            runScale();
        }
    };

    const animatedStyle = {
        transform: [{ translateX }, { translateY }, { scale }],
    };

    return { animatedStyle, triggerAnimation };
};
