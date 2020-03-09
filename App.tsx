import React, {FunctionComponent} from 'react';
import {AsyncStorage, SafeAreaView} from 'react-native';
import {ApplicationProvider, Divider, Layout, TopNavigation} from '@ui-kitten/components';
import {mapping, dark as darkTheme} from '@eva-design/eva';
import {setContext} from 'apollo-link-context';
import {ApolloProvider} from '@apollo/react-hooks';
import {createHttpLink} from 'apollo-link-http';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';

import {Login} from './views';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/api'
});

const authLink = setContext(async (_, {headers}) => {
    const token = await AsyncStorage.getItem('@Moody_auth');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export const App: FunctionComponent<{}> = props => {
    return (
        <ApolloProvider client={client}>
            <ApplicationProvider theme={darkTheme} mapping={mapping}>
                <SafeAreaView style={{flex: 1}}>
                    <TopNavigation title="Moody" alignment="center" />
                    <Divider />
                    <Login/>
                </SafeAreaView>
            </ApplicationProvider>
        </ApolloProvider>
    );
};

export default App;
