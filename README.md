# The Busy Gamer App API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/EmilioBlacksmith/TheBusyGamerAppAPI/blob/main/LICENSE)

## A NodeJS app made using the HowLongToBeat API

This backend NodeJS App using ExpressJS, and interconnected with HowLongToBeat API by Christian Katzorke. It's meant to be a REST-ish(GET Request Only) API made for in conjunction with the Busy Gamer App.

### What's the Busy Gamer App

The Busy Gamer App, allows you to track the videogames that you want to play, and it helps you to calculate approximately how long it’s going to take you to finish all those games. (not everyone can play more than 2 hours a day :c )

- **The Busy Gamer App is almost done, so in the meantime the link to it will be empty, until it gets published**

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example-request)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgments)

## Installation

To use this NodeJS App you should first install it by following the next step-by-step instructions in your terminal.

```bash

# Clone the repository
git clone https://github.com/EmilioBlacksmith/TheBusyGamerAppAPI.git

# Navigate to the project directory
cd TheBusyGamerAppAPI

# Install dependencies
npm install

```

## Usage

In order to run this NodeJS app, run the next command in your terminal.

```bash
# Run the app
npm start
```

Once you run it it will receive the next message from the CLI:

```bash
// Server is running on: 4000
// CTRL + C to close server...
```

Now you can now use the API with the **localhost:4000** endpoint.

### How to make a search request?

Once you have the app running, you can call the next endpoint to make a search request with a query.

```bash
localhost:4000/search?q=[insert-your-search-query-here]
```

Inside your web app it's recommended to encode your query with encodeURIComponent() in order to not get any artifacts when searching.

### How to make a request of the TOP 25 games right now?

Once you have the app running, you can call the next endpoint to make a request of the top 25 games currently being played the most by the How Long To Beat Users.

```bash
localhost:4000/topGames
```

### What If I want to make a manual update of the TOP 25 games?

In the case you want to do a manual update of the topGames.json, you can call the next.

```bash
localhost:4000/manual-update
```

!! take into account that it takes around 5 to 8 seconds approximately to fully make an update of the latest top 25 games, due to it being a web scrapping code that I did for this app's purpose.

## Example Request

The next is an example of a search request using REACT for demonstrations purposes.

```jsx
import React, { useState, useEffect } from "react";

// URL where we do the GET Request
const searchURL = "http://localhost:4000/search?q=";

export default function SearchFunction() {
    // This UseState is where we store the searched games
	const [dataSearched, setDataSearched] = useState([]);

    // This UseEffect is the initial action for searching the solicited game
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // In this example I will search the Yakuza Games
                const valueSearched = encodeURIComponent("Yakuza");
                let search = searchURL + valueSearched;
                const response = await fetch(search);

                // Check if there was any error
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                //Get the JSON file from the API
                const jsonData = await response.json();

                //handle error if needed, or just change the data with the json received from the API
                if (jsonData.error && jsonData.error === "Search query not found") {
                    setDataSearched([]);
                } else {
                    setDataSearched(jsonData);
                }
            }catch(error)
            {
                console.error("Error fetching data:", error.message);
            }
        }
	}, []);

    // Display the games found in the search request in a ordered list.
    return(
        <div>
            <ol>
                {dataSearched.map((item) => {
                    <li key={item.id}>{item.name} || {item.imageURL} || It takes {item.gameplayMain} Hours to finish it, if you focus on Main Story only.</li>
                })}
            <ol>
        </div>
    );
}
```

## Contributing

If you found an issue or would like to submit an improvement to this project, please submit an issue using the issues tab above.

## Like this project?

Star it or share it to anyone that would find it useful for their own purpose and project. And feel free to follow my socials if you want to support more of this.

## Acknowledgments

- **Christian Katzorke's HowLongToBeat API** - Special Thanks to Christian, invaluable HowLongToBeat API, this NodeJS wouldn't be possible without it, due to it making most of the heavy lifting for searching and getting the data from the website. (https://github.com/ckatzorke/howlongtobeat)

## Technologies used in this API/NodeJS

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)