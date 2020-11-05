import React from 'react';
import { ListItem, Text, Radio, Right, Left } from 'native-base';
const CreateGroup = () => {
  return (
    <>
      <ListItem selected={false}>
        <Left>
          <Text>Lunch Break</Text>
        </Left>
        <Right>
          <Radio color={'#f0ad4e'} selectedColor={'#5cb85c'} />
        </Right>
      </ListItem>
      <ListItem selected={true}>
        <Left>
          <Text>Discussion with Client</Text>
        </Left>
        <Right>
          <Radio color={'#f0ad4e'} selectedColor={'#5cb85c'} selected={true} />
        </Right>
      </ListItem>
    </>
  );
};

export default CreateGroup;
