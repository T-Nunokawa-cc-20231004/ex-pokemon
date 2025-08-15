/*
pomokenZukanCss.ts
図鑑ページで使用するスタイル
*/
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: 120,
    },
    imageViewArea: {
        flex: 1,
        alignItems: 'center',
    },
    fieldImage: {
        borderWidth: 10,
        borderColor: 'white',
        borderRadius: 10,
    },
    scrollContent: {
        alignItems: 'center',
    },
    selectionArea: {
        flexDirection: 'row',
        backgroundColor: 'black',
        borderWidth: 2,
        marginBottom: 10,
        padding: 10,
        width: 350,
        justifyContent: 'center',
    },
    selectionText: {
        color: 'white',
        marginRight: 5,
        fontFamily: 'Pkmn',
        fontSize: 30,
        lineHeight: 30,
    },
    seletionNoArea: {
        paddingHorizontal: 6,
    },
    selectionNoColor: {
        color: '#FFEB3B',
        fontFamily: 'Pkmn',
        fontSize: 30,
        lineHeight: 30,
    },
    informationArea: {
        width: 345,
        alignItems: 'center',
        marginTop: 20,
    },
    pokeObject: {
        width: '50%',
        aspectRatio: 1,
        marginBottom: 10,
    },
    pokeInfo: {
        padding: 10,
        backgroundColor: 'black',
        width: '100%',
    },
    pokeName: {
        textAlign: 'center',
        color: 'white',
        marginBottom: 5,
        fontFamily: 'Pkmn',
        fontSize: 40,
        lineHeight: 40,
    },
    pokeInfoText: {
        color: 'white',
        marginBottom: 3,
        fontFamily: 'Pkmn',
        fontSize: 25,
        lineHeight: 25,
    },
});
