import { modalStyles, styles } from '@/styles/pokeCss';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    ImageBackground,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export default function Home() {
    const [pokemonList, setPokemonList] = useState<
        { id: number; name: string }[]
    >([]);
    const [pokemonNumber, setPokemonNumber] = useState(1);
    const [pokemon, setPokemon] = useState<any>(null);
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
    const [pokemonDescription, setPokemonDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const getRandomNumber = () => Math.floor(Math.random() * 151) + 1;

    // 初回：全ポケモン名を取得
    useEffect(() => {
        const fetchAllPokemonNames = async () => {
            try {
                const result: { id: number; name: string }[] = [];

                for (let id = 1; id <= 151; id++) {
                    const res = await axios.get(
                        `https://pokeapi.co/api/v2/pokemon-species/${id}`
                    );
                    const jaName = res.data.names.find(
                        (n: any) => n.language.name === 'ja-Hrkt'
                    );
                    result.push({ id, name: jaName?.name || res.data.name });
                }

                setPokemonList(result);
            } catch (error) {
                console.error('Error fetching Pokémon names:', error);
            }
        };

        fetchAllPokemonNames();
    }, []);

    // ポケモン情報取得
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
                    (name: any) => name.language.name === 'ja-Hrkt'
                );
                setPokemonName(
                    japaneseName ? japaneseName.name : response.data.name
                );

                const typePromises = response.data.types.map(
                    async (typeInfo: any) => {
                        const typeResponse = await axios.get(typeInfo.type.url);
                        const japaneseType = typeResponse.data.names.find(
                            (name: any) => name.language.name === 'ja-Hrkt'
                        );
                        return japaneseType
                            ? japaneseType.name
                            : typeInfo.type.name;
                    }
                );
                const types = await Promise.all(typePromises);
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
                console.error('Error fetching Pokémon data:', error);
            }
        };

        fetchPokemon();
    }, [pokemonNumber]);

    const selectNumber = (num: number) => {
        setPokemonNumber(num);
        setModalVisible(false);
    };

    return (
        <ImageBackground
            source={require('../../assets/images/poke/background.png')}
            style={styles.container}
            resizeMode="contain"
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>ポケモンずかん</Text>

                <View style={styles.selection}>
                    <View style={styles.selectionA}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={styles.selectionText}>
                                ばんごうをえらんでください{' '}
                            </Text>
                            <TouchableOpacity
                                onPress={() => setModalVisible(true)}
                                style={{
                                    backgroundColor: 'grey',
                                    paddingHorizontal: 6,
                                }}
                            >
                                <Text style={{ color: 'white' }}>
                                    No.{pokemonNumber}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* モーダル */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <TouchableWithoutFeedback
                        onPress={() => setModalVisible(false)}
                    >
                        <View style={modalStyles.modalOverlay} />
                    </TouchableWithoutFeedback>

                    <View style={modalStyles.modalContent}>
                        <TouchableOpacity
                            onPress={() => {
                                const randomNum = getRandomNumber();
                                setPokemonNumber(randomNum);
                                setModalVisible(false);
                            }}
                            style={[
                                modalStyles.listItem,
                                {
                                    backgroundColor: 'grey',
                                    marginBottom: 10,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    modalStyles.listItemText,
                                    { color: 'white', fontWeight: 'bold' },
                                ]}
                            >
                                ランダムにえらぶ
                            </Text>
                        </TouchableOpacity>

                        <FlatList
                            data={pokemonList}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => selectNumber(item.id)}
                                    style={modalStyles.listItem}
                                >
                                    <Text style={modalStyles.listItemText}>
                                        No.{item.id} {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            initialNumToRender={20}
                        />
                    </View>
                </Modal>

                {pokemon && (
                    <View style={styles.section}>
                        <Image
                            source={{ uri: pokemon.sprites.front_default }}
                            style={styles.pokeObject}
                            resizeMode="contain"
                        />
                        <View style={styles.pokeInfo}>
                            <Text style={styles.pokeName}>{pokemonName}</Text>
                            <Text style={styles.pokeInfoText}>
                                たかさ : {(pokemon.height * 10).toFixed(1)} cm
                            </Text>
                            <Text style={styles.pokeInfoText}>
                                おもさ : {pokemon.weight} g
                            </Text>
                            <Text style={styles.pokeInfoText}>
                                タイプ : {pokemonTypes.join(', ')}
                            </Text>
                            <Text style={styles.pokeInfoText}>
                                せつめい ： {pokemonDescription}
                            </Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        </ImageBackground>
    );
}
