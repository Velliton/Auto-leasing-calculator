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
    })=>{

    return <div className="lizing__item">
        <label className="lizing__title" >{title}</label>
        
        
            <input 
                
                className="lizing__input"
                type="text"
                maxLength="7"
                name={name}
                placeholder={placeholder}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
            />
            <span className="lizing__currency">{postfix}</span>
        
        
        <input
            className="lizing__range"
            type="range"
            name={name}
            min={min}
            max={max}
            value={value}
            onChange={onChange}
        />
        


    </div>
}


