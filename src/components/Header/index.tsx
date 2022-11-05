import React, { useContext } from 'react';
import {
  HStack,
  Icon,
  VStack,
  Popover,
  Box,
  Button,
  Pressable,
  useContrastText,
  Menu,
  HamburgerIcon,
 } from 'native-base';
 import { Feather } from '@expo/vector-icons';

import LogoWhite from '@assets/logo_white.svg';

import Text from '../Text';

import api, { clearAuthorization } from '../../api';

import AuthContext from '../../context/AuthContext';
import Heading from '../Heading';


export default function Header () {
  const { setAuthenticated } = useContext(AuthContext);

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
      bg="primary.500"
      pt={8}
      pb={4}
      px={4}
    >
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* <LogoWhite
          height={75}
          width={75}
        /> */}
        <Heading color="white">EconoMarket</Heading>

        {/* <Popover
          placement='bottom'
          trigger={triggerProps => {
            return (
              <Pressable {...triggerProps}>
                <Icon
                  as={Feather}
                  name="menu"
                  color="white"
                  size={8}
                />
              </Pressable>
            )
          }}>
        <Popover.Content accessibilityLabel="Actions">
          <Popover.Arrow />

          <Popover.Body>
            <Pressable onPress={handleLogout}>
              <Text>Log out</Text>
            </Pressable>
          </Popover.Body>
        </Popover.Content>
      </Popover> */}

      
        <Menu
          offset={70}
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
