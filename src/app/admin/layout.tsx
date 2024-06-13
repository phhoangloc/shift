import React from 'react'
import Provider from '@/redux/component/provider'
import Header from '@/component/admin/header'
import '../../style/theme.css'
import '../../style/admin.css'
import Menu from '@/component/admin/menu'
import Authen from '@/component/admin/auth/authen'
type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <Authen>
            <Header />
            <div className='bodypage'>
                <Menu />
                <div className='bodypage_content'>
                    {children}
                </div>
            </div>
        </Authen>
    )
}

export default layout