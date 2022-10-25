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
 } from 'native-base';
 import { Feather } from '@expo/vector-icons';

import LogoWhite from '@assets/logo_white.svg';

import Text from '../Text';

import api, { clearAuthorization } from '../../api';

import AuthContext from '../../context/AuthContext';


export default function Header ({ title }) {
  const { isAuthenticated, setAuthenticated } = useContext(AuthContext);

  function handleLogout() {
    
    api.post('/auth/logout')
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setAuthenticated(false);
        clearAuthorization();
      });
  }


  return (
    <VStack
      bg="primary.500"
      padding={2}
      pt={8}
    >
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <LogoWhite
          height={75}
          width={75}
        />

        <Popover
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
      </Popover>

        
      </HStack>
    </VStack>
  );
}
