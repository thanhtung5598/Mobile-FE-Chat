/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useSocket from 'use-socket.io-client';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

const SocketContext = React.createContext();
const SocketConsumer = SocketContext.Consumer;

const SocketProvider = props => {
  const { auth_token } = useSelector(state => state.authen);
  const [listGroups, setListGroups] = useState([]);
  const [listMessRoom, setlistMessRoom] = useState([]);
  const ENDPOINT = `https://socket.api-chat.ga`;
  const [listOnline, setListOnline] = useState([]);

  const [socket] = useSocket(ENDPOINT, {
    serveClient: false,
    // below are engine.IO options
    origins: '*:*',
    transports: ['polling'],
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  });

  useEffect(() => {
    const {
      data: { id }
    } = jwt_decode(auth_token);
    socket.emit('load_rooms', [
      {
        id
      }
    ]);
    socket.on('load_rooms', function (data) {
      if (data.id === id) {
        setListGroups(data.rooms.filter(group => group.group !== false));
        setlistMessRoom(data.rooms);
      }
    });
  }, []);

  useEffect(() => {
    socket.on('is-online', userId => {
      setListOnline(userId);
    });
    return () => {};
  }, []);

  const isOnline = friendId =>
    listOnline.findIndex(idOnline => parseInt(idOnline, 10) === friendId) !==
    -1;

  return (
    <SocketContext.Provider
      value={{ socket, listGroups, setListGroups, listMessRoom, isOnline }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export { SocketContext, SocketProvider, SocketConsumer };

SocketProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
SocketProvider.defaultProps = {
  children: {}
};
