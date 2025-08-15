/*
pokemonSelectModalCss.ts
ポケモンを選択するモーダルで使用するスタイル
*/
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
    },
    modalContent: {
        position: 'absolute',
        top: '20%',
        left: '10%',
        right: '10%',
        bottom: '20%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    listItem: {
        paddingVertical: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    listItemRandom: {
        backgroundColor: 'blue',
        marginBottom: 10,
    },
    listItemText: {
        fontFamily: 'Pkmn',
        fontSize: 30,
        lineHeight: 30,
    },
    listItemRamdomText: {
        color: 'white',
        fontFamily: 'Pkmn',
    },
});
