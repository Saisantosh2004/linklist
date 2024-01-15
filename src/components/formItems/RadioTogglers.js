import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette,faImage } from "@fortawesome/free-solid-svg-icons";

export default function RadioTogglers({options,selected,onChange}){
    return(
        <div className="radio-togglers shadow">

            {options.map((op,index)=>
                (
                    <label key={index}>
                        <input 
                            type="radio"  
                            name="bgType" 
                            value={op.value}/>
                        <div>
                            <FontAwesomeIcon icon={op.icon}/>
                            <span>{op.label}</span>
                        </div>
                    </label>
                )
            )}

            

            {/* <label>
                <input type="radio"  name="bgType" value="image"/>
                <div>
                    <FontAwesomeIcon icon={faImage}/>
                    <span>Image</span>
                </div>
            </label> */}


        </div>
    )
}