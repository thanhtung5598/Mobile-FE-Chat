/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
// true: bạn, false: chờ accepted, 'requested' là nhửng request friend
const useCheckFriends = ({
  listUsers, // user tìm được
  listFriends, // friends
  listFriendsWait, // đả gửi kết bạn cho những người này
  listRequestFriends // nhưng người yêu cầu kết bạn
}) => {
  const [listFindFill, setListFindFill] = useState(null);
  useEffect(() => {
    const newListUserClone = JSON.parse(JSON.stringify(listUsers));
    if (!listUsers) {
      setListFindFill([]);
      return;
    }
    if (!listFriends && !listFriendsWait && !listRequestFriends) {
      console.log('case 1');
      setListFindFill([...listUsers]);
      return;
    }
    if (!listFriends && !listFriendsWait && listRequestFriends) {
      console.log('case 2'); // required add friends
      const listIndex = [];
      // find friend
      for (let i = 0; i < newListUserClone.length; i++) {
        for (let j = 0; j < listRequestFriends.length; j++) {
          if (newListUserClone[i].id === listRequestFriends[j].id) {
            listIndex.push(i);
          }
        }
      }
      listIndex.forEach(item => {
        newListUserClone[item].status = 'requested'; // is already friend
      });
      setListFindFill([
        ...newListUserClone.filter(user => user.status !== 'requested')
      ]);
      return;
    }
    if (!listFriends && listFriendsWait && !listRequestFriends) {
      console.log('case 3'); // required add friends
      const listIndex = [];
      // find friend
      for (let i = 0; i < newListUserClone.length; i++) {
        for (let j = 0; j < listFriendsWait.length; j++) {
          if (newListUserClone[i].id === listFriendsWait[j].id) {
            listIndex.push(i);
          }
        }
      }
      listIndex.forEach(item => {
        newListUserClone[item].status = false; // is already friend
      });
      setListFindFill([...newListUserClone]);
      return;
    }
    if (listFriends && !listFriendsWait && !listRequestFriends) {
      console.log('case 4'); // required add friends
      const listIndex = [];
      // find friend
      for (let i = 0; i < newListUserClone.length; i++) {
        for (let j = 0; j < listFriends.length; j++) {
          if (newListUserClone[i].id === listFriends[j].id) {
            listIndex.push(i);
          }
        }
      }
      listIndex.forEach(item => {
        newListUserClone[item].status = true; // is already friend
      });
      setListFindFill([...newListUserClone]);
      return;
    }
    if (listFriends && listFriendsWait && !listRequestFriends) {
      console.log('case 5'); // required add friends
      const listIndexFriendFrind = [];
      const listIndexFriendWait = [];

      // find friend
      for (let i = 0; i < newListUserClone.length; i++) {
        for (let j = 0; j < listFriends.length; j++) {
          if (newListUserClone[i].id === listFriends[j].id) {
            listIndexFriendFrind.push(i);
          }
        }
      }
      // find friend wait
      for (let i = 0; i < newListUserClone.length; i++) {
        for (let j = 0; j < listFriendsWait.length; j++) {
          if (newListUserClone[i].id === listFriendsWait[j].id) {
            listIndexFriendWait.push(i);
          }
        }
      }
      listIndexFriendFrind.forEach(item => {
        newListUserClone[item].status = true; // is already friend
      });
      listIndexFriendWait.forEach(item => {
        newListUserClone[item].status = false;
      });
      setListFindFill([...newListUserClone]);
      return;
    }
    if (listFriends && !listFriendsWait && listRequestFriends) {
      console.log('case 6'); // required add friends
      const listIndexFriendFrind = [];
      const listIndexFriendWait = [];

      // find friend
      for (let i = 0; i < newListUserClone.length; i++) {
        for (let j = 0; j < listFriends.length; j++) {
          if (newListUserClone[i].id === listFriends[j].id) {
            listIndexFriendFrind.push(i);
          }
        }
      }
      // find friend wait
      for (let i = 0; i < newListUserClone.length; i++) {
        for (let j = 0; j < listRequestFriends.length; j++) {
          if (newListUserClone[i].id === listRequestFriends[j].id) {
            listIndexFriendWait.push(i);
          }
        }
      }

      listIndexFriendFrind.forEach(item => {
        newListUserClone[item].status = true; // is already friend
      });
      listIndexFriendWait.forEach(item => {
        newListUserClone[item].status = 'requested';
      });
      setListFindFill([
        ...newListUserClone.filter(user => user.status !== 'requested')
      ]);
      return;
    }
    if (!listFriends && listFriendsWait && listRequestFriends) {
      console.log('case 7'); // required add friends
      const listIndexFriendFrind = [];
      const listIndexFriendWait = [];

      // find friend
      for (let i = 0; i < newListUserClone.length; i++) {
        for (let j = 0; j < listFriendsWait.length; j++) {
          if (newListUserClone[i].id === listFriendsWait[j].id) {
            listIndexFriendFrind.push(i);
          }
        }
      }
      // find friend wait
      for (let i = 0; i < newListUserClone.length; i++) {
        for (let j = 0; j < listRequestFriends.length; j++) {
          if (newListUserClone[i].id === listRequestFriends[j].id) {
            listIndexFriendWait.push(i);
          }
        }
      }
      listIndexFriendFrind.forEach(item => {
        newListUserClone[item].status = false; // waiting...
      });
      listIndexFriendWait.forEach(item => {
        newListUserClone[item].status = 'requested';
      });
      setListFindFill([
        ...newListUserClone.filter(user => user.status !== 'requested')
      ]);
      return;
    }
    console.log('case 8'); // required add friends
    const listIndexFriendFrind = [];
    const listIndexFriendWait = [];
    const listIndexFriendReq = [];

    // find friend
    for (let i = 0; i < newListUserClone.length; i++) {
      for (let j = 0; j < listFriends.length; j++) {
        if (newListUserClone[i].id === listFriends[j].id) {
          listIndexFriendFrind.push(i);
        }
      }
    }
    // find friend wait
    for (let i = 0; i < newListUserClone.length; i++) {
      for (let j = 0; j < listFriendsWait.length; j++) {
        if (newListUserClone[i].id === listFriendsWait[j].id) {
          listIndexFriendWait.push(i);
        }
      }
    }
    // find friend req
    for (let i = 0; i < newListUserClone.length; i++) {
      for (let j = 0; j < listRequestFriends.length; j++) {
        if (newListUserClone[i].id === listRequestFriends[j].id) {
          listIndexFriendReq.push(i);
        }
      }
    }
    listIndexFriendFrind.forEach(item => {
      newListUserClone[item].status = true; // is already friend
    });
    listIndexFriendWait.forEach(item => {
      newListUserClone[item].status = false;
    });
    listIndexFriendReq.forEach(item => {
      newListUserClone[item].status = 'requested';
    });
    setListFindFill([
      ...newListUserClone.filter(user => user.status !== 'requested')
    ]);
  }, [listFriends, listFriendsWait, listRequestFriends, listUsers]);

  return { listFindFill };
};
export default useCheckFriends;
