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
    onBlur,
    isLoading
})=>{

    return <div className={isLoading?"leasing__item leasing__item-disabled":"leasing__item"}>
            <label className="leasing__title">{title}</label>
                <input
                    disabled={isLoading} 
                    className="leasing__input"
                    name={nameFirst}
                    type="number"
                    placeholder="взнос"
                    value={valueFirst}
                    readOnly
                />
                <span className="leasing__currencyf">{postfix}</span>
                
                <input
                    disabled={isLoading}
                    className="leasing__input-in"
                    type="text"
                    maxLength="2"
                    name={nameSecond}
                    placeholder={placeholder}
                    value={valueSecond}
                    onChange={onChange}
                    onBlur={onBlur}
                    onKeyDown={onSecondInputKeyDown}
                />
                
                <span className="leasing__currency">{postfixSecond}</span>
                <input
                    disabled={isLoading}
                    className="leasing__range"    
                    type="range"
                    name={nameRange}
                    min={min}
                    max={max}
                    value={valueSecond}
                    onChange={onChange}
                />
            
            
        </div>
}