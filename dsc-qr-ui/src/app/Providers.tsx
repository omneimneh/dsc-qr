'use client'

import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import React from "react";

const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache()
});

export default function Providers({children}: {children: React.ReactNode}) {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}