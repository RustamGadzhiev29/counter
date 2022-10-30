import React from "react";
import s from "../counter/Display.module.css"

type DisplayPropsType = {
    displayValue: number
    maxValue: number
    counterMessage: 'press set' | 'incorrect number' | null
}

export function Display(props: DisplayPropsType) {
    const classOfDisplay = () => {
        if (props.displayValue === props.maxValue
            || props.counterMessage === 'incorrect number'
            || props.displayValue < 0)
        {
            return s.maxCountStyle
        }
        if (props.counterMessage === 'press set') {
            return s.valueStyle
        } else return s.valueStyle
    }
    return (
        <div className={s.countStyle} >
            <div className={classOfDisplay()}>
                {props.counterMessage ? props.counterMessage : props.displayValue}
            </div>
        </div>
    )
}