import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

import {ReactComponent as LoaderIcon} from "../assets/loader.svg"

import {InputWithRange} from "../Components/InputWithRange"
import {InputWithInput} from "../Components/InputWithInput"

const initFormData = {
  price: 3000000,
  initialPercent: 10,
  months: 10,
  sumContractRounded:0,
  perMonthPaymentRounded:0
  };


const Loader = ()=>(
  <div className="btn__loader spin"><LoaderIcon/></div>
);

export default function UserForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [lizingInfo, setLizingInfo] = React.useState(initFormData);
  const [initialVal, setInitialVal] = React.useState(initFormData.price/initFormData.initialPercent);


  const {months, price, initial, initialPercent} = lizingInfo;

  const perMonthPayment = (price-initialVal)*((0.035*Math.pow((1+0.035),months))/(Math.pow((1+0.035),months)-1));
  const perMonthPaymentRounded = parseFloat(perMonthPayment.toFixed(2))
  const sumContractRounded = parseFloat((initialVal+months*perMonthPayment).toFixed(2));
  

  const handleChange = (e) => {
    const {target: {name, value, type}} = e;
    // const {target} = e;
    // let {name, value, type} = target;

    if (name === "initialPercent" && type === "range") {
      calcInitialPayment(lizingInfo.price, value);
    }
    
    if (name === "price" && type === "range") {
      calcInitialPayment(value, lizingInfo.initialPercent);
    }

    setLizingInfo((prevState)=>{
      return { ...prevState, [name]: parseFloat(value || 0) }
    });
  };

  const handleOnBlurPrice = (e) => {
    let {target: {name, value}} = e;

    if (name === "price") {
      if (!value || parseFloat(value) < 1000000) {
        value = 1000000;
      }
      
      if (parseFloat(value) > 6000000) {
        value = 6000000;
      }
    }

    calcInitialPayment(value, lizingInfo.initialPercent);

    setLizingInfo({ ...lizingInfo, price: value });
  }

  const handleOnBlurPercent = (e) => {
    let {target: {name, value}} = e;

    if (name === "initialPercent") {
      if (!value || parseFloat(value) < 10) {
        value = 10;
      }
      
      if (parseFloat(value) > 60) {
        value = 60;
      }
    }

    calcInitialPayment(lizingInfo.price, value);

    setLizingInfo({ ...lizingInfo, initialPercent: value });
  }

  const calcInitialPayment = (price, initialPercent) => {
    setInitialVal(initialPercent * price/100);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(lizingInfo);

    setTimeout(()=>{
      axios.post('https://eoj3r7f3r4ef6v4.m.pipedream.net', lizingInfo, 
        { headers: {'content-type': 'application/json'} }
      )
      .then((resp) => {
        setLizingInfo(initFormData);
        setInitialVal( initFormData.price/initFormData.initialPercent);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          
        })
      })
      .catch(({response}) => {
        console.log(response);
        Swal.fire({
          icon: 'error',
          title: 'Ой...',
          text: response?.data
        })
      })
      .finally(()=>{
        setIsLoading(false);
      });
    }, 1000)
  };



  return (
    <div>
      <form onSubmit={handleSubmit} className={isLoading ? "is-loading lizing" : "lizIng"}>
        <div className="lizing__name">
          <h3>Рассчитайте стоимость автомобиля в лизинг</h3>
        </div>
        <div className="lizing__content">
        
          <InputWithRange
            title="Желаемая сумма кредита"
            postfix="&#8381;"
            name="price"
            placeholder="сумма"
            value={price}
            min="1000000"
            max="6000000"
            onBlur={handleOnBlurPrice}
            onChange={handleChange}
          />
        
          <InputWithInput
              title="Первоначальный взнос"
              postfix="&#8381;"
              postfixSecond="%"
              nameFirst="initial"
              nameSecond="initialPercent"
              nameRange="initialPercent"
              placeholder="взнос"
              valueFirst={initialVal}
              valueSecond={initialPercent}
              min="10"
              max="60"
              onBlur={handleOnBlurPercent}
              onSecondInputKeyDown={(e)=>{
                if (e.key === 'Enter') {
                    e.preventDefault()
                }
              }}
              onChange={handleChange}
            /> 

        <InputWithRange
            title="Срок кредита"
            name="months"
            postfix="мес."
            placeholder="срок"
            value={lizingInfo.months}
            min="1"
            max="60"
            onChange={handleChange}
          />
        </div>
        
        <div className="lizing__footer">
          <div className="lizing__payment">
            <p className="lizing__title">Cумма договора лизинга</p>
            <p className="lizing__sum">{sumContractRounded} <span className="lizing_sumspan">&#8381;</span></p>
          </div>

          <div className="lizing__payment">
            <p className="lizing__title">Ежемесячный платёж от</p>
            <p className="lizing__sum">{perMonthPaymentRounded}<span className="lizing_sumspan">&#8381;</span></p>
          </div>
          <div>
          <button className="lizing__btn" >{isLoading ? <Loader/>: "Оставить заявку" }</button>
          </div>
        </div> 
        

        
      </form>

     {/*  <div className="cont">
        <input className="lizing__input1" type="text" value="777"></input>
        <span className="txt">111</span>
        <input className="lizing__input2" type="text"></input>
        <span className="txt2">777</span>
      </div> */}
      

    </div>
  );
  }