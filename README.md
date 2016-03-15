# Introduction

Using [Trello API](https://developers.trello.com/), this [NodeJS script](https://nodejs.org/en/) will move Trello cards from one board to many others.
It's based on the cards' labels to map to the destination board.

# Installation

Clone this repository, edit the `config.json` file (see usage below), run the following commands and get a coffee:
```
$ npm install
$ DEBUG=trello-redispatcher npm start 
```

# Usage

The script is reading the configuration from the `config.json` file. To start, copy the `config.dist.json` file to `config.json`.
Below, the configuration keys definition:
* api_key: your [Trello API key](https://trello.com/app-key)
* api_token: a [Trello API token](https://developers.trello.com/get-started/start-building)
* origin_board_id: the board ID to migrate from
* done_list_id: a list ID to ignore in the migration (here we didn't want to migrate our "Done" lists
* labels_mapping: A JSON object representing where each label from the origin board should go. For instance `{"foobar": "destination_board_id"}`
