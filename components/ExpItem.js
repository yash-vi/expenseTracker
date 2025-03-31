import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import getFormattedDate from "../util/date"
import { useNavigation } from "@react-navigation/native";


const ExpItem = ({id, description, amount, date}) => {

  const navigation = useNavigation();
  const expensePressHandler = ({route}) => {
    navigation.navigate("Manage Expenses", {
      expenseId: id,
    });
  }

  return (
    <Pressable onPress={expensePressHandler} style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.descText]}>{description}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amt}>
          <Text style={styles.amtText}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};
export default ExpItem;
const styles = StyleSheet.create({
  pressed:{
    opacity: 0.75,
  },
    expenseItem:{
        padding: 12,
        marginVertical: 8,
        backgroundColor:  GlobalStyles.colors.primary500,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius: 10,
    },
    textBase: {
        color: GlobalStyles.colors.primary50
    },
    descText:{
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amt:{
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 4, 
        minWidth: 80,
    },
    amtText:{
        color:GlobalStyles.colors.primary500,
        fontWeight:'bold',
    }
});