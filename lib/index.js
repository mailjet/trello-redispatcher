"use strict";

var _nodeTrello = require("node-trello");

var _nodeTrello2 = _interopRequireDefault(_nodeTrello);

var _config = require("../config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var labelsMapping = _config2.default.labels_mapping;
var t = new _nodeTrello2.default(_config2.default.api_key, _config2.default.api_token);

var getDestinationBoard = function getDestinationBoard(labelName) {
	return new Promise(function (resolve, reject) {
		console.log("Moving label", labelName, "to board", labelsMapping[labelName]);
		if (labelMapping[labelName]) {
			resolve(labelMapping[labelName]);
		} else {
			reject("Unknown label " + labelName);
		}
	});
};

var moveCard = function moveCard(card) {
	if (card.idList === _config2.default.done_list_id) return;
	card.labels.map(function (label) {
		getDestinationBoard(label.name.toLowerCase().trim()).then(function (boardID) {
			console.log("Moving " + card.id + " with label " + label.name + " to board " + boardID);
			t.put("/1/cards/" + card.id + "/idBoard", { value: boardID }, function (err, data) {
				console.log("Moved", data);
			}, function (error) {
				return console.error(error);
			});
		});
	});
};

var listCards = function listCards() {
	return new Promise(function (resolve, reject) {
		t.get("/1/boards/" + _config2.default.origin_board_id + "/cards", function (err, data) {
			if (err) reject(err);else resolve(data);
		});
	});
};

listCards().then(function (cards) {
	return Promise.all(cards);
}).then(function (cards) {
	return cards.map(function (card) {
		return moveCard(card);
	});
});
