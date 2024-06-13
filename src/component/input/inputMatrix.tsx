import React, { useEffect, useRef, useState } from 'react'
import TextArea from './textarea'
import Input from './input'
// import store from '@/redux/store'
// import { color } from '@/style/theme'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
type Props = {}

const InputMatrix = (props: Props) => {

    // // const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    // const update = () => {
    //     store.subscribe(() => setCurrentTheme(store.getState().theme))
    // }
    // update()

    const inputRef = useRef<any>("")
    const inputRefEdit = useRef<any>("")

    const [row, setRow] = useState<number>(-1)
    const [data, setData] = useState<any[]>([])
    const [r1, setR1] = useState<string>("")
    const [r1edit, setR1Edit] = useState<string>("")
    const [r2, setR2] = useState<string>("")
    const [change, setChange] = useState<number>(0)
    const [r2edit, setR2Edit] = useState<string>("")

    const AddRow = (a: string, b: string) => {
        const body = { r1: a, r2: b }
        setData(p => [...p, body])
        setR1("")
        setR2("")
        setChange(p => p + 1)
    }
    const RemoveRow = (index: number) => {
        setData(p => p.filter((item: any, i: number) => i !== index))
    }
    const editRow = (a: string, b: string, i: number) => {
        const body = { r1: a, r2: b }
        const newData = [...data];
        newData[i] = body;
        setData(newData)
        setR1Edit("")
        setR2Edit("")
        setRow(-1)
    }

    useEffect(() => {
        setR1Edit("")
        setR2Edit("")
    }, [row])

    useEffect(() => {
        inputRef.current ? inputRef.current.innerHTML = `${r2}` : "null"
        inputRefEdit.current ? inputRefEdit.current.innerHTML = `${r2edit}` : "null"
    }, [row])

    const flexbox: React.CSSProperties = {
        display: "flex",
        marginTop: "5px"
    }
    const inputbox: React.CSSProperties = {
        width: "30%",
        maxWidth: "150px"
    }
    const inputtextareabox: React.CSSProperties = {
        width: "60%",
    }
    const button: React.CSSProperties = {
        width: "40px",
        height: "40px",
        lineHeight: "50px",
        // background: color.main,
        borderRadius: "5px",
        textAlign: "center",
        padding: "7.5px",
        boxSizing: "border-box",
        margin: "auto 5px 2.5px ",
        cursor: "pointer",
    }
    return (
        <div>
            {
                data.map((item, index) =>
                    <div style={flexbox} key={index}>
                        <div style={inputbox}>
                            <Input
                                name="title"
                                onfocus={() => { setRow(index), setR1Edit(item.r1) }}
                                onChange={(e) => setR1Edit(e)}
                                value={row === index && r1edit || item.r1} />
                        </div>
                        <div style={inputtextareabox}>
                            <TextArea name="content" value={item.r2} onChange={(v) => { setR2Edit(v), setRow(index) }} n={change} onFocus={() => setChange(c => c + 1)} />
                        </div>
                        {r1edit && r2edit && row === index && <CheckIcon style={button} onClick={() => editRow(r1edit, r2edit, index)} />}
                        <RemoveIcon style={button} onClick={() => RemoveRow(index)} />
                    </div>)
            }
            <div style={flexbox}>
                <div style={inputbox}>
                    <Input name="title" onfocus={() => setRow(-1)} onChange={(e) => setR1(e)} value={r1} />
                </div>
                <div style={inputtextareabox}>
                    <TextArea name="content" value={r2} onChange={(v) => { setR2(v), setRow(-1) }} n={change} />
                </div>
                <AddIcon style={button} onClick={() => { r1 && r2 && AddRow(r1, r2) }} />

            </div>

        </div>
    )
}

export default InputMatrix