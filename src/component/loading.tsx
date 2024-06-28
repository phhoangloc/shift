import React from 'react'

type Props = {}

const Loading = (props: Props) => {
    return (
        <div className='loading'>
            <div className='text'>
                <h1 style={{ animationDelay: "0s" }}>S</h1>
                <h1 style={{ animationDelay: "0.2s" }}>H</h1>
                <h1 style={{ animationDelay: "0.4s" }}>I</h1>
                <h1 style={{ animationDelay: "0.6s" }}>F</h1>
                <h1 style={{ animationDelay: "0.8s" }}>T</h1>
            </div>
        </div>
    )
}

export default Loading