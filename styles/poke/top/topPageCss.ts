/*
topPageCss.ts
トップページで使用するスタイル
*/
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Pkmn',
        fontSize: 70,
        lineHeight: 70,
    },
    subTitle: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 50,
        fontFamily: 'Pkmn',
        fontSize: 50,
        lineHeight: 50,
    },
    ballImage: {
        marginBottom: 40,
        width: 200,
        height: 200,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Pkmn',
        fontSize: 30,
        lineHeight: 30,
    },
    version: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'Pkmn',
        fontSize: 30,
        lineHeight: 30,
    },
});
