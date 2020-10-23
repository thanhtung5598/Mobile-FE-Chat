import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Content,
  Tabs,
  Tab,
  Spinner,
  View
} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import useCheckFriend from 'components/common/hook/useCheckFriend';

const avatarDefault =
  'https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar.png';

const FindFriends = props => {
  const { handleAddFriend } = props;
  const { isLoading, listUsers } = useSelector(state => state.listUsers);
  const { listFriends, listFriendsWait, listRequestFriends } = useSelector(
    state => state.friends
  );
  const { listFindFill } = useCheckFriend({
    listUsers,
    listFriends,
    listFriendsWait,
    listRequestFriends
  });
  // console.log(listFindFill);
  // useEffect(() => {
  //   if (!listUsers) {
  //     setListFindFill([]);
  //     return;
  //   }
  //   if (!listFriends && !listFriendsWait && !listRequestFriends) {
  //     console.log('case 1');
  //     setListFindFill([...listUsers]);
  //     return;
  //   }
  //   if (!listFriends && !listFriendsWait && listRequestFriends) {
  //     console.log('case 2'); // required add friends
  //     const newReq = JSON.parse(JSON.stringify(listUsers));
  //     const listIndex = [];
  //     // find friend
  //     for (let i = 0; i < newReq.length; i++) {
  //       for (let j = 0; j < listRequestFriends.length; j++) {
  //         if (!newReq[i].email) {
  //           // if all user do not have email
  //           if (newReq[i].phone === listRequestFriends[j].phone) {
  //             listIndex.push(i);
  //           }
  //         }
  //         if (newReq[i].email) {
  //           // if user already had email
  //           if (newReq[i].email === listRequestFriends[j].email) {
  //             listIndex.push(i);
  //           }
  //         }
  //       }
  //       listIndex.forEach(item => {
  //         newReq[item].status = 'requested'; // is already friend
  //       });
  //       const newlist = newReq.filter(user => user.status !== 'requested');
  //       setListFindFill([...newlist]);
  //       return;
  //     }
  //   }
  //   if (!listFriends && listFriendsWait && !listRequestFriends) {
  //     console.log('case 3'); // required add friends
  //     const newReq = JSON.parse(JSON.stringify(listUsers));
  //     const listIndex = [];
  //     // find friend
  //     for (let i = 0; i < newReq.length; i++) {
  //       for (let j = 0; j < listFriendsWait.length; j++) {
  //         if (!newReq[i].email) {
  //           // if all user do not have email
  //           if (newReq[i].phone === listFriendsWait[j].phone) {
  //             listIndex.push(i);
  //           }
  //         }
  //         if (newReq[i].email) {
  //           // if user already had email
  //           if (newReq[i].email === listFriendsWait[j].email) {
  //             listIndex.push(i);
  //           }
  //         }
  //       }
  //       listIndex.forEach(item => {
  //         newReq[item].status = false; // is already friend
  //       });
  //       setListFindFill([...newReq]);
  //       return;
  //     }
  //   }
  //   if (listFriends && !listFriendsWait && !listRequestFriends) {
  //     console.log('case 4'); // required add friends
  //     const newReq = JSON.parse(JSON.stringify(listUsers));
  //     const listIndex = [];
  //     // find friend
  //     for (let i = 0; i < newReq.length; i++) {
  //       for (let j = 0; j < listFriends.length; j++) {
  //         if (!newReq[i].email) {
  //           // if all user do not have email
  //           if (newReq[i].phone === listFriends[j].phone) {
  //             listIndex.push(i);
  //           }
  //         }
  //         if (newReq[i].email) {
  //           // if user already had email
  //           if (newReq[i].email === listFriends[j].email) {
  //             listIndex.push(i);
  //           }
  //         }
  //       }
  //       listIndex.forEach(item => {
  //         newReq[item].status = true; // is already friend
  //       });
  //       setListFindFill([...newReq]);
  //       return;
  //     }
  //   }
  //   if (listFriends && listFriendsWait && !listRequestFriends) {
  //     console.log('case 5'); // required add friends
  //     const newListUserClone = JSON.parse(JSON.stringify(listUsers));
  //     const listIndexFriendFrind = [];
  //     const listIndexFriendWait = [];

  //     // find friend
  //     for (let i = 0; i < newListUserClone.length; i++) {
  //       for (let j = 0; j < listFriends.length; j++) {
  //         if (!newListUserClone[i].email) {
  //           // if all user do not have email
  //           if (newListUserClone[i].phone === listFriends[j].phone) {
  //             listIndexFriendFrind.push(i);
  //           }
  //         }
  //         if (newListUserClone[i].email) {
  //           // if user already had email
  //           if (newListUserClone[i].email === listFriends[j].email) {
  //             listIndexFriendFrind.push(i);
  //           }
  //         }
  //       }
  //     }
  //     // find friend wait
  //     for (let i = 0; i < newListUserClone.length; i++) {
  //       for (let j = 0; j < listFriendsWait.length; j++) {
  //         if (!newListUserClone[i].email) {
  //           // if all user do not have email
  //           if (newListUserClone[i].phone === listFriendsWait[j].phone) {
  //             listIndexFriendWait.push(i);
  //           }
  //         }
  //         if (newListUserClone[i].email) {
  //           // if user already had email
  //           if (newListUserClone[i].email === listFriendsWait[j].email) {
  //             listIndexFriendWait.push(i);
  //           }
  //         }
  //       }
  //     }
  //     listIndexFriendFrind.forEach(item => {
  //       newListUserClone[item].status = true; // is already friend
  //     });
  //     listIndexFriendWait.forEach(item => {
  //       newListUserClone[item].status = false;
  //     });
  //     setListFindFill([...newListUserClone]);
  //     return;
  //   }
  //   if (listFriends && !listFriendsWait && listRequestFriends) {
  //     console.log('case 6'); // required add friends
  //     const newListUserClone = JSON.parse(JSON.stringify(listUsers));
  //     const listIndexFriendFrind = [];
  //     const listIndexFriendWait = [];

  //     // find friend
  //     for (let i = 0; i < newListUserClone.length; i++) {
  //       for (let j = 0; j < listFriends.length; j++) {
  //         if (!newListUserClone[i].email) {
  //           // if all user do not have email
  //           if (newListUserClone[i].phone === listFriends[j].phone) {
  //             listIndexFriendFrind.push(i);
  //           }
  //         }
  //         if (newListUserClone[i].email) {
  //           // if user already had email
  //           if (newListUserClone[i].email === listFriends[j].email) {
  //             listIndexFriendFrind.push(i);
  //           }
  //         }
  //       }
  //     }
  //     // find friend wait
  //     for (let i = 0; i < newListUserClone.length; i++) {
  //       for (let j = 0; j < listRequestFriends.length; j++) {
  //         if (!newListUserClone[i].email) {
  //           // if all user do not have email
  //           if (newListUserClone[i].phone === listRequestFriends[j].phone) {
  //             listIndexFriendWait.push(i);
  //           }
  //         }
  //         if (newListUserClone[i].email) {
  //           // if user already had email
  //           if (newListUserClone[i].email === listRequestFriends[j].email) {
  //             listIndexFriendWait.push(i);
  //           }
  //         }
  //       }
  //     }

  //     listIndexFriendFrind.forEach(item => {
  //       newListUserClone[item].status = true; // is already friend
  //     });
  //     listIndexFriendWait.forEach(item => {
  //       newListUserClone[item].status = 'requested';
  //     });
  //     const newlist = newReq.filter(user => user.status !== 'requested');
  //     setListFindFill([...newlist]);
  //     return;
  //   }
  //   if (!listFriends && listFriendsWait && listRequestFriends) {
  //     console.log('case 7'); // required add friends
  //     const newListUserClone = JSON.parse(JSON.stringify(listUsers));
  //     const listIndexFriendFrind = [];
  //     const listIndexFriendWait = [];

  //     // find friend
  //     for (let i = 0; i < newListUserClone.length; i++) {
  //       for (let j = 0; j < listFriendsWait.length; j++) {
  //         if (!newListUserClone[i].email) {
  //           // if all user do not have email
  //           if (newListUserClone[i].phone === listFriendsWait[j].phone) {
  //             listIndexFriendFrind.push(i);
  //           }
  //         }
  //         if (newListUserClone[i].email) {
  //           // if user already had email
  //           if (newListUserClone[i].email === listFriendsWait[j].email) {
  //             listIndexFriendFrind.push(i);
  //           }
  //         }
  //       }
  //     }
  //     // find friend wait
  //     for (let i = 0; i < newListUserClone.length; i++) {
  //       for (let j = 0; j < listRequestFriends.length; j++) {
  //         if (!newListUserClone[i].email) {
  //           // if all user do not have email
  //           if (newListUserClone[i].phone === listRequestFriends[j].phone) {
  //             listIndexFriendWait.push(i);
  //           }
  //         }
  //         if (newListUserClone[i].email) {
  //           // if user already had email
  //           if (newListUserClone[i].email === listRequestFriends[j].email) {
  //             listIndexFriendWait.push(i);
  //           }
  //         }
  //       }
  //     }
  //     listIndexFriendFrind.forEach(item => {
  //       newListUserClone[item].status = true; // is already friend
  //     });
  //     listIndexFriendWait.forEach(item => {
  //       newListUserClone[item].status = 'requested';
  //     });
  //     const newlist = newReq.filter(user => user.status !== 'requested');
  //     setListFindFill([...newlist]);
  //     return;
  //   }
  //   console.log('case 8'); // required add friends
  //   const newListUserClone = JSON.parse(JSON.stringify(listUsers));
  //   const listIndexFriendFrind = [];
  //   const listIndexFriendWait = [];
  //   const listIndexFriendReq = [];

  //   // find friend
  //   for (let i = 0; i < newListUserClone.length; i++) {
  //     for (let j = 0; j < listFriends.length; j++) {
  //       if (!newListUserClone[i].email) {
  //         // if all user do not have email
  //         if (newListUserClone[i].phone === listFriends[j].phone) {
  //           listIndexFriendFrind.push(i);
  //         }
  //       }
  //       if (newListUserClone[i].email) {
  //         // if user already had email
  //         if (newListUserClone[i].email === listFriends[j].email) {
  //           listIndexFriendFrind.push(i);
  //         }
  //       }
  //     }
  //   }
  //   // find friend wait
  //   for (let i = 0; i < newListUserClone.length; i++) {
  //     for (let j = 0; j < listRequestFriends.length; j++) {
  //       if (!newListUserClone[i].email) {
  //         // if all user do not have email
  //         if (newListUserClone[i].phone === listRequestFriends[j].phone) {
  //           listIndexFriendWait.push(i);
  //         }
  //       }
  //       if (newListUserClone[i].email) {
  //         // if user already had email
  //         if (newListUserClone[i].email === listRequestFriends[j].email) {
  //           listIndexFriendWait.push(i);
  //         }
  //       }
  //     }
  //   }
  //   // find friend req
  //   for (let i = 0; i < newListUserClone.length; i++) {
  //     for (let j = 0; j < listRequestFriends.length; j++) {
  //       if (!newListUserClone[i].email) {
  //         // if all user do not have email
  //         if (newListUserClone[i].phone === listRequestFriends[j].phone) {
  //           listIndexFriendReq.push(i);
  //         }
  //       }
  //       if (newListUserClone[i].email) {
  //         // if user already had email
  //         if (newListUserClone[i].email === listRequestFriends[j].email) {
  //           listIndexFriendReq.push(i);
  //         }
  //       }
  //     }
  //   }
  //   listIndexFriendFrind.forEach(item => {
  //     newListUserClone[item].status = true; // is already friend
  //   });
  //   listIndexFriendWait.forEach(item => {
  //     newListUserClone[item].status = false;
  //   });
  //   listIndexFriendReq.forEach(item => {
  //     newListUserClone[item].status = 'requested';
  //   });
  //   newListUserClone.filter(user => user.status !== 'requested');
  //   setListFindFill([...newListUserClone]);
  // }, [listFriends, listFriendsWait, listRequestFriends, listUsers]);

  return (
    <Content>
      <Tabs
        tabBarUnderlineStyle={{
          backgroundColor: 'white',
          height: 0
        }}
      >
        <Tab
          activeTabStyle={{ backgroundColor: 'white' }}
          activeTextStyle={{ color: '#2196f3', fontWeight: '700' }}
          heading="All Result"
        >
          {isLoading && <Spinner />}
          {!isLoading && listFindFill?.length === 0 && (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={{ color: '#AAA', fontSize: 30 }}>Nothing found</Text>
            </View>
          )}
          {listFindFill?.map((item, index) => {
            return (
              <ListItem key={index} thumbnail style={{ paddingBottom: 12 }}>
                <Left>
                  <Thumbnail
                    rounded
                    source={{ uri: item.avatar || avatarDefault }}
                  />
                </Left>
                <Body style={{ borderBottomColor: 'white' }}>
                  <Text>{item.name}</Text>
                  <Text note numberOfLines={1}>
                    {item.status === true
                      ? `Phone number ${item.phone}`
                      : 'Maybe you know'}
                  </Text>
                </Body>
                <Right style={{ borderBottomWidth: 0 }}>
                  {item.status === undefined && (
                    <LinearGradient
                      start={{ x: -1, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#2962ff', '#0cb3ff']}
                      style={styles.LinearGradientProfile}
                    >
                      <TouchableOpacity
                        style={styles.UpdateProfile}
                        onPress={() => handleAddFriend(item.id)}
                      >
                        <Text style={styles.UpdatedProfileText}>
                          Add friend
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  )}
                  {item.status === true && (
                    <LinearGradient
                      start={{ x: -1, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#2962ff', '#0cb3ff']}
                      style={styles.LinearGradientProfile}
                    ></LinearGradient>
                  )}
                  {item.status === false && (
                    <LinearGradient
                      start={{ x: -1, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#a5d6a7', '#4caf50']}
                      style={styles.LinearGradientProfile}
                    >
                      <TouchableOpacity style={styles.UpdateProfile} disabled>
                        <Text style={styles.UpdatedProfileText}>
                          Waiting...
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  )}
                </Right>
              </ListItem>
            );
          })}
        </Tab>
      </Tabs>
    </Content>
  );
};

export default FindFriends;

FindFriends.propTypes = {
  handleAddFriend: PropTypes.func
};
FindFriends.defaultProps = {
  handleAddFriend: () => {}
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  LinearGradientProfile: {
    borderRadius: 18,
    alignSelf: 'center',
    marginTop: 10,
    paddingRight: 15,
    paddingLeft: 15
  },
  UpdatedProfileText: {
    color: 'white'
  },
  UpdateProfile: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35
  },
  rect: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  icon: {
    fontSize: 30,
    marginRight: 20
  },
  login: {
    fontSize: 20,
    fontWeight: '500'
  }
});
