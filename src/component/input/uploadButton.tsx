'use client'
import React, { useRef } from 'react'
type Props = {
    icon: React.ReactNode | string;
    size?: number
    func?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadButton = ({ icon, size, func }: Props) => {
    const IconRef = useRef<HTMLInputElement | null>(null)
    return (
        <div style={{ width: "max-content", height: "max-content", cursor: "pointer" }}>
            <input ref={IconRef} type="file" style={{ display: "none" }} onChange={(e) => func && func(e)} multiple={true} />
            <div onClick={() => IconRef.current && IconRef.current.click()} style={{ padding: "5px", width: "100%", height: "100%" }}>{icon}</div>
        </div>
    )
}

export default UploadButton