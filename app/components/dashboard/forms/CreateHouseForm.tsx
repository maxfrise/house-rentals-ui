import { useState, type FormEvent, useEffect } from "react";
import { Form } from "@remix-run/react";

import { UiButton } from "@uireact/button";
import type { UiSpacingProps } from "@uireact/foundation";
import { UiSpacing } from "@uireact/foundation";
import { UiInput, UiTextArea, UiSelect} from '@uireact/form';
import { UiInputProps, privateInputProps } from './types';


import type { FormState } from "../../../routes/houses.new";
import type { MaxfriseErrors } from "./validator/form-validator-yup";


import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input'

import { MdOutlineExpandMore, MdOutlineExpandLess} from "react-icons/md";
import { TbWorldSearch } from "react-icons/tb";
import { string } from "yup";



interface CreateHouseFormProps {
  formState?: FormState;
  errors: MaxfriseErrors<FormState>;
  onFormFieldChange?: (value: Partial<FormState>) => void;
  onFormSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

const submitButtonSpacing: UiSpacingProps['padding'] = { block: 'four' };

/* C O U N T R Y   F L A G S */
interface CountryFlagsProps {
  formState?: FormState;
  error?: string;
  value? : string ;
  onChange? : (e : FormEvent<HTMLInputElement> ) => void;
  label : string;
  theme : any;
  onFormFieldChange : any;
  countrieCodeName : string;
  phoneName : string
}

const PhoneInputCountries = (props : CountryFlagsProps) => {
  const {formState, error, phoneName,countrieCodeName,onChange, label,theme,onFormFieldChange, value} = props;

  const [countrie, setCountrie] = useState('')
  const [selectCountry, setSelectCountry] = useState(false)
  const [callingCode,setCallingCode] = useState('')


  const handleCountry = (country:any) => {
    const countrySelected = country
    const code = getCountryCallingCode(country)
    setSelectCountry(!selectCountry)
    setCountrie(countrySelected)
    setCallingCode(code)
  }

  useEffect(()=>{
    onFormFieldChange({ [countrieCodeName] : callingCode})
  },[selectCountry])

 
  const handleContriesList = () => {
      setSelectCountry(!selectCountry)
  }

  

return (
  <>
    <label style={{fontSize : '14px'}}>{label}</label>
    <div className="w-full items-center justify-between border-2 border-rose-600 border-stone-300 flex flex-row"
            style={{backgroundColor : 'rgba(224, 222, 222)',
                    border : '2px solid rgb(194, 194, 194)'}}>
        <div className=" w-2/12 ">
          <div className="flex items-center justify-between px-10 cursor-pointer"
              onClick={handleContriesList} 
          >
            {countrie ?
              ( 
                <>
                 <img src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countrie}.svg` } 
                  style={{ width : '20px'}}/> 
                {!selectCountry ? <MdOutlineExpandMore/> : <MdOutlineExpandLess/>}
                </>

          
               ) : (  
                    <>
                      <TbWorldSearch size={20}/>
                      {!selectCountry ? <MdOutlineExpandMore/> : <MdOutlineExpandLess/> }
                    </>
                )} 
            
          </div>
          {selectCountry &&(
              <ul className="w-full overflow-hidden ">
                  {getCountries().filter(somecontries => (
                    somecontries === 'US' || somecontries === 'MX' || somecontries === 'CA'
                  )).map(country => (
                      <li
                        className="  hover:bg-gray-400 px-2 box-border list-none cursor-pointer   flex  justify-between "
                        key={country} 
                        value={country}
                        onClick={() => handleCountry(country)}
                      >
                          <img src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`} 
                              style={{ width : '20px' , left:'8px' , top:'5px'}}
                          /> 
                          <p>+ {getCountryCallingCode(country)}</p>
                      </li>
                  ))}
              </ul>
            )} 
          </div>
          <div className="w-10/12 ">
            <UiInput
                name={phoneName}
                value={value}
                onChange={onChange}
                error ={error}
                theme={theme}
            />
          </div>
          <input
              name={countrieCodeName}
              type="hidden"
              value={formState?.[countrieCodeName]}
            />
      </div>
  </>
      
)}

  
/* C O U N T R Y   F L A G S */


  

export const CreateHouseForm = (props: CreateHouseFormProps) => {
  const { formState, errors, onFormFieldChange, onFormSubmit } = props;

  const onChange = (e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => { 
    onFormFieldChange?.({ [e.currentTarget.name]: e.currentTarget.value });
  }

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
      onSubmit={onFormSubmit}
    >
      <UiInput
        label="Nombre de la propiedad"
        labelOnTop
        name="houseFriendlyName"
        value={formState?.houseFriendlyName}
        onChange={onChange}
        error={errors?.houseFriendlyName}
        theme={errors?.houseFriendlyName ? 'error' : undefined}
      />
      <UiTextArea
        label="Descripción de la propiedad"
        labelOnTop
        name="details"
        onChange={onChange}
        value={formState?.details}
        error={errors?.details}
        theme={errors?.details ? 'error' : undefined}
        rows={10}
      />
      <UiInput
        label="Nombre del arrendador"
        labelOnTop
        name="landlordName"
        value={formState?.landlordName}
        onChange={onChange}
        error={errors?.landlordName}
        theme={errors?.landlordName ? 'error' : undefined}
      />
      
      <PhoneInputCountries 
        countrieCodeName="LandlordCountriePhone"
        label= 'Telefono del arrendador'
        value={formState?.landlordPhone}
        onChange={onChange}
        error={errors?.landlordPhone}
        theme={errors?.landlordPhone ? 'error' : undefined}
        formState={formState}
        onFormFieldChange = {onFormFieldChange}
        phoneName='landlordPhone'
      />
    
      <UiInput
        label="Direccion de la casa"
        labelOnTop
        name="address"
        value={formState?.address}
        onChange={onChange}
        error={errors?.address}
        theme={errors?.address ? 'error' : undefined}
      />
      <UiInput
        label="Nombre del arrendatario"
        labelOnTop
        name="tenantName"
        value={formState?.tenantName}
        onChange={onChange}
        error={errors?.tenantName}
        theme={errors?.tenantName ? 'error' : undefined}
      />

      <PhoneInputCountries 
        countrieCodeName="tenantCountriePhone"
        label= 'Telefono del arrendatario'
        value={formState?.tenantPhone}
        onChange={onChange}
        error={errors?.tenantPhone}
        theme={errors?.tenantPhone ? 'error' : undefined}
        formState={formState}
        onFormFieldChange = {onFormFieldChange}
        phoneName="tenantPhone"
      />
      <UiButton type="submit">
        <UiSpacing padding={submitButtonSpacing}>
          Guardar
        </UiSpacing>
      </UiButton>
    </Form>
  );
};
