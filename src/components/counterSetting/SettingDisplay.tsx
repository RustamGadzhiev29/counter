import React, {ChangeEvent} from "react";
import s from "../counterSetting/CounterSetting.module.css"

type DisplayPropsType = {
    onChangeMaxValue: (maxValue: number) => void
    onChangeStartValue: (onsetValue: number) => void
    startValue: number
    maxValue: number
}

export function SettingDisplay(props: DisplayPropsType) {
//
    const onChangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeMaxValue(e.currentTarget.valueAsNumber)
    }
    const onChangeStartValue = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeStartValue(e.currentTarget.valueAsNumber)
    }
    const inputErrorStyle = props.maxValue <= props.startValue || props.maxValue <= 0 || props.startValue < 0 ? s.inputError : s.input

    return (
        <div className={s.counterSettings}>
            <div className={s.inputBlock}>
                 <span>
            max value:
                <input value={props.maxValue} className={inputErrorStyle} onChange={onChangeMaxValue} type={'number'} max={'99'}
                       min={'-99'}/>
            </span>
                <span>
            start value:
            <input value={props.startValue} className={inputErrorStyle} onChange={onChangeStartValue} type={'number'} max={'99'}
                   min={'-99'}/>
            </span>
            </div>
        </div>
    )
}