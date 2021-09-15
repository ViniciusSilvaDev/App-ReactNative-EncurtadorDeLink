import axios from 'axios';


/* Há chave key e unica para cada pessoa e você consegue ela acessando o site oficial do bitly, onde você deve 
fazer o cadastro e procurar pela Api, depois disso você pega essa chave key e troca pelos caracteres abaixo.... */

// base url:    https://api-ssl.bitly.com/v4/ ,

export const key = 'd237b9de3fbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

const api = axios.create({
  baseURL: 'https://api-ssl.bitly.com/v4',
  headers:{
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${key}`
  }
})

export default api;