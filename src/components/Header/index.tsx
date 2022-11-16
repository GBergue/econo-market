import React, { useContext } from 'react';
import {
  HStack,
  Icon,
  VStack,
  Pressable,
  Menu,
  IconButton,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
 import { AntDesign, Feather } from '@expo/vector-icons';
 import Constants from 'expo-constants';

import Text from '../Text';

import api, { clearAuthorization } from '../../api';

import AuthContext from '../../context/AuthContext';
import Heading from '../Heading';


export default function Header ({ allowGoBack = false }) {
  const { setAuthenticated } = useContext(AuthContext);
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  function handleLogout() {
    api.post('/auth/logout')
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setAuthenticated(0);
        clearAuthorization();
      });
  }


  return (
    <VStack
      style={{ paddingTop: Constants.statusBarHeight }}
      bg="primary.500"
      pb={4}
      px={4}
    >
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        {
          allowGoBack && canGoBack && (
            <IconButton
              onPress={() => navigation.goBack()}
              icon={<AntDesign name="arrowleft" size={24} color="white" />}
            />
          )
        }

        <Heading color="white">EconoMarket</Heading>

        <Menu
          offset={30}
          shouldOverlapWithTrigger={false}
          placement="bottom right"
          trigger={triggerProps => (
            <Pressable {...triggerProps}>
              <Icon
                as={Feather}
                name="menu"
                color="white"
                size={8}
              />
            </Pressable>
          )}
        >
          <Menu.Item>
            <Pressable onPress={handleLogout}>
              <Text>Log out</Text>
            </Pressable>
          </Menu.Item>
        </Menu>
      </HStack>
    </VStack>
  );
}
