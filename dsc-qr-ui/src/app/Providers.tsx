'use client'

import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import React from "react";

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    cache: new InMemoryCache()
});

export default function Providers({children}: {children: React.ReactNode}) {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}