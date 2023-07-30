import { useState, type FormEvent } from "react";
import { UiInput} from '@uireact/form';


import type { FormState } from "../routes/houses.new";
import type { MaxfriseErrors } from "./dashboard/forms/validator/form-validator-yup";

import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input'
import flags from 'react-phone-number-input/flags'
import en from 'react-phone-number-input/locale/en.json'

interface CreateHouseFormProps {
    formState?: FormState;
    errors: MaxfriseErrors<FormState>;
    onFormFieldChange?: (value: Partial<FormState>) => void;
    onFormSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  }

export const PhoneInputCountries = (props: CreateHouseFormProps) => {
  const { formState, errors, onFormFieldChange, onFormSubmit, onChange} = props;
  const[ country, setCountry] = useState('MX')
  const [selectCountry, setSelectCountry] = useState(false)
  const [callingCode ,setCallingCode] = useState('')

  const handleCountry = (country:any) => {
    const countrySelected = country 
    setSelectCountry(!selectCountry)
    setCountry(countrySelected)
     setCallingCode(getCountryCallingCode(country))

  }

  const handleContriesList = () => {
      setSelectCountry(!selectCountry)
  }

return (
      <div className="w-full items-center justify-between border-2 border-rose-600 border-stone-300 flex flex-row"
            style={{backgroundColor : 'rgba(224, 222, 222)',
                    border : '2px solid rgb(194, 194, 194)'}}>
        <div className=" w-2/12 ">
          <div className="flex items-center justify-between px-10 cursor-pointer"
              onClick={handleContriesList} 
          >
              {!selectCountry ? (
              <img src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`} 
                  style={{ width : '20px'}}/> ) : 'Pais'}
              {selectCountry ? <MdOutlineExpandLess/> : <MdOutlineExpandMore/>}
          </div>
          {selectCountry &&(
              <ul className="w-full overflow-hidden ">
                  {getCountries().filter(somecontries => (
                    somecontries === 'US' || somecontries === 'MX' || somecontries === 'CA'
                  )).map(country => (
                      <li
                        className="  hover:bg-gray-400 pl-2 box-border list-none cursor-pointer flex items-center justify-around "
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
              type="text"
              name="houseFriendlyName"
              onChange={onChange}
              />
          </div>
      </div>
)}
