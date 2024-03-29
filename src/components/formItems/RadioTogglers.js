import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette,faImage } from "@fortawesome/free-solid-svg-icons";

export default function RadioTogglers({options,defaultValue,onChange}){
    return(
        <div className="radio-togglers shadow">

            {options.map((option,index)=>
                (
                    <label key={index}>
                        <input 
                            type="radio"  
                            name="bgType"
                            onClick={ev => onChange(ev.target.value)}
                            defaultChecked={defaultValue === option.value}
                            value={option.value}/>
                        <div>
                            <FontAwesomeIcon icon={option.icon}/>
                            <span>{option.label}</span>
                        </div>
                    </label>
                )
            )}

        </div>
    )
}