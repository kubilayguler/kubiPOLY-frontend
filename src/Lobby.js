import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import Game from './Game.js';
import './Game.css';

const Lobby = () => {
  const [lobbyCode, setLobbyCode] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [message, setMessage] = useState('');
  const [lobby, setLobby] = useState(null);
  const [client, setClient] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [gameStarted, setGameStarted] = useState(false); // Oyun başladı mı kontrol etmek için

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/monopoly',
      onConnect: () => {
        console.log('Connected to WebSocket');
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      },
    });

    setClient(stompClient);
    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const createRoom = () => {
    if (client) {
      const requestBody = {
        lobbyCode: lobbyCode,
        playerName: playerName,
      };
      client.publish({
        destination: '/app/createRoom',
        body: JSON.stringify(requestBody),
      });

      client.subscribe(`/topic/lobby/${lobbyCode}`, (msg) => {
        const lobbyInfo = JSON.parse(msg.body);
        setLobby(lobbyInfo);
        setMessage(`Lobby created: ${msg.body}`);
        findCurrentPlayer(lobbyInfo.players);
      });
    }
  };

  const joinRoom = () => {
    if (client) {
      const requestBody = {
        lobbyCode: lobbyCode,
        playerName: playerName,
      };

      client.publish({
        destination: '/app/joinRoom',
        body: JSON.stringify(requestBody),
      });

      client.subscribe(`/topic/lobby/${lobbyCode}`, (msg) => {
        const lobbyInfo = JSON.parse(msg.body);
        setLobby(lobbyInfo);
        setMessage(`Lobby updated: ${msg.body}`);
        findCurrentPlayer(lobbyInfo.players);
      });
    }
  };

  const getReady = () => {
    if (client) {
      const requestBody = {
        lobbyCode: lobbyCode,
        playerName: playerName,
      };

      client.publish({
        destination: '/app/getReady',
        body: JSON.stringify(requestBody),
      });
    }
  };

  const startGame = () => {
    if (client) {
      const requestBody = {
        lobbyCode: lobbyCode,
        playerName: playerName,
      };

      client.publish({
        destination: '/app/startGame',
        body: JSON.stringify(requestBody),
      });
    }
    if (currentPlayer && currentPlayer.host) {
      setGameStarted(true); // Oyun başlasın
    }
  };

  const findCurrentPlayer = (players) => {
    if (players && players.length > 0) {
      const matchedPlayer = players.find((p) => p.name === playerName);
      if (matchedPlayer) {
        setCurrentPlayer(matchedPlayer);
      }
    }
  };

  return (
    <div>
      <h1>KubiPoly Game Lobby</h1>
      {!lobby && (
        <div>
          <input
            type='text'
            placeholder='Lobby Code'
            value={lobbyCode}
            onChange={(e) => setLobbyCode(e.target.value)}
          />
          <input
            type='text'
            placeholder='Your Name'
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={createRoom}>Create Room</button>
          <button onClick={joinRoom}>Join Room</button>
        </div>
      )}
      {lobby &&
        !gameStarted && ( // Oyun başlamadıysa lobi ekranı göster
          <div>
            <h2>Lobby: {lobby.id}</h2>
            <h2>Players({lobby.players.length}):</h2>
            <ul>
              {lobby.players.map((player, index) => (
                <li key={index}>
                  {player.name} {player.host ? '(HOST)' : ''}{' '}
                  {player.ready ? '✓' : '✕'}
                </li>
              ))}
            </ul>
            {currentPlayer && (
              <button onClick={currentPlayer.host ? startGame : getReady}>
                {currentPlayer.host ? 'Start Game' : 'Click to Ready'}
              </button>
            )}
          </div>
        )}
      {gameStarted && ( // Oyun başladıysa Game bileşenini tam ekran göster
        <div className='game-container'>
          <Game client={client} lobby={lobby} currentPlayer={currentPlayer} />
        </div>
      )}
    </div>
  );
};

export default Lobby;
