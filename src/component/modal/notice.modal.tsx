'use client'
import React, { useState, useEffect } from 'react'
import Button from '../input/button'
import store from '@/redux/store'
import { setAlert } from '@/redux/reducer/alertReducer'

const NoticeModal = () => {
  const [currentTheme, setCurrentTheme] = useState<any>(store.getState().theme)
  const [currentNotice, setCurrentNotice] = useState<any>(store.getState().notice)
  const update = () => {
    store.subscribe(() => setCurrentTheme(store.getState().theme))
    store.subscribe(() => setCurrentNotice(store.getState().notice))
  }
  useEffect(() => {
    update()
  })

  return (
    <div className={`ps-f w100p h100p dp-flex fd-col jc-center ta-center filter-brightness-90p zi-2 ${currentNotice.open ? 'trsf-scale-1' : 'trsf-scale-0'}`}>
      <div className={`w100p h-mc mw-575px mg-auto br-5px pd-10px trss-1-2 trss-delay-1-4 ${currentNotice.open ? "" : "trsf-top--100p"} ${currentTheme ? 'themelight' : 'themedark'}`}>
        <p>{currentNotice.msg}</p>
      </div>
    </div>
  )
}

export default NoticeModal