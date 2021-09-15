import React, {useState} from 'react';
import { Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Modal, ActivityIndicator } from 'react-native'; 

import { LinearGradient } from 'expo-linear-gradient';
import StatusBarPage from '../../components/StatusBarPage';
import Menu from '../../components/Menu';
import ModalLink from '../../components/ModalLink';

import {Feather} from '@expo/vector-icons';
import {ContainerLogo, Logo, ContainerContent,Title, SubTitle, ContainerInput,
         BoxIcon, Input, ButtonLink, BottonLinkText} from './styles';

import api from '../../services/api';
import { saveLink } from '../../utils/storeLinks';



export default function Home(){

  const [loading, setLoading] =useState(false);
  const [input, setInput]= useState('');
  const [modalVisible, setModalVisible]= useState(false);
  const [data, setData] = useState({});

  async function handleShortLink (){
    setLoading(true);

    try{
      const response =await api.post('/shorten',
      {
        long_url:input
      })

      saveLink('LinksCurto', response.data);



      //Deu tudo certo preciso salvar esse link em uma lista nesse STORAGE
      setData(response.data);
      setModalVisible(true);
      Keyboard.dismiss();
      setLoading(false);
      setInput('');

    }catch{
      alert('Ops...Parece que algo deu errado, confirme a URL digitada e tente de novo.');
      Keyboard.dismiss();
      //dismiss fecha o teclado do celular apos dar o erro
      setInput('');
      // apos dar o erro limpa o input e deica ele vazio
      setLoading(false);
      // para de carregar o loading apos o erro
    }

  }

  return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss() }>
        <LinearGradient
        colors={['#32CCBc', '#000' ]}
        style={{flex:1, justifyContent:'center' }}
        >
    
         <StatusBarPage
            barStyle="light-content"
            backgroundColor="#32CCBC"
         />

          <Menu/>

          <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding'  :  'position'} enabled >

            <ContainerLogo>
              <Logo source={require('../../assets/Logo.png')} resizeMode="contain" />
            </ContainerLogo>

            <ContainerContent>
              <Title>Link.Curto</Title>
              <SubTitle>Cole o seu link para encurtar</SubTitle>

              <ContainerInput>
                <BoxIcon>
                  <Feather name="link" size ={22} color="#fff" />
                </BoxIcon>
                
                <Input
                  placeholder="Cole seu link aqui..."
                  placeholderTextColor="white"
                  autoCapitalize="none"
                  autoCorrect={false}
                  KeyboardType="url"
                  value={input}
                  onChangeText={(text) => setInput (text) }
                />
              </ContainerInput>

              <ButtonLink onPress={handleShortLink}>
                {
                  loading ?(
                      <ActivityIndicator color="#121212" size={24}/>
                  ) : (
                    <BottonLinkText>Gerar link curto</BottonLinkText>

                  )
                }
              </ButtonLink>

            </ContainerContent>
          </KeyboardAvoidingView>



          <Modal visible={modalVisible} transparent animationType="slide" >
                <ModalLink onClose={ () => setModalVisible(false) } data ={data} /> 
          </Modal>
        
        </LinearGradient>
      </TouchableWithoutFeedback>

    )
}