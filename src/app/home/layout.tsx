import Footer from '@/component/home/footer'
import Header from '@/component/home/header'
import React from 'react'
import '../../style/home.css'
import DecideModal from '@/component/modal/decide.modal'

type Props = { children: React.ReactNode }

const layout = ({ children }: Props) => {
    return (
        <div>
            <DecideModal submiteText="送信" />
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default layout