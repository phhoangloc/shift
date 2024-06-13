'use client'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
type Props = {}

const Header = (props: Props) => {
    const toPage = useRouter()

    const [menuOpen, setMenuOpen] = useState<Boolean>(false)

    return (
        <div className='header'>
            <div className='headerBox'>
                <h1>SHIFT</h1>
                <div className="icon"><MenuIcon onClick={() => setMenuOpen(true)} style={{ width: "100%", height: "100%" }} /></div>
                <div className={`menu ${menuOpen ? "menuOpen" : ""}`}>
                    <div className="icon"><CloseIcon onClick={() => setMenuOpen(false)} style={{ width: "100%", height: "100%" }} /></div>
                    <p onClick={() => toPage.push("/home")}>ホーム</p>
                    <p onClick={() => toPage.push("/home/news")}>お知らせ</p>
                    <p onClick={() => toPage.push("/home/message")}>メッセージ</p>
                    <p onClick={() => toPage.push("/home/service")}>サービス</p>
                    <p onClick={() => toPage.push("/home/about")}>について</p>
                    <p onClick={() => toPage.push("/home/contact")}>問い合わせ</p>
                </div>
            </div>
        </div>
    )
}

export default Header