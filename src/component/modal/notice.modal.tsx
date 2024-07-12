'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'

const NoticeModal = () => {
  const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
  const [currentNotice, setCurrentNotice] = useState<any>(store.getState().notice)
  const update = () => {
    store.subscribe(() => setCurrentTheme(store.getState().theme))
    store.subscribe(() => setCurrentNotice(store.getState().notice))
  }
  useEffect(() => {
    update()
  })

  const box: React.CSSProperties = {
    position: "fixed",
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    backdropFilter: "blur(1px) brightness(0.9)",
    zIndex: 3,
    transform: "scale(0)"
  }

  const boxOpen: React.CSSProperties = {
    transform: "scale(1)",

  }

  const textBox: React.CSSProperties = {
    height: "max-content",
    width: "100%",
    margin: "auto",
    maxWidth: "575px",
    borderRadius: "5px",
    padding: "10px",
    transition: "all 0.25s",
  }

  const textBoxOpen: React.CSSProperties = {
    transform: "inherit",

  }

  return (
    <div style={currentNotice.open ? { ...box, ...boxOpen } : { ...box }}>
      <div className={`${currentTheme ? 'light1' : 'dark1'}`}
        style={currentNotice.open ? { ...textBox, ...textBoxOpen } : { ...textBox }}>
        <p>{currentNotice.msg}</p>
      </div>
    </div>
  )
}

export default NoticeModal