'use client';

import { AlchemyClientState } from '@account-kit/core';
import { AlchemyAccountProvider } from '@account-kit/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { config, queryClient } from './config';
import { ReduxProvider } from '@/redux/provider';

export const Providers = (
    props: PropsWithChildren<{ initialState?: AlchemyClientState }>
) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AlchemyAccountProvider
                config={config}
                queryClient={queryClient}
                initialState={props.initialState}
            >
                <ReduxProvider>{props.children}</ReduxProvider>
            </AlchemyAccountProvider>
        </QueryClientProvider>
    );
};
