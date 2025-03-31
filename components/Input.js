import { View, Text, TextInput , StyleSheet} from "react-native"
import { GlobalStyles } from "../constants/styles";

const Input = ({label, style, textInputConfig}) => {

  const ipStyle=[styles.input];
  if(textInputConfig && textInputConfig.multiline) {
    ipStyle.push(styles.inputMulLine)
  }

  return (
    <View style={[styles.root, style]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={ipStyle} {...textInputConfig} />
    </View>
  )
}
export default Input

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label:{
    fontSize: 12,
    color:GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input:{
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },  
  inputMulLine:{
    minHeight: 100,
    textAlignVertical:'top'
  }
});