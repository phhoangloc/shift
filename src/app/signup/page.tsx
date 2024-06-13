
import Signup from '@/component/admin/auth/signup'
import React from 'react'


const page = () => {

    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
            <Signup archive='admin' />
        </div>
    )
}

export default page