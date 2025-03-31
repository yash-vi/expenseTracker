import { FlatList } from "react-native";
import ExpItem from './ExpItem'

const renderExpItem = (itemData) => {
  return <ExpItem  {...itemData.item}/>;
};

const ExpList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpItem}
      keyExtractor={(item) => item.id}
    />
  );
};
export default ExpList;
