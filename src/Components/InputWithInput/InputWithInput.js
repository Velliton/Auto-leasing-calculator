import React from "react";
import "./InputWithInput.scss";

export const InputWithInput = ({
    title,
    postfix,
    postfixSecond,
    nameSecond,
    nameFirst,
    nameRange,
    placeholder = "Введите значение",
    valueFirst,
    valueSecond,
    min,
    max,
    onChange,
    onSecondInputKeyDown,
    onBlur
})=>{

    return <div className="lizing__item">
            <label className="lizing__title">{title}</label>
                <input   
                    className="lizing__input"
                    name={nameFirst}
                    type="number"
                    placeholder="взнос"
                    value={valueFirst}
                    readOnly
                />
                <span className="lizing__currencyf">{postfix}</span>
                <input
                    className="lizing__input-in"
                    type="text"
                    maxLength="2"
                    name={nameSecond}
                    placeholder={placeholder}
                    value={valueSecond}
                    onChange={onChange}
                    onBlur={onBlur}
                    onKeyDown={onSecondInputKeyDown}
                />
                <span className="lizing__currency">{postfixSecond}</span>
                <input
                    className="lizing__range"    
                    type="range"
                    name={nameRange}
                    min={min}
                    max={max}
                    value={valueSecond}
                    onChange={onChange}
                />
            
            
        </div>
}