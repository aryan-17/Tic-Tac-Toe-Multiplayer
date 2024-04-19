"use client"

import Button from './Button';
import React, { useMemo, useState } from 'react'
import { io } from 'socket.io-client';

const Chat = ({roomId}) => {

    const socket = useMemo(() => io("http://localhost:4000/"), []);
    const [text,setText] = useState("");
    const [message,setMessage] = useState("");

    socket.on("connect", () => {
        console.log(socket.id," connected");
    });


    socket.emit("roomId",roomId);

    socket.on("reply",(data)=>{
        console.log(data);
        setMessage(data);
    })

    socket.on("disconnect", () => {
        console.log(socket.id);
    });


    const sendTextHandler = () => {
        socket.emit("text", text);
        setText("")
    }

    return (
        <div className='m-10 flex flex-col gap-5'>
            <input type="text" value={text}  placeholder='Enter Message' className='bg-blue-300 p-2 rounded-md border-2 border-blue-900 w-fit' onChange={(e) => setText(e.target.value)} />
            <Button text={"Send"} action={() => sendTextHandler()} />
            <div>
                <p>
                    {message}
                </p>
            </div>
            
        </div>
    )
}

export default Chat
