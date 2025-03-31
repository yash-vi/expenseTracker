import { View, Text, StyleSheet } from "react-native"
import { GlobalStyles } from "../constants/styles"

const Error = ({message}) => {
  return (
    <View style={styles.root}>
        <Text style={[styles.text, styles.title]}>An error occured!</Text>
        <Text style={styles.text}>{message}</Text>
    </View>
  );
}
export default Error

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});