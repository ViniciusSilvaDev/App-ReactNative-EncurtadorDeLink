import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';

import Menu from '../../components/Menu';
import StatusBarPage from '../../components/StatusBarPage';
import{ Container, Title, ListLinks } from './styles';
import ListItem from '../../components/ListItem';
import { useIsFocused } from '@react-navigation/native';
import { getLinkSave, deleteLink }from '../../utils/storeLinks';
import ModalLink from '../../components/ModalLink';

export default function MyLinks(){

  const isFocused = useIsFocused();

  const [links, setLinks] = useState([]);
  const [data, setData]= useState ({});
  const [modalVisible, setModalVisible]= useState (false);


  useEffect(()=> {
    async function getLinks(){
      // 'LinksCurto' e a chave key 
      const result =await getLinkSave('LinksCurto');
      setLinks(result);
    }

    getLinks();


  }, [isFocused])

  function handleItem(item){
    setData(item);
    setModalVisible(true);
  }

  async function handleDelete(id){
   const result =await deleteLink(links,id);
   setLinks(result);
  }

    return(
        <Container>
          <StatusBarPage
            barStyle="light-content"
            backgroundColor="#2ccbb9"
          />

          <Menu/>

           <Title>Meus links</Title>

           <ListLinks
              data={links}
              keyExtractor={(item) => String (item.id)}
              renderItem={({item}) => <ListItem data={item} selectedItem ={handleItem} deleteItem={handleDelete} /> }
              contentContainerStyle={{paddingBottom: 20  }}
              showsVerticalScroLLIndicator={false}
           />

          <Modal visible={modalVisible} transparent animationType="slide" >
            <ModalLink onClose={ () => setModalVisible(false) } data ={data} /> 
          </Modal>
           
        </Container>
    )
}