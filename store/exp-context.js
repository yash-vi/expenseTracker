import { createContext, useReducer } from "react";

export const ExpContext = createContext({
    expenses: [],
    addExp: ({description, amount, date}) => {},
    setExp: (expenses) => {},
    delExp: ({id}) => {},
    updateExp: (id, {description, amount, date}) => {},
});

const expReducer = (state, action) => {
    switch(action.type) {
        case 'ADD':
            return [action.payload ,...state]

        case 'SET': 
            const inverted = action.payload.reverse();
            return inverted;

        case 'UPDATE':
            const updateableExpIndex = state.findIndex((exp) => exp.id === action.payload.id);
            const updateableExp = state[updateableExpIndex];
            const updatedItem = {...updateableExp, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updateableExpIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((exp) => exp.id !== action.payload);

        default:
            return state;

    }
}

const ExpContextProvider = ({children}) => {
    const [expState, dispatch] = useReducer(expReducer, []);

    const addExp = (expData) => {
        dispatch({type: 'ADD', payload: expData});
    }
    const setExp = (expenses) => {
      dispatch ({type: 'SET', payload: expenses});
    }
    const delExp = (id) => {
        dispatch({type: 'DELETE', payload: id});
    }
    const updateExp = (id, expData) => {
        dispatch({type: 'UPDATE', payload: {id: id, data: expData}});
    }

    const value = {
        expenses: expState,
        setExp: setExp,
        addExp: addExp,
        delExp: delExp,
        updateExp: updateExp
    };

    return <ExpContext.Provider value={value}>
        {children}
    </ExpContext.Provider>
}

export default ExpContextProvider;