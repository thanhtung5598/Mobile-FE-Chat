/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

const useCheckFriends = ({
  listUsers, // user tìm được
  listFriends, // friends
  listFriendsWait, // đả gửi kết bạn cho những người này
  listRequestFriends // nhưng người yêu cầu kết bạn
}) => {
  const [listFindFill, setListFindFill] = useState(null);

  useEffect(() => {
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
      const newReq = JSON.parse(JSON.stringify(listUsers));
      const listIndex = [];
      // find friend
      for (let i = 0; i < newReq.length; i++) {
        for (let j = 0; j < listRequestFriends.length; j++) {
          if (!newReq[i].email) {
            // if all user do not have email
            if (newReq[i].phone === listRequestFriends[j].phone) {
              listIndex.push(i);
            }
          }
          if (newReq[i].email) {
            // if user already had email
            if (newReq[i].email === listRequestFriends[j].email) {
              listIndex.push(i);
            }
          }
        }
        listIndex.forEach(item => {
          newReq[item].status = 'requested'; // is already friend
        });
        const newlist = newReq.filter(user => user.status !== 'requested');
        setListFindFill([...newlist]);
        return;
      }
    }
    if (!listFriends && listFriendsWait && !listRequestFriends) {
      console.log('case 3'); // required add friends
      const newReq = JSON.parse(JSON.stringify(listUsers));
      const listIndex = [];
      // find friend
      for (let i = 0; i < newReq.length; i++) {
        for (let j = 0; j < listFriendsWait.length; j++) {
          if (!newReq[i].email) {
            // if all user do not have email
            if (newReq[i].phone === listFriendsWait[j].phone) {
              listIndex.push(i);
            }
          }
          if (newReq[i].email) {
            // if user already had email
            if (newReq[i].email === listFriendsWait[j].email) {
              listIndex.push(i);
            }
          }
        }
      }
      listIndex.forEach(item => {
        newReq[item].status = false; // is already friend
      });
      setListFindFill([...newReq]);
      return;
    }
    if (listFriends && !listFriendsWait && !listRequestFriends) {
      console.log('case 4'); // required add friends
      const newReq = JSON.parse(JSON.stringify(listUsers));
      const listIndex = [];
      // find friend
      for (let i = 0; i < newReq.length; i++) {
        for (let j = 0; j < listFriends.length; j++) {
          if (!newReq[i].email) {
            // if all user do not have email
            if (newReq[i].phone === listFriends[j].phone) {
              listIndex.push(i);
            }
          }
          if (newReq[i].email) {
            // if user already had email
            if (newReq[i].email === listFriends[j].email) {
              listIndex.push(i);
            }
          }
        }
      }
      listIndex.forEach(item => {
        newReq[item].status = true; // is already friend
      });
      setListFindFill([...newReq]);
      return;
    }
    if (listFriends && listFriendsWait && !listRequestFriends) {
      console.log('case 5'); // required add friends
      const newListUserClone = JSON.parse(JSON.stringify(listUsers));
      const listIndexFriendFrind = [];
      const listIndexFriendWait = [];

      // find friend
      for (let i = 0; i < newListUserClone.length; i++) {
        for (let j = 0; j < listFriends.length; j++) {
          if (!newListUserClone[i].email) {
            // if all user do not have email
            if (newListUserClone[i].phone === listFriends[j].phone) {
              listIndexFriendFrind.push(i);
            }
          }
          if (newListUserClone[i].email) {
            // if user already had email
            if (newListUserClone[i].email === listFriends[j].email) {
              listIndexFriendFrind.push(i);
            }
          }
        }
      }
      // find friend wait
      for (let i = 0; i < newListUserClone.length; i++) {
        for (let j = 0; j < listFriendsWait.length; j++) {
          if (!newListUserClone[i].email) {
            // if all user do not have email
            if (newListUserClone[i].phone === listFriendsWait[j].phone) {
              listIndexFriendWait.push(i);
            }
          }
          if (newListUserClone[i].email) {
            // if user already had email
            if (newListUserClone[i].email === listFriendsWait[j].email) {
              listIndexFriendWait.push(i);
            }
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
      const newListUserClone = JSON.parse(JSON.stringify(listUsers));
      const listIndexFriendFrind = [];
      const listIndexFriendWait = [];

      // find friend
      for (let i = 0; i < newListUserClone.length; i++) {
        for (let j = 0; j < listFriends.length; j++) {
          if (!newListUserClone[i].email) {
            // if all user do not have email
            if (newListUserClone[i].phone === listFriends[j].phone) {
              listIndexFriendFrind.push(i);
            }
          }
          if (newListUserClone[i].email) {
            // if user already had email
            if (newListUserClone[i].email === listFriends[j].email) {
              listIndexFriendFrind.push(i);
            }
          }
        }
      }
      // find friend wait
      for (let i = 0; i < newListUserClone.length; i++) {
        for (let j = 0; j < listRequestFriends.length; j++) {
          if (!newListUserClone[i].email) {
            // if all user do not have email
            if (newListUserClone[i].phone === listRequestFriends[j].phone) {
              listIndexFriendWait.push(i);
            }
          }
          if (newListUserClone[i].email) {
            // if user already had email
            if (newListUserClone[i].email === listRequestFriends[j].email) {
              listIndexFriendWait.push(i);
            }
          }
        }
      }

      listIndexFriendFrind.forEach(item => {
        newListUserClone[item].status = true; // is already friend
      });
      listIndexFriendWait.forEach(item => {
        newListUserClone[item].status = 'requested';
      });
      const newlist = newListUserClone.filter(
        user => user.status !== 'requested'
      );
      setListFindFill([...newlist]);
      return;
    }
    if (!listFriends && listFriendsWait && listRequestFriends) {
      console.log('case 7'); // required add friends
      const newListUserClone = JSON.parse(JSON.stringify(listUsers));
      const listIndexFriendFrind = [];
      const listIndexFriendWait = [];

      // find friend
      for (let i = 0; i < newListUserClone.length; i++) {
        for (let j = 0; j < listFriendsWait.length; j++) {
          if (!newListUserClone[i].email) {
            // if all user do not have email
            if (newListUserClone[i].phone === listFriendsWait[j].phone) {
              listIndexFriendFrind.push(i);
            }
          }
          if (newListUserClone[i].email) {
            // if user already had email
            if (newListUserClone[i].email === listFriendsWait[j].email) {
              listIndexFriendFrind.push(i);
            }
          }
        }
      }
      // find friend wait
      for (let i = 0; i < newListUserClone.length; i++) {
        for (let j = 0; j < listRequestFriends.length; j++) {
          if (!newListUserClone[i].email) {
            // if all user do not have email
            if (newListUserClone[i].phone === listRequestFriends[j].phone) {
              listIndexFriendWait.push(i);
            }
          }
          if (newListUserClone[i].email) {
            // if user already had email
            if (newListUserClone[i].email === listRequestFriends[j].email) {
              listIndexFriendWait.push(i);
            }
          }
        }
      }
      listIndexFriendFrind.forEach(item => {
        newListUserClone[item].status = true; // is already friend
      });
      listIndexFriendWait.forEach(item => {
        newListUserClone[item].status = 'requested';
      });
      const newlist = newListUserClone.filter(
        user => user.status !== 'requested'
      );
      setListFindFill([...newlist]);
      return;
    }
    console.log('case 8'); // required add friends
    const newListUserClone = JSON.parse(JSON.stringify(listUsers));
    const listIndexFriendFrind = [];
    const listIndexFriendWait = [];
    const listIndexFriendReq = [];

    // find friend
    for (let i = 0; i < newListUserClone.length; i++) {
      for (let j = 0; j < listFriends.length; j++) {
        if (!newListUserClone[i].email) {
          // if all user do not have email
          if (newListUserClone[i].phone === listFriends[j].phone) {
            listIndexFriendFrind.push(i);
          }
        }
        if (newListUserClone[i].email) {
          // if user already had email
          if (newListUserClone[i].email === listFriends[j].email) {
            listIndexFriendFrind.push(i);
          }
        }
      }
    }
    // find friend wait
    for (let i = 0; i < newListUserClone.length; i++) {
      for (let j = 0; j < listFriendsWait.length; j++) {
        if (!newListUserClone[i].email) {
          // if all user do not have email
          if (newListUserClone[i].phone === listFriendsWait[j].phone) {
            listIndexFriendWait.push(i);
          }
        }
        if (newListUserClone[i].email) {
          // if user already had email
          if (newListUserClone[i].email === listFriendsWait[j].email) {
            listIndexFriendWait.push(i);
          }
        }
      }
    }
    // find friend req
    for (let i = 0; i < newListUserClone.length; i++) {
      for (let j = 0; j < listRequestFriends.length; j++) {
        if (!newListUserClone[i].email) {
          // if all user do not have email
          if (newListUserClone[i].phone === listRequestFriends[j].phone) {
            listIndexFriendReq.push(i);
          }
        }
        if (newListUserClone[i].email) {
          // if user already had email
          if (newListUserClone[i].email === listRequestFriends[j].email) {
            listIndexFriendReq.push(i);
          }
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
    newListUserClone.filter(user => user.status !== 'requested');
    setListFindFill([...newListUserClone]);
  }, [listFriends, listFriendsWait, listRequestFriends, listUsers]);

  return { listFindFill };
};
export default useCheckFriends;
