'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import store from '@/redux/store'
import AddLinkIcon from '@mui/icons-material/AddLink';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import GridViewIcon from '@mui/icons-material/GridView';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


type Props = {
    onChange: (e: string) => void,
    value: string,
}

const TextAreaTool = ({ onChange, value }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }
    update()

    const inputRef = useRef<any>()
    const inputValueLeftRef = useRef<any>()
    const inputValueRightRef = useRef<any>()


    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)
    const [textSelect, setTextSelect] = useState<string>("")

    const [focus, setFocus] = useState<boolean>(false)
    const [inputLeftValue, setInputLeftValue] = useState<string>("")
    const [inputRightValue, setInputRightValue] = useState<string>("")
    const [inputType, setInputType] = useState<string>("")
    const [focusInput, setFocusInput] = useState<boolean>(false)



    const createText = (value: string) => {
        const child = inputRef.current.childNodes[x]
        if (inputRef.current.innerHTML.trim() === "") {
            inputRef.current.innerHTML += `<div><${value}>${value}</${value}></div>`
            const newchild = inputRef.current.childNodes[inputRef.current.childNodes.length - 1]

            const selection = window.getSelection();
            const newRange = document.createRange();
            newchild && newRange.setStartAfter(newchild);
            newchild && newRange.setEndAfter(newchild);

            selection && selection.removeAllRanges();
            selection && selection.addRange(newRange);
        } else {
            if (textSelect) {
                console.log(inputRef.current)
                child.innerHTML = `<${value}>${textSelect}</${value}>`
                const selection = window.getSelection();
                const newRange = document.createRange();
                child && newRange.setStartAfter(child);
                child && newRange.setEndAfter(child);

                selection && selection.removeAllRanges();
                selection && selection.addRange(newRange);

            } else {
                if (child.innerHTML.trim() === "<br>") {
                    child.innerHTML = `<${value}>${value}</${value}>`
                    const selection = window.getSelection();
                    const newRange = document.createRange();
                    child && newRange.setStartAfter(child);
                    child && newRange.setEndAfter(child);
                    selection && selection.removeAllRanges();
                    selection && selection.addRange(newRange);
                }
            }


        }


        inputRef.current ? onChange(inputRef.current.innerHTML) : null
        setTextSelect("")
    }

    const createDl = (dt: string, dd: string) => {
        const child = inputRef.current.childNodes[x]
        if (inputRef?.current.innerText.trim() === "") {
            inputRef.current.innerHTML += `
                <div><h4 style="font-weight:normal"><span style="font-weight:bold;font-size:1rem;width:100px;display: inline-block">${dt}</span> ${dd}</h4></div>`
            const newchild = inputRef.current.childNodes[inputRef.current.childNodes.length - 1]

            const selection = window.getSelection();
            const newRange = document.createRange();
            newchild && newRange.setStartAfter(newchild);
            newchild && newRange.setEndAfter(newchild);

            selection && selection.removeAllRanges();
            selection && selection.addRange(newRange);
        } else {
            if (child.innerText.trim() === "") {
                child.innerHTML = `<h4 style="font-weight:normal"><span style="font-weight:bold;font-size:1rem;width:100px;display: inline-block">${dt}</span> ${dd}</h4>`
            }
        }
        inputRef.current ? onChange(inputRef.current.innerHTML) : null
    }

    const createLink = (value: string) => {
        const child = inputRef.current.childNodes[x]
        if (inputRef?.current.innerText.trim() === "") {
            inputRef.current.innerHTML += `<div><a href=${value} target="_blank">${value}</a></div>`
        } else {
            if (textSelect) {
                child.innerHTML = `<a href=${value} target="_blank">${textSelect}</a>`
            } else {
                if (child.innerText.trim() === "") {
                    child.innerHTML = `<div><a href=${value} target="_blank">${value}</a></div>`
                }
            }
            inputRef.current ? onChange(inputRef.current.innerHTML) : null
        }

    }
    const createImage = (value: string) => {

        const child = inputRef.current.childNodes[x]
        if (inputRef?.current.innerText.trim() === "") {
            inputRef.current.innerHTML += `<div><img style="width:100%" src=${value}></img}></div`
        } else {
            if (child.innerText.trim() === "") {
                child.innerHTML = `<img style="width:100%" src=${value}></img}>`
            }

        }
        inputRef.current ? onChange(inputRef.current.innerHTML) : null
    }

    useEffect(() => {
        inputRef.current ? inputRef.current.innerHTML = `</div>${value}</div>` : null
    }, [value])


    const getPosition = () => {
        const selection = window.getSelection();
        selection && setTextSelect(selection?.toString())
        const range = selection?.getRangeAt(0);
        const preCaretRange = range?.cloneRange();
        setY(preCaretRange?.endOffset || 0)
        let node: Node | undefined | null = range?.endContainer;
        let index = 0;
        while (node && node !== inputRef.current) {
            if (node.parentNode === inputRef.current) {
                index = Array.prototype.indexOf.call(inputRef.current.childNodes, node);
                break;
            }
            node = node.parentNode;
        }
        setX(index);

    }

    const box: React.CSSProperties = {
        padding: "5px",
        margin: "10px 0",
        transition: "all 0.25s",
        position: "relative",
    }
    const boxFocus: React.CSSProperties = {
        padding: "5px",
        background: "inherit",
        color: "inherit",
    }
    const tool: React.CSSProperties = {
        width: "calc(100% - 10px)",

        position: "sticky",
        top: "0px",
        display: "flex",
        flexWrap: "wrap",
        borderRadius: "5px"

    }

    const button: React.CSSProperties = {
        width: "40px",
        height: "40px",
        lineHeight: "40px",
        textAlign: "center",
        borderRadius: "5px",
        cursor: "pointer",
        boxSizing: "border-box",
        boxShadow: "2px 2px 4px -2px #888",
        transition: "all 0.25s",
        margin: "5px 5px 0px 0px",
        background: "#006699",
        color: "white"
    }

    const icon: React.CSSProperties = {
        width: "40px",
        height: "40px",
        lineHeight: "40px",
        textAlign: "center",
        borderRadius: "5px",
        cursor: "pointer",
        boxSizing: "border-box",
        padding: "5px",
        margin: "5px 5px 0 0",
        boxShadow: "2px 2px 4px -2px #888",
        transition: "all 0.25s",
        background: "#006699",
        color: "white"
    }


    const input: React.CSSProperties = {
        width: "200px",
        height: "40px",
        boxSizing: "border-box",
        margin: "5px 5px 0px 0px",
        padding: "0 5px",
        transition: "all 0.5s",
        borderRadius: "5px",
    }


    const inputBox: React.CSSProperties = {
        minHeight: "300px",
        padding: "20px",
        marginTop: "10px",
        borderRadius: "5px",
        boxShadow: "0px 0px 5px  #888",
    }
    const inputBoxFocus: React.CSSProperties = {
    }

    const modalBox: React.CSSProperties = {
        width: "max-content",
        minHeight: "40px",
        left: "5px",
        opacity: 0,
        flexWrap: "wrap",
        overflow: "hidden",
        marginTop: "5px",
        position: "absolute",
        transition: "all 0.25s",
        zIndex: -1,
        display: "flex"
    }
    const modalBoxFocus: React.CSSProperties = {
        opacity: 1, height: "max-content", marginTop: "45px",
    }

    const onSubmit = (t: string, vl: string, vr: string) => {
        switch (t) {
            case "dl": createDl(vl, vr)
                break
            case "link": createLink(vl)
                break
            case "img": createImage(vl)
                break
        }
        setInputLeftValue("")
        setInputRightValue("")
    }
    return (
        <div style={focus || inputRef?.current?.innerHTML ? { ...box, ...boxFocus } : { ...box }} >
            <div style={{ ...tool }}>
                <p style={button} onClick={() => createText("h1")}>h1</p>
                <p style={button} onClick={() => createText("h2")}>h2</p>
                <p style={button} onClick={() => createText("h3")}>h3</p>
                <p style={button} onClick={() => createText("h4")}>h4</p>
                <p style={button} onClick={() => createText("p")}>p</p>
                <p style={button} onClick={() => { setFocusInput(!focusInput), setInputType("dl") }}>dl</p>
                <p style={button} onClick={() => { setFocusInput(!focusInput), setInputType("link") }}>url</p>
                <AddPhotoAlternateIcon style={icon} onClick={() => { setFocusInput(!focusInput), setInputType("img") }} />
                <div style={focusInput ? { ...modalBox, ...modalBoxFocus } : modalBox}>
                    <input
                        ref={inputValueLeftRef}
                        style={{ ...input }} placeholder={inputType === "dl" ? '定義' : inputType === "link" ? "url" : "価値"}
                        onChange={(e) => setInputLeftValue(e.target.value)}
                        value={inputLeftValue}
                        onFocus={(e) => {
                            e.target.style.outline = 'none'
                        }}>
                    </input>
                    {inputType === "dl" && <input
                        ref={inputValueRightRef}
                        style={{ ...input }} placeholder={'価値'}
                        onChange={(e) => setInputRightValue(e.target.value)}
                        value={inputRightValue}
                        onFocus={(e) => {
                            e.target.style.outline = 'none'
                        }}>
                    </input>}
                    <CloseIcon style={icon} onClick={() => { setFocusInput(false), setInputType("") }} />
                    <CheckIcon style={icon} onClick={() => { onSubmit(inputType, inputLeftValue, inputRightValue), setFocusInput(false), setInputType("") }} />
                </div>
            </div>

            <div className='editBox'
                ref={inputRef}
                style={focus || inputRef?.current?.innerHTML ? { ...inputBox, ...inputBoxFocus } : { ...inputBox }}
                contentEditable={true}
                onInput={(e) => onChange(e.currentTarget.innerHTML)}
                onFocus={(e) => { setFocus(true); e.target.style.outline = 'none' }}
                onBlur={() => setFocus(false)}
                onSelect={() => getPosition()}
                onMouseUp={() => getPosition()}
                onKeyUp={() => getPosition()}
            >
            </div>
        </div >
    )
}

export default TextAreaTool