"use client"

import React, { useEffect, useState, useMemo } from 'react'
import { io } from 'socket.io-client';
import '../Styles/styles.css'
const Game = ({ roomId, playerId }) => {


    const [square, setSquare] = useState(["", "", "", "", "", "", "", "", ""]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [count, setCount] = useState(0);
    const [turn, setTurn] = useState(true);

    // SOCKET

    const socket = useMemo(() => io("http://localhost:4000/"), []);

    socket.on("connect", () => {
        console.log(socket.id, " connected");
    });


    socket.emit("roomId", roomId);

    socket.on("square", (data) => {
        // console.log(data);
        setIsDisabled(false);
        setSquare(data);
    })

    socket.on("count",(data)=>{
        setCount(data);
      });

    socket.on("disconnect", () => {
        console.log(socket.id);
    });


    const sendSquareHandler = (newSquares, count) => {
        socket.emit("square", newSquares);
        socket.emit("count",count)
        setIsDisabled(true);
        // socket.emit("chance",!turn);
      }    


    // GAME

    const winningPositions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];


    const squareClickHandler = (index) => {
        const newSquares = [...square];
        if (square[index] === "") {
          newSquares[index] = playerId;
          const newCount = count+1;
          setCount(newCount);
          setSquare(newSquares);
          sendSquareHandler(newSquares,newCount);
        }
      }

    const checkWinner = () => {
        for (let i = 0; i < winningPositions.length; i++) {
            const [a, b, c] = winningPositions[i];
            if (square[a] && square[a] === square[b] && square[a] === square[c]) {
                return square[a];
            }
        }
    }

    useEffect(() => {
        const winner = checkWinner();
        if (winner) {
          console.log(winner);
          setIsDisabled(true);
        }
        if(count===9 && !winner){
          console.log("Draw");
        }
      }, [square]);


    return (
        <div>
            <div className='w-[50vw] h-[50vh] mx-auto mt-40 grid grid-cols-3 grid-rows-3 bg-blue-300'>
                <button onClick={() => { squareClickHandler(0) }} disabled={isDisabled} className='button right down'>{square[0]}</button>
                <button onClick={() => { squareClickHandler(1) }} disabled={isDisabled} className='button right down'>{square[1]}</button>
                <button onClick={() => { squareClickHandler(2) }} disabled={isDisabled} className='button down'>{square[2]}</button>
                <button onClick={() => { squareClickHandler(3) }} disabled={isDisabled} className='button right down'>{square[3]}</button>
                <button onClick={() => { squareClickHandler(4) }} disabled={isDisabled} className='button right down'>{square[4]}</button>
                <button onClick={() => { squareClickHandler(5) }} disabled={isDisabled} className='button down'>{square[5]}</button>
                <button onClick={() => { squareClickHandler(6) }} disabled={isDisabled} className='button right'>{square[6]}</button>
                <button onClick={() => { squareClickHandler(7) }} disabled={isDisabled} className='button right'>{square[7]}</button>
                <button onClick={() => { squareClickHandler(8) }} disabled={isDisabled} className='button '>{square[8]}</button>
            </div>
        </div>
    )
}

export default Game
