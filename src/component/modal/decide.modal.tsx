'use client'
import React, { useState, useEffect } from 'react'
import Button from '../input/button'
import store from '@/redux/store'
import { setAlert } from '@/redux/reducer/alertReducer'

type Props = {
  submiteText?: string
}
const DecideModal = ({ submiteText }: Props) => {
  const [currentTheme, setCurrentTheme] = useState<any>(store.getState().theme)
  const [currentAlert, setCurrentAlert] = useState<any>(store.getState().alert)
  const update = () => {
    store.subscribe(() => setCurrentTheme(store.getState().theme))
    store.subscribe(() => setCurrentAlert(store.getState().alert))
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
    zIndex: 2,
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
    <div style={currentAlert.open ? { ...box, ...boxOpen } : { ...box }}>
      <div className={`${currentTheme ? 'light1' : 'dark1'}`}
        style={currentAlert.open ? { ...textBox, ...textBoxOpen } : { ...textBox }}>
        <p>{currentAlert.msg}</p>
        <div style={{ display: "flex", width: "max-content", margin: "5px auto" }}>
          <Button name="キャンセル" onClick={() => store.dispatch(setAlert({ value: false, open: false, msg: "" }))} />
          <Button name={submiteText ? submiteText : "確認"} onClick={() => store.dispatch(setAlert({ value: true, open: false, msg: "" }))} />
        </div>
      </div>
    </div>
  )
}

export default DecideModal