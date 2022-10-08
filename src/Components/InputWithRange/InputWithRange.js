import React from "react";


import "./InputWithRange.scss";

export const InputWithRange = ({
    title,
    postfix,
    name,
    placeholder = "Введите значение",
    value,
    min,
    max,
    onBlur,
    onChange,
    isLoading,
  
    })=>{

    return <div className={isLoading?"leasing__item leasing__item-disabled":"leasing__item"}>
        <label className="leasing__title" >{title}</label>
        
        
            <input   
                disabled={isLoading}             
                min={min}
                max={max}
                className="leasing__input"
                type="text"
                maxLength="7"
                name={name}
                placeholder={placeholder}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
            />
            <span className="leasing__currency">{postfix}</span>
        
        
        <input
            disabled={isLoading}
            className="leasing__range"
            type="range"
            name={name}
            min={min}
            max={max}
            value={value}
            onChange={onChange}
        />
        


    </div>
}


