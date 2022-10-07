import React from 'react';
import '../../src/index.scss';
function Item(props){
const [value,setValue]=React.useState("3000000");
const [pay,setPay]=React.useState("30");
const [time,setTime]=React.useState("10");

function handleClick(e){
    setValue(e.target.value);
    const val=e.target.value;
    console.log(e);
}

function handlePay(e){
    setPay(e.target.value);
    const pay=e.target.value;
    console.log(e);
}

function handleTime(e){
    setTime(e.target.value);
    
}

    return (
        <div className='lizing'>
            <div className='lizing__item'>
                <label>Желаемая сумма кредита</label>
                <input type="number" value={value} onChange={handleClick} className="lizing__input" />
                <input className='lizing__range' type="range" value={value} min="1000000" max="6000000" onChange={(handleClick)}/>
            </div>
            {/* <h1>{pay}</h1> */}
            <div className='lizing__item'>
            <label>Первоначальный взнос</label>
            <input className="lizing__input" type="number" value={value*pay/100} onChange={()=>{}} />
            <input className='lizing__range' type="range"  value={pay} min="10" max="60" onChange={handlePay}/>
            <input className="lizing__input" type="number" value={pay} onChange={handlePay}></input>
            </div>
            
            <label>Срок лизинга</label>
            <input className="lizing__input" type="number" value={time} onChange={handleTime} />
            <input className='lizing__range' type="range" value={time} min="1" max="60" onChange={handleTime}/>


        </div>
    )
}

export default Item;