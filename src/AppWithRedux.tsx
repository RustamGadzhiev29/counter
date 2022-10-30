import React, {useEffect} from 'react';
import './App.css';

import {SettingDisplay} from "./components/counterSetting/SettingDisplay";
import {Display} from "./components/counter/Display";
import {Button} from "./components/Button/Button";
import {
    ChangeMaxValueAC, ChangeStartValueAC,
    IncDataAC,
    OnSetValueAC, ResDataAC,

} from "./state/counter-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export type StateType = {
    startValue: number
    maxValue: number
    count: number
    counterMessage: 'press set' | 'incorrect number' | null
    resDisable: boolean
    setDisable: boolean
    incDisable: boolean
}
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;


function AppWithRedux() {

    const dispatch = useDispatch<TypedDispatch>() // типизировал диспач из https://github.com/reduxjs/redux-toolkit/issues/587

    const state = useSelector<AppRootStateType, StateType>(state => state.counter)

    // при загрузке приложения стартовое, максимальное и текущее значения получаются из localstorage
    // useEffect(() => {
    //     dispatch(SetDataFromLocalstorageThunkCreator())
    // }, [])

// счетчик
    let incData = () => {
        dispatch(IncDataAC())
    }
    // сброс настроек setting
    let resData = () => {
        dispatch(ResDataAC())
    }

    // изменение максимального значения в settings
    let changeMaxValue = (maxValue: number) => {
        dispatch(ChangeMaxValueAC(maxValue))
    }
// изменение стартового значения в settings
    let changeStartValue = (startValue: number) => {
        dispatch(ChangeStartValueAC(startValue))
    }
    // обработчик для кнопки set в settings
    let onSetValue = () => {
        dispatch(OnSetValueAC())
    }
    return (
        <div className="appWrapper">
            <div className="counterSettings">
                <div>
                    <SettingDisplay
                        startValue={state.startValue}
                        maxValue={state.maxValue}
                        onChangeMaxValue={changeMaxValue}
                        onChangeStartValue={changeStartValue}
                    />
                </div>
                <div className="buttonBlock">
                    <Button
                        callBack={() => onSetValue()}
                        title={"Set"}
                        disabled={state.setDisable}/>
                    {/*<ButtonSet disable={state.setDisable} value={"Set"} displayValue={state.count}*/}
                    {/*           onSetValue={onSetValue}/>*/}
                </div>
            </div>
            <div className="Counter">
                <div>
                    <Display maxValue={state.maxValue}
                             displayValue={state.count}
                             counterMessage={state.counterMessage}/>
                </div>
                <div className="buttonBlock">
                    <Button
                        callBack={() => incData()}
                        title={"Inc"}
                        disabled={state.incDisable}/>
                    <Button
                        callBack={() => resData()}
                        title={"Reset"}
                        disabled={state.resDisable}
                    />
                </div>
            </div>

        </div>
    );
}

export default AppWithRedux;
