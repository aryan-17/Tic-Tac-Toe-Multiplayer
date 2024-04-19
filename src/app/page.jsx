"use client"
import Image from "next/image";
import Button from "../Components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {

  const router = useRouter()
  const playerX = "X";
  const playerO = "O";

  const [room, setRoom] = useState("create");
  const [id,setId] = useState("");
  const changeIdHandler = (e)=>{
    setId(e.target.value);
  }

  const roomGenerate = ()=>{
    const randNum =  ((Math.random()*100000) + 100000).toFixed(0);
    router.push(`/game/${randNum}/${playerX}`);
  }

  const joinRoomHandler = ()=>{
    setRoom("join");
  }

  const enterRoomHandler = ()=>{
    router.push(`/game/${id}/${playerO}`)
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-10">
      <div className="flex gap-20 w-screen items-center justify-center">
        <button onClick={()=>setRoom("create")}>Create Room</button>
        <button onClick={()=> joinRoomHandler()}>Join Room</button>
      </div>
      <div>
        {
          room === "join" ? <input type="text" placeholder="Id" value={id} onChange={(e)=>changeIdHandler(e)} className="w-[10rem] bg-blue-200" /> : <p className="w-[10rem] bg-blue-200">{id}</p>
        }
      </div>
      <div>
        {
          room === "join" ? <Button action={enterRoomHandler} text={"Join Lobby"}/> : <Button action={roomGenerate} text={"Generate Code"} />
        }
      </div>
    </div>
  );
}
