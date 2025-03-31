import { View, StyleSheet } from "react-native";
import { useState, useContext, useLayoutEffect } from "react";
import { ExpContext } from "../store/exp-context";
import IconButton from "../ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import ExpForm from "../components/ExpForm";
import { storeExp, updateExp, deleteExp } from "../util/http";
import Loading from "../ui/Loading";
import Error from "../ui/Error";

const ManageExp = ({ route, navigation }) => {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(undefined);

  const expCtx = useContext(ExpContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selExp = expCtx.expenses.find(exp => exp.id === editedExpenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsSending(true);
    try {
      await deleteExp(editedExpenseId);
      expCtx.delExp(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense. Pleae try later.');
      setIsSending(false);
    }    
  };

   const confirmHandler =   async (expData) => {
    setIsSending(true);
    try {
      if (isEditing) {
        expCtx.updateExp(editedExpenseId, expData);
        await updateExp(editedExpenseId, expData);
        // setIsSending(false);
        navigation.goBack();
      }
      else {
        const id = await storeExp(expData);
        // setIsSending(false);
        expCtx.addExp({...expData, id:id});
        navigation.goBack();
    }
    }
    catch (error){
      setError('Could not save expense. Please try later');
      setIsSending(false);
    }
  };


  const cancelHandler = () => {
    navigation.goBack();
  }
  if (error && !isSending) {
    return <Error message={error} />
  }
  if (isSending) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <ExpForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultVal = {selExp}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};
export default ManageExp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
