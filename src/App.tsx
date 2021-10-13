// import * as React from "react";

// import LocalButton from "./Button";

// const App = () => (
//   <div>
//     <h1>Typescript</h1>
//     <h2>App 2</h2>
//     <LocalButton />
//   </div>
// );

import './index.css';
import './App.css';

import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

import LocalButton from "./Button";

import {Chart} from './components/chart';

const queryClient = new QueryClient();

function App(): React.ReactElement {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Chart />
                <LocalButton />
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

function App2(): React.ReactElement {
    return (
       
            <div className="App">
                <Chart />
                <LocalButton />
            </div>
           
    );
}


export default App;
