import { useState, useContext, useEffect } from "react";
import ExpOp from "../components/ExpOp";
import { ExpContext } from "../store/exp-context";
import { getDateMinusDays } from "../util/date";
import { fetchExp } from "../util/http";
import Loading from "../ui/Loading";
import Error from "../ui/Error";

const RecentExp = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(undefined);
  const expCtx = useContext(ExpContext);
  
  useEffect(() => {
      const getExp = async () => {
        try {
          const expenses = await fetchExp();
          expCtx.setExp(expenses);
        } catch(error) {
          setError('Could not fetch expenses!');
        }
      setIsFetching(false);
    }
    getExp();
  }, []);


  if (error && !isFetching)
  {
    return <Error message={error} />
  } 

  if (isFetching) {
    return <Loading />;
  }

  const recExp = expCtx.expenses.filter((exp) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return (exp.date >= date7DaysAgo) && (exp.date < today);
  });

  return (
    <ExpOp expenses={recExp} expensePeriod="last 7 days" fallbackText="No expenses registered recently."/>
  );
}
export default RecentExp;