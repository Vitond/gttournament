import { useReducer, useCallback } from 'react';
import {Context, defaultContextCreator } from './context';
import { actionTypes } from './actionTypes';
import React from 'react';

interface stateInterface {
    schools: string[]
}

export const reducer = (state: stateInterface, action: {type: actionTypes, data: any}) => {
    switch(action.type) {
        case actionTypes.SET_SCHOOLS:
            return {...state, schools: action.data.schools};
        default:
            return state;
    }
};

const ContextProvider: React.FC<{}> = props => {
    const [state, dispatch] = useReducer(reducer, {schools: []});
    const setSchools = useCallback((schools) => {
        dispatch({type: actionTypes.SET_SCHOOLS, data: {schools: schools}})
    }, []);
    const context = {
        state: {
            schools: state.schools
        },
        setSchools: (schools: string[]) => {
            setSchools(schools);
        }
    }
    return <Context.Provider value={context}>{props.children}</Context.Provider>
};

export default ContextProvider;