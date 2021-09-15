import styled from 'styled-components/native';
import { Platform } from 'react-native';


export const Container= styled.View`
    flex: 1;
    background-color: #2ccbb9;
    
`;

export const Title= styled.Text`
    margin-top: ${Platform.OS ==='ios' ? 35+'%' : 20+'%' };
    margin-left: 20px;
    font-size: 33px;
    font-weight: bold;
    color: #000;
    
`;

export const ListLinks = styled.FlatList`
`;