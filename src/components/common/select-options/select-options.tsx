import React, { CSSProperties, useEffect, useState, useRef, useContext } from "react";
import ArrowUpIcon from "../../../assets/icons/arrow-up.svg";
import ArrowDownIcon from "../../../assets/icons/arrow-down.svg";

import "./select-options.scss";
import { useDivTagListener } from "../../../utils/div-tags-listener";
import { IImplementation, ISetTitle } from "../../interfaces/EZInterface";
import { ActionCtx } from "../../form";

const initialTitle: ISetTitle = {
    show: false,
    text: ""
}

const initialImplementation: IImplementation = {
    required: false,
    errorText: ""
}

interface EZSelectTypeCheck {name?: string, placeholder?: string, setTitle?: ISetTitle, data: any, implementation?: IImplementation};

export default function EZSelect({name, placeholder = "", setTitle = initialTitle, data, implementation = initialImplementation}: EZSelectTypeCheck) {
    const wrapperRef = useRef(null);
    const allowClose = useDivTagListener(wrapperRef);

    const [selected, setSelected] = useState("");
    const [isShow, setIsShow] = useState(false);

    const showOptions = (mode: boolean) => {
        setIsShow(mode);
    }

    const [setNetwork] = useContext(ActionCtx);

    useEffect(() => {
        if(allowClose) {
            setIsShow(false)
        } else {
            return
        }
    }, [allowClose])

    const onChangeHandler = async (e: any) => {
        (document.getElementById('tester') as HTMLInputElement).value = e;
        (document.getElementById('tester') as HTMLInputElement).dispatchEvent(new Event('change', {bubbles: true}));
    }
    
    return (
        <div className="root" ref={wrapperRef}>
            {setTitle.show &&
                <div className="title-placement">{setTitle.text}{implementation.required && <span className="text-required">*</span>}</div>
            }
            <div className="ez-div-select">
            <input readOnly 
            // {...register(name, {
            //     required: implementation.required
            // })} 
            placeholder={placeholder} id="tester" value={selected} className="injectable-select-options" onClick={() => showOptions(!isShow)} />
            {!isShow && <div className="icon-position"><ArrowUpIcon/></div>}
            {isShow && <div className="icon-position"><ArrowDownIcon/></div>}
            </div>
            {isShow &&
            <div className="drop-down">
                {Object.values(data).map((item: any, index: number) =>
                    <div className="injectable-select-options-dropdown"
                        key={index}
                        onClick={() => {
                            setSelected(item);
                            setNetwork(item);
                            setIsShow(false);
                            onChangeHandler(item)
                        }}
                    >{item}</div>
                )}
            </div>
            }
        </div>
        // <input 
        //     className="injectable-input"
        //     placeholder={placeholder}
        // />
    )
}