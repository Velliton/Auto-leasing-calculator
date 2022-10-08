import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

import {ReactComponent as LoaderIcon} from "../../assets/loader.svg"

import {InputWithRange} from "../InputWithRange"
import {InputWithInput} from "../InputWithInput"

const initFormData = {
  price: 3000000,
  initialPercent: 10,
  months: 10
  };


const Loader = ()=>(
  <div className="btn__loader spin"><LoaderIcon/></div>
);

export default function LeasingForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [leasingInfo, setLeasingInfo] = React.useState(initFormData);
  const [initialVal, setInitialVal] = React.useState(initFormData.price/initFormData.initialPercent);


  const {months, price, initial, initialPercent} = leasingInfo;

  const perMonthPayment = (price-initialVal)*((0.035*Math.pow((1+0.035),months))/(Math.pow((1+0.035),months)-1));
  const perMonthPaymentRounded = parseFloat(perMonthPayment.toFixed(2))
  const sumContractRounded = parseFloat((initialVal+months*perMonthPayment).toFixed(2));


  const handleChange = (e) => {
    const {target: {name, value, type}} = e;
    // const {target} = e;
    // let {name, value, type} = target;

    if (name === "initialPercent" && type === "range") {
      calcInitialPayment(leasingInfo.price, value);
    }

    if (name === "initialPersent" && type === "number") {
      calcInitialPayment(leasingInfo.price, value);
    }
    
    if (name === "price" && type === "range") {
      calcInitialPayment(value, leasingInfo.initialPercent);
    }

    setLeasingInfo((prevState)=>{
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
 

    calcInitialPayment(value, leasingInfo.initialPercent);

    setLeasingInfo({ ...leasingInfo, price: value });
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

    calcInitialPayment(leasingInfo.price, value);

    setLeasingInfo({ ...leasingInfo, initialPercent: value });
  }

  const handleOnBlurTime = (e) => {
    let {target: {name, value}} = e;

    if (name === "months") {
      if (!value) {
        value = 1000000;
      }
      
      if (parseFloat(value) > 60) {
        value = 60;
      }
    }

    calcInitialPayment(value, leasingInfo.initialPercent);

    setLeasingInfo({ ...leasingInfo, months: value });
  }



  const calcInitialPayment = (price, initialPercent) => {
    setInitialVal(initialPercent * price/100);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(leasingInfo);

    setTimeout(()=>{
      axios.post('https://eoj3r7f3r4ef6v4.m.pipedream.net', leasingInfo, 
        { headers: {'content-type': 'application/json'} }
      )
      .then((resp) => {
        setLeasingInfo(initFormData);
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
          title: 'К сожалению, возникла ошибка',
          text: response?.data
        })
      })
      .finally(()=>{
        setIsLoading(false);
      });
    }, 7000)
  };



  return (
    <div>
      <form onSubmit={handleSubmit} className={isLoading ? "is-loading leasing" : "leasing"}>
        <div className="leasing__name">
          <h3>Рассчитайте стоимость автомобиля в лизинг</h3>
        </div>
        <div className="leasing__content">
       
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
            isLoading={isLoading}
          />
        
          <InputWithInput 
              isLoading={isLoading}
              
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
            isLoading={isLoading}
            title="Срок кредита"
            name="months"
            postfix="мес."
            placeholder="срок"
            value={leasingInfo.months}
            min="1"
            max="60"
            onChange={handleChange}
          />
        </div>
            
        <div className="leasing__footer">
          <div className="leasing__payment">
            <p className="leasing__title">Cумма договора лизинга</p>
            <p className="leasing__sum">{sumContractRounded}<span className="leasing_sumspan">&#8381;</span></p>
            
          </div>

          <div className="leasing__payment">
            <p className="leasing__title">Ежемесячный платёж от</p>
            <p className="leasing__sum">{perMonthPaymentRounded}<span className="leasing_sumspan">&#8381;</span></p>
          </div>
          <div className="leasing__button">
            <button className={isLoading?"leasing__btn leasing__btn-disabled":"leasing__btn"} disabled={isLoading}>{isLoading ? <Loader/>: "Оставить заявку" }</button>
          </div>
        </div> 
        

        
      </form>

      

    </div>
  );
  }