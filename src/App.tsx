import './index.css';
import './App.css';

import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

import LocalButton from "./Button";

import {Chart} from './components/chart';
import { City } from './store/types';

const queryClient = new QueryClient();

function App({city}: {city: City}): React.ReactElement {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Chart city= {city} />
                {/* <LocalButton /> */}
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}



export default App;
