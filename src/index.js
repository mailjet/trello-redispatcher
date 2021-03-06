import Trello from "node-trello"
import config from '../config.json'

const labelsMapping = config.labels_mapping
const t = new Trello(config.api_key, config.api_token)

const getDestinationBoard = (labelName) => {
	return new Promise((resolve, reject) => {
		console.log("Moving label", labelName, "to board", labelsMapping[labelName])
		if (labelMapping[labelName]) {
			resolve(labelMapping[labelName])
		}
		else {
			reject(`Unknown label ${labelName}`)
		}
	})
}

const moveCard = (card) => {
	if (card.idList === config.done_list_id) return;
	card.labels.map(label => {
		getDestinationBoard(label.name.toLowerCase().trim())
			.then(boardID => {
				console.log(`Moving ${card.id} with label ${label.name} to board ${boardID}`)
				t.put(`/1/cards/${card.id}/idBoard`, { value: boardID }, (err, data) => {
					console.log("Moved", data)
				}, error => console.error(error))
			})
	})
}

const listCards = () => {
	return new Promise((resolve, reject) => {
		t.get(`/1/boards/${config.origin_board_id}/cards`, (err, data) => {
			if (err) reject(err)
			else resolve(data)
		})
	})
}

listCards()
	.then(cards => Promise.all(cards))
	.then(cards => cards.map(card => moveCard(card)))
