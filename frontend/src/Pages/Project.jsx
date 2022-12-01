import {
  Box,
  Button,
  Checkbox,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChevronDownIcon } from '@chakra-ui/icons';

import ProjectModal from '../Components/ProjectModal';
import { delData, editData, getData } from '../Redux/projects/action';

const Project = () => {
  const [bool, setBool] = useState(0);
  const [isDelete, setDelete] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const projectData = useSelector((state) => state.projectReducer.data);
  const dispatch = useDispatch();
  async function handleDelete(id) {
    await dispatch(delData(id));
    setDelete(true);
    setBool(bool + 1);
    setTimeout(() => {
      setDelete(false);
    }, 1000);
  }

  useEffect(() => {
    dispatch(getData(`http://localhost:8080/projects/`));
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
        <ProjectModal
          title={'Create Project'}
          bool={bool}
          handleBool={setBool}
          isEdit={false}
          data={'Create projects'}
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
                <Th>Privacy</Th>
                <Th>Manage</Th>
                <Th>Client</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projectData &&
                projectData.map((el, i) => (
                  <Tr key={i}>
                    <Td>{el.name}</Td>
                    <Td>{el.privacy}</Td>
                    <Td>{el.manage}</Td>
                
                    <Td>{el.clientId[0]}</Td>
                    <Td>
                      <Flex>
                        <DeleteIcon
                          onClick={() => handleDelete(el._id)}
                          mt='4px'
                          mr='10px'
                        />
                        <ProjectModal
                          title={'Edit Projects '}
                          bool={bool}
                          handleBool={setBool}
                          isEdit={true}
                          id={el._id}
                          data={'Edit Project'}
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

export default Project;
