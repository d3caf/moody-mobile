import React, {FunctionComponent, useState} from 'react';
import {Layout, Input, Text, Button, Spinner} from '@ui-kitten/components';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {AsyncStorage} from 'react-native';

const SIGNIN_USER = gql`
    mutation SignIn($username: String!, $password: String!) {
       signin(username: $username, password: $password) {
           token
       } 
    }
`;

export const Login: FunctionComponent<any> = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, {loading, error}] = useMutation(SIGNIN_USER, {
        async onCompleted({token}) {
           await AsyncStorage.setItem('@Moody_session', token);
        }
    });

    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text category="h1">Login to Moody</Text>
            {error && <Text status="danger">{error.message}</Text>}
            <Layout style={{marginTop: 12, justifyContent: 'center'}}>
                <Input label="Username" placeholder="moody@hogwarts.edu" value={username} onChangeText={setUsername} disabled={loading} />
                <Input label="Password" secureTextEntry value={password} onChangeText={setPassword} disabled={loading} />
                {!loading ? (
                    <Button onPress={() => login({variables: {username, password}})} disabled={!username.length || !password.length || loading}>Login</Button>
                ) : <Spinner />}
                <Button appearance="ghost">Create account</Button>
            </Layout>
        </Layout>
    );
};
