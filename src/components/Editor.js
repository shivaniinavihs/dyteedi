import React , {useState} from 'react'
import "codemirror/lib/codemirror.css"
import "codemirror/theme/material.css"
import "codemirror/mode/css/css"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/xml/xml"
import {Controlled as ControlledEdi} from 'react-codemirror2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt,faExpandAlt } from '@fortawesome/free-solid-svg-icons'



export default function Editor(props) {
    const {
        language,
        dispname,
        value, onChange
    } = props

    const[open, setOpen]= useState(true)
    function handleChange(editor, data, value) {
        onChange(value)
    }
    return (
        <div className={ `edi-container ${open ?'':'collapsed'}`}>
            <div className="edi-title">
                {dispname}
                <button
                    type='button'
                    className="expand-collapse-btn"
                    onClick={()=>setOpen(prevOpen=>!prevOpen)}> 
                    <FontAwesomeIcon icon={ open ? faCompressAlt:faExpandAlt}/></button>
            </div>
            <ControlledEdi
                onBeforeChange={handleChange}
                value={value}
                className="code-mirror-wrapper"
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: 'material',
                    lineNumbers: true
                }}

            />

        </div>
    )
}
