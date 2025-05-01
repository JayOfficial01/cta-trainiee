/* eslint-disable react/prop-types */

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"


function Input(props) {
    const { label, type, children, ...otherInputsProps } = props
    const [showPassword, isShowPassword] = useState(false)

    return (
        <article className="flex flex-col gap-2">
            <label className="text-white">{label}</label>
            {children ? children : <article className="w-full bg-white rounded-md flex items-center p-1 px-3">
                <input type={type == "password" ? showPassword ? "text" : type : type} placeholder={label} className=" p-2 w-full outline-none text-black flex-1" {...otherInputsProps} />
                {type == 'password' && <span className="cursor-pointer" onClick={() => isShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} className="text-gray-500" /> :
                        <Eye size={20} className="text-gray-500" />}
                </span>}
            </article>}
        </article>
    )
}

export default Input