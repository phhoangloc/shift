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
    const inputImgRef = useRef<any>()
    const inputLinkRef = useRef<any>()
    const inputTableRow = useRef<any>()
    const inputTableCol = useRef<any>()

    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)
    const [textSelect, setTextSelect] = useState<string>("")

    const [focus, setFocus] = useState<boolean>(false)
    const [focusInputImg, setFocusInputImg] = useState<boolean>(false)
    const [focusInputLink, setFocusInputLink] = useState<boolean>(false)
    const [imglink, setImgLink] = useState<string>("")
    const [link, setLink] = useState<string>("")

    const [trow, setTrow] = useState<number>(0)
    const [tcol, setTCol] = useState<number>(0)
    const [focusInputRow, setFocusInputRow] = useState<boolean>(false)

    const createText = (value: string) => {

        const child = inputRef.current.childNodes[x]

        if (!child || inputRef.current.innerHTML.trim() === "") {
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
    const createTable = (r: number, c: number) => {

        console.log(r, c)

        // const child = inputRef.current.childNodes[x]
        // if (inputRef?.current.innerText.trim() === "") {
        //     inputRef.current.innerHTML += `<div style="display:flex"><h4>タイトル</h4><p>内容</p></div>`
        // } else {
        //     if (textSelect) {
        //         child.innerHTML = `<div style="display:flex"><h4>${textSelect}</h4><p>内容</p></div>`
        //     } else {
        //         if (child.innerText.trim() === "") {
        //             child.innerHTML = `<div style="display:flex"><h4>${textSelect}</h4><p>内容</p></div>`
        //         }
        //     }
        // }

        inputRef.current ? onChange(inputRef.current.innerHTML) : null
        setTextSelect("")
    }

    const createRow = () => {
        const child = inputRef.current.childNodes[x]
        if (inputRef?.current.innerText.trim() === "") {
            inputRef.current.innerHTML += `<div><h4 style="font-weight:normal"><span style="font-weight:bold;font-size:1rem;width:100px;display: inline-block">タイトル</span> 内容</h4></div>`
            const newchild = inputRef.current.childNodes[inputRef.current.childNodes.length - 1]

            const selection = window.getSelection();
            const newRange = document.createRange();
            newchild && newRange.setStartAfter(newchild);
            newchild && newRange.setEndAfter(newchild);

            selection && selection.removeAllRanges();
            selection && selection.addRange(newRange);
        } else {
            if (child.innerHTML.trim() === "<br>") {
                child.innerHTML += `<div><h4 style="font-weight:normal"><span style="font-weight:bold;font-size:1rem;width:100px;display: inline-block">タイトル</span> 内容</h4></div>`
            }
        }
        inputRef.current ? onChange(inputRef.current.innerHTML) : null
        setLink("")
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
            setFocusInputLink(false)
            setLink("")

        }

    }
    const createImage = (type: string, value: string) => {
        const child = inputRef.current.childNodes[x]
        child ? child.innerHTML += `<${type} style="width:100%" src=${value}></${type}>` : inputRef.current.innerHTML += `<div><${type} style="width:100%" src=${value}></${type}></div>`
        inputRef.current ? onChange(inputRef.current.innerHTML) : null
        setFocusInputImg(false)
        setImgLink("")
    }

    useEffect(() => {
        inputRef.current ? inputRef.current.innerHTML = `${value}` : null
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
    }
    const boxFocus: React.CSSProperties = {
        padding: "5px",
        background: "inherit",
        color: "inherit",
    }
    const tool: React.CSSProperties = {
        position: "sticky",
        top: "5px",
        display: "flex",
        flexWrap: "wrap",
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
        marginRight: "5px",
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
        marginRight: "5px",
        boxShadow: "2px 2px 4px -2px #888",
        transition: "all 0.25s",
        background: "#006699",
        color: "white"
    }

    const buttonFocus: React.CSSProperties = {
    }

    const input: React.CSSProperties = {
        width: "0px",
        height: "40px",
        boxSizing: "border-box",
        margin: "0px",
        padding: 0,
        background: "inherit",
        color: "inherit",
        border: "none",
        transition: "all 0.5s",
        borderRadius: "5px",
    }
    const inputNumber: React.CSSProperties = {
        width: "40px"
    }
    const inputFocus: React.CSSProperties = {
        width: "150px"
    }

    const inputBox: React.CSSProperties = {
        minHeight: "300px",
        padding: "10px 5px",
        marginTop: "10px",
        borderRadius: "5px"
    }
    const inputBoxFocus: React.CSSProperties = {
        boxShadow: "0px 0px 2px 0px #aaa",
    }

    return (
        <div style={focus || inputRef?.current?.innerHTML ? { ...box, ...boxFocus } : { ...box }} >
            <div style={{ ...tool }}>
                <p style={focus || inputRef?.current?.innerHTML ? { ...button, ...buttonFocus } : button} onClick={() => createText("h1")}>h1</p>
                <p style={focus || inputRef?.current?.innerHTML ? { ...button, ...buttonFocus } : button} onClick={() => createText("h2")}>h2</p>
                <p style={focus || inputRef?.current?.innerHTML ? { ...button, ...buttonFocus } : button} onClick={() => createText("h3")}>h3</p>
                <p style={focus || inputRef?.current?.innerHTML ? { ...button, ...buttonFocus } : button} onClick={() => createText("h4")}>h4</p>
                <p style={focus || inputRef?.current?.innerHTML ? { ...button, ...buttonFocus } : button} onClick={() => createText("p")}>p</p>
                <p style={focus || inputRef?.current?.innerHTML ? { ...button, ...buttonFocus } : button} onClick={() => createRow()}>row</p>
                <div style={{ display: "flex" }}>
                    <input ref={inputLinkRef}
                        style={focusInputLink ? { ...input, ...inputFocus } : { ...input }}
                        placeholder='url link' onChange={(e) => setLink(e.target.value)}
                        onFocus={(e) => { setFocusInputLink(true), e.target.style.outline = 'none' }}></input>
                    {focusInputLink ?
                        <CheckIcon
                            style={focus || inputRef?.current?.innerHTML ? { ...icon, ...buttonFocus } : icon}
                            onClick={() => { createLink(link), setFocusInputLink(false), setLink("") }} /> : null}
                    {focusInputLink ?
                        <CloseIcon
                            style={focus || inputRef?.current?.innerHTML ? { ...icon, ...buttonFocus } : icon}
                            onClick={() => { setLink(""), setFocusInputLink(false) }} /> :
                        <AddLinkIcon
                            style={focus || inputRef?.current?.innerHTML ? { ...icon, ...buttonFocus } : icon}
                            onClick={() => { inputLinkRef.current?.focus() }} />}
                </div>
                <div style={{ display: "flex" }}>
                    <input ref={inputImgRef}
                        style={focusInputImg ? { ...input, ...inputFocus } : { ...input }}
                        placeholder='img link' onChange={(e) => setImgLink(e.target.value)}
                        onFocus={(e) => { setFocusInputImg(true), e.target.style.outline = 'none' }}></input>
                    {focusInputImg ?
                        <CheckIcon
                            style={focus || inputRef?.current?.innerHTML ? { ...icon, ...buttonFocus } : icon}
                            onClick={() => { createImage("img", imglink), setFocusInputImg(false), setImgLink("") }} /> : null}
                    {focusInputImg ?
                        <CloseIcon
                            style={focus || inputRef?.current?.innerHTML ? { ...icon, ...buttonFocus } : icon}
                            onClick={() => { setImgLink(""), setFocusInputImg(false) }} /> :
                        <AddPhotoAlternateIcon
                            style={focus || inputRef?.current?.innerHTML ? { ...icon, ...buttonFocus } : icon}
                            onClick={() => { inputImgRef.current?.focus() }} />}
                </div>
                {/* <div style={{ display: "flex" }}>
                    <input
                        ref={inputTableRow}
                        type='number'
                        style={focusInputRow ? { ...input, ...inputNumber } : { ...input }}
                        placeholder='row'
                        onChange={(e) => setTrow(e.target.valueAsNumber)}
                        onFocus={(e) => { setFocusInputRow(true), e.target.style.outline = 'none' }}>
                    </input>
                    <input
                        ref={inputTableCol}
                        type='number'
                        style={focusInputRow ? { ...input, ...inputNumber } : { ...input }}
                        placeholder='col'
                        onChange={(e) => setTCol(e.target.valueAsNumber)}
                        onFocus={(e) => { e.target.style.outline = 'none' }}>
                    </input>
                    {focusInputRow ?
                        <CheckIcon
                            style={focus || inputRef?.current?.innerHTML ? { ...icon, ...buttonFocus } : icon}
                            onClick={() => { createTable(trow, tcol), setFocusInputRow(false), setTrow(0), setTCol(0) }} />
                        :
                        null}
                    {focusInputRow ?
                        <CloseIcon
                            style={focus || inputRef?.current?.innerHTML ? { ...icon, ...buttonFocus } : icon}
                            onClick={() => { setTrow(0), setTCol(0), setFocusInputRow(false) }} /> :
                        <GridViewIcon
                            style={focus || inputRef?.current?.innerHTML ? { ...icon, ...buttonFocus } : icon}
                            onClick={() => { inputTableRow.current?.focus() }} />}
                </div> */}
            </div>
            <div className='editBox' ref={inputRef}
                style={focus || inputRef?.current?.innerHTML ? { ...inputBox, ...inputBoxFocus } : { ...inputBox }}
                contentEditable={true}
                onInput={(e) => onChange(e.currentTarget.innerHTML)}
                onFocus={(e) => { setFocus(true), e.target.style.outline = 'none'; }}
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