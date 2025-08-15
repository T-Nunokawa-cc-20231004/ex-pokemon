/*
PokemonSelectModal.tsx
ポケモンを選択するモーダルコンポーネントを提供します。
*/
import { styles } from '@/styles/poke/pokemonZukan/pokemonSelectModelCss';
import React from 'react';
import {
    FlatList,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

type PokemonModal = {
    visible: boolean;
    onClose: () => void;
    pokemonList: { id: number; name: string }[];
    onSelect: (id: number) => void;
    onRandom: () => void;
};

export const PokemonSelectModal = ({
    visible,
    onClose,
    pokemonList,
    onSelect,
    onRandom,
}: PokemonModal) => {
    return (
        <Modal
            animationType="slide"
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>

            <View style={styles.modalContent}>
                <TouchableOpacity
                    onPress={onRandom}
                    style={[styles.listItem, styles.listItemRandom]}
                >
                    <Text
                        style={[styles.listItemText, styles.listItemRamdomText]}
                    >
                        ランダムにせんたく
                    </Text>
                </TouchableOpacity>

                <FlatList
                    data={pokemonList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => onSelect(item.id)}
                            style={styles.listItem}
                        >
                            <Text style={styles.listItemText}>
                                NO.{item.id} {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                    initialNumToRender={20}
                />
            </View>
        </Modal>
    );
};
