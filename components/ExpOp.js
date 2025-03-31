import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import ExpSummary from "./ExpSummary";
import ExpList from "./ExpList";


const ExpOp = ({expenses, expensePeriod, fallbackText}) => {

let content = <Text style={styles.infoText}>{fallbackText}</Text>
if (expenses.length > 0) {
  content = <ExpList expenses={expenses} />;
}
  return (
    <View style={styles.container}>
        <ExpSummary expenses={expenses} periodName={expensePeriod}/>
        {content}
    </View>
  )
}
export default ExpOp;

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText:{
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  }
})