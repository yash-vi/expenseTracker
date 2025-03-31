import { useContext } from "react";
import ExpOp from "../components/ExpOp";
import { ExpContext } from "../store/exp-context";

const AllExp = () => {

  const expCtx = useContext(ExpContext);
  return (
    <ExpOp expenses={expCtx.expenses} expensePeriod="total" fallbackText="No expenses found."/>
  )
};
export default AllExp;