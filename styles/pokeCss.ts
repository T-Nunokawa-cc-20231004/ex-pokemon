import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    scrollContent: {
        alignItems: 'center',
        paddingVertical: 50,
    },
    title: {
        backgroundColor: 'black',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'white',
        width: 300,
        marginBottom: 20,
    },
    section: {
        width: 300,
        alignItems: 'center',
        marginTop: 20,
    },
    selection: {
        flexDirection: 'row',
        backgroundColor: 'black',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 10,
        padding: 10,
        width: 350,
        justifyContent: 'center',
    },
    selectionA: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectionText: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: 5,
    },
    pokeObject: {
        width: '50%',
        aspectRatio: 1,
        marginBottom: 10,
    },
    pokeInfo: {
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'white',
        width: '100%',
    },
    pokeName: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        marginBottom: 5,
    },
    pokeInfoText: {
        color: 'white',
        marginBottom: 3,
    },
});

export const modalStyles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000088',
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
    listItemText: {
        fontSize: 16,
    },
});
