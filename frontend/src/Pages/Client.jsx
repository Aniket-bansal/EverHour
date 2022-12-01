import {
  Checkbox,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChevronDownIcon } from '@chakra-ui/icons';

import Modalclient from '../Components/Modalclient';
import { delData, getData } from '../Redux/clients/action';

const Client = () => {
  const [bool, setBool] = useState(0);
  const [isDelete, setDelete] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const clientData = useSelector((state) => state.clientReducer.data);
  const dispatch = useDispatch();
  function handleDelete(id) {
    dispatch(delData(id));
    setDelete(true);
    setBool(bool + 1);
    setTimeout(() => {
      setDelete(false);
    }, 1000);
  }

  useEffect(() => {
    dispatch(getData(`http://localhost:8080/clients/`));
  }, [bool]);

  return (
    <>
      {isDelete ? (
        <Alert status='warning'>
          <AlertIcon />
          Your project has been deleted!
        </Alert>
      ) : (
        <></>
      )}

      {isUpdate ? (
        <Alert status='success' variant='subtle'>
          <AlertIcon />
          Project has been updated successfully!
        </Alert>
      ) : (
        <></>
      )}
      <Flex h='50px' w='95%' justify='space-between' m='auto' align='center'>
        <Text fontSize='22px' color='black'>
          Create Projects
        </Text>
        <Modalclient
          title={'Create clients'}
          bool={bool}
          handleBool={setBool}
          isEdit={false}
          data={'Create clients'}
        />
      </Flex>

      <Flex
        w='95%'
        m='auto'
        bg='#f9f9f9'
        mt='25px'
        h='50px'
        justify='space-between'
      >
        <Checkbox defaultChecked>Select all</Checkbox>
        <Flex w='33%' gap='10px'>
          <Menu bg='white'>
            <MenuButton
              px={4}
              py={2}
              transition='all 0.2s'
              borderRadius='md'
              borderWidth='1px'
              _hover={{ bg: 'gray.400' }}
              _expanded={{ bg: 'blue.400' }}
              _focus={{ boxShadow: 'outline' }}
            >
              <Text fontSize='12px' color='grey'>
                Group By
              </Text>
              File <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem>New File</MenuItem>
              <MenuItem>New Window</MenuItem>
              <MenuDivider />
              <MenuItem>Open...</MenuItem>
              <MenuItem>Save File</MenuItem>
            </MenuList>
          </Menu>

          <Menu bg='white'>
            <MenuButton
              px={4}
              py={2}
              transition='all 0.2s'
              borderRadius='md'
              borderWidth='1px'
              _hover={{ bg: 'gray.400' }}
              _expanded={{ bg: 'blue.400' }}
              _focus={{ boxShadow: 'outline' }}
            >
              <Text fontSize='12px' color='grey'>
                FILTER
              </Text>
              File <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem>New File</MenuItem>
              <MenuItem>New Window</MenuItem>
              <MenuDivider />
              <MenuItem>Open...</MenuItem>
              <MenuItem>Save File</MenuItem>
            </MenuList>
          </Menu>

          <Input w='55%' placeholder='Basic usage' />
        </Flex>
      </Flex>
      <Flex
        bg='#f9f9f9'
        w='95%'
        m='auto'
        h='30px'
        pl='10px'
        mt='25px'
        pr='180px'
        justify='space-between'
        align='center'
      >
        <Text fontSize='12px' color='grey'>
          Name
        </Text>
        <Text fontSize='12px' color='grey'>
          BUDGET
        </Text>
      </Flex>
      <Flex>
        <TableContainer w='100%'>
          <Table variant='striped' colorScheme='teal'>
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Project</Th>
                <Th>BUDGET</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {clientData &&
                clientData.map((el, i) => (
                  <Tr key={i}>
                    <Td>{el.Client_name}</Td>
                    <Td>{el.Projects[0]}</Td>
                    {el.Discount == undefined || el.Discount == null ? (
                      <Td isNumeric pr='250px'>
                        No budget
                      </Td>
                    ) : (
                      <Td isNumeric pr='250px'>
                        {el.Discount}
                      </Td>
                    )}
                    <Td>
                      <Flex>
                        <DeleteIcon
                          onClick={() => handleDelete(el._id)}
                          mt='4px'
                          mr='10px'
                        />
                        <Modalclient
                          title={'Edit Clients '}
                          bool={bool}
                          handleBool={setBool}
                          isEdit={true}
                          id={el._id}
                          data={'Edit Client'}
                          handleUpdate={setUpdate}
                          isUpdate={isUpdate}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};

export default Client;
