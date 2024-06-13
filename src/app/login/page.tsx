import Login from '@/component/admin/auth/login'
import React from 'react'


const page = () => {
    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
            <Login archive='admin' />
        </div>
    )
}

export default page