import React from "react";
import s from "./Button.module.css"
export type PropsType = {
    callBack: ()=>void
    title:string
    disabled:boolean

}

export function Button (props:PropsType) {
    return (
        <button className={s.buttonStyle}  disabled={props.disabled} onClick={()=> props.callBack()}>
            {props.title}
        </button>
    )
}