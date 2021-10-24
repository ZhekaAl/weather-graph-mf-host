import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";

const city = {
        coord: {
          lat: 59.8944,
          lon: 30.2642,
        },
        rusName: 'Санкт-Петербург',
      };

ReactDOM.render(<App city={city}/>, document.getElementById("root"));
