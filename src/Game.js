import React, { useEffect, useState } from 'react';
import './Game.css'; // CSS stilini ayrı dosyada tutmak daha iyi olur

const Game = ({ client, lobby, currentPlayer }) => {
  const getPlotInfo = (boxId) => {
    return lobby.plots.find((plot) => plot.id === boxId);
  };

  const [dice, setDice] = useState(-1);
  const [diceImg, setDiceImg] = useState('');
  const [turn, setTurn] = useState(-1);

  useEffect(() => {
    if (dice > 0) {
      setDiceImg(process.env.PUBLIC_URL + '/' + dice + '.png');
    }
  }, [dice]);

  function rollDice() {
    var started = new Date().getTime();
    var duration = 2000;
    var timer = setInterval(function () {
      if (new Date().getTime() - started > duration) {
        clearInterval(timer); // Stops the loop
      } else {
        setDice(Math.floor(1 + Math.random() * 6));
      }
    }, 200);
  }

  function whosTurn() {
    setTurn((turn + 1) % lobby.players.length);
    console.log(turn);
    return lobby.players[turn];
  }

  useEffect(() => {
    console.log('LOBBY UPDATED:' + JSON.stringify(lobby));
    console.log('PLAYER: ' + JSON.stringify(currentPlayer));
  }, [lobby]);

  return (
    <>
      <div className='player-info'>
        <ul>
          <li>Lobby Code: {lobby.id}</li>
          <li>Player: {currentPlayer.name}</li>
          <li>
            Turn: <button onClick={whosTurn}>whosturn: {turn}</button>
            <button
              disabled={whosTurn().name !== currentPlayer.name}
              onClick={rollDice}
            >
              Roll: {dice}
            </button>
            <img
              src={diceImg}
              style={{ width: '100px', height: '100px' }}
              alt='dice'
            ></img>
          </li>
        </ul>
        <ul>
          <li>Plots: {currentPlayer.plots}</li>
          <li>Player: {currentPlayer.name}</li>
          <li>Your turn !</li>
        </ul>
      </div>
      <div className='board'>
        <text>
          KUBI<span style={{ color: 'white' }}>POLY</span>
        </text>
        <div className='box rotate180' id='a1'>
          START
        </div>
        <div className='box rotate180' id='a2'>
          {(() => {
            const plot = lobby.plots.find((plot) => plot.id === 2); // ID'si 2 olan plot'u bir değişkene atıyoruz
            return plot ? (
              <>
                <span>{plot.name}</span>
                <span>Sahibi: {plot.owner ? plot.owner : 'Yok'}</span>
                <span>Fiyat: {plot.price}</span>
                <span>Kira: {plot.rent}</span>
                <span>Seviye: {plot.level}</span>
              </>
            ) : null;
          })()}
        </div>
        <div className='box rotate180' id='a3'>
          3
        </div>
        <div className='box rotate180' id='a4'>
          4
        </div>
        <div className='box rotate180' id='a5'>
          5
        </div>
        <div className='box rotate180' id='a6'>
          6
        </div>
        <div className='box rotate180' id='a7'>
          7
        </div>
        <div className='box rotate180' id='a8'>
          8
        </div>
        <div className='box rotate180' id='a9'>
          9
        </div>
        <div className='box rotate180' id='a10'>
          KODES
        </div>

        <div className='box rotate180' id='a36'>
          {(() => {
            const plot = lobby.plots.find((plot) => plot.id === 36); // ID'si 2 olan plot'u bir değişkene atıyoruz
            return plot ? (
              <>
                <span>{plot.name} </span>
                <span>Sahibi: {plot.owner ? plot.owner : 'Yok'}</span>
                <span>Fiyat: {plot.price}</span>
                <span>Kira: {plot.rent}</span>
                <span>Seviye: {plot.level}</span>
              </>
            ) : null;
          })()}
        </div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box rotate180' id='a11'>
          11
        </div>
        <div className='box rotate180' id='a35'>
          35
        </div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box rotate180' id='a12'>
          12
        </div>
        <div className='box rotate180' id='a34'>
          34
        </div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box rotate180' id='a13'>
          13
        </div>
        <div className='box rotate180' id='a33'>
          33
        </div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box rotate180' id='a14'>
          14
        </div>
        <div className='box rotate180' id='a32'>
          32
        </div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box rotate180' id='a15'>
          15
        </div>
        <div className='box rotate180' id='a31'>
          31
        </div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box rotate180' id='a16'>
          16
        </div>
        <div className='box rotate180' id='a30'>
          30
        </div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box rotate180' id='a17'>
          17
        </div>
        <div className='box rotate180' id='a29'>
          29
        </div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box rotate180' id='a18'>
          18
        </div>

        <div className='box rotate180' id='a28'>
          28
        </div>
        <div className='box rotate180' id='a27'>
          27
        </div>
        <div className='box rotate180' id='a26'>
          26
        </div>
        <div className='box rotate180' id='a25'>
          25
        </div>
        <div className='box rotate180' id='a24'>
          24
        </div>
        <div className='box rotate180' id='a23'>
          23
        </div>
        <div className='box rotate180' id='a22'>
          22
        </div>
        <div className='box rotate180' id='a21'>
          21
        </div>
        <div className='box rotate180' id='a20'>
          {(() => {
            const plot = lobby.plots.find((plot) => plot.id === 20); // ID'si 2 olan plot'u bir değişkene atıyoruz
            return plot ? (
              <>
                <span>{plot.name}</span>
                <span>Sahibi: {plot.owner ? plot.owner : 'Yok'}</span>
                <span>Fiyat: {plot.price}</span>
                <span>Kira: {plot.rent}</span>
                <span>Seviye: {plot.level}</span>
              </>
            ) : null;
          })()}
        </div>
        <div className='box rotate180' id='a19'>
          19
        </div>
      </div>
    </>
  );
};

export default Game;
