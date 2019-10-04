var buildingList = [
	"townhall",
	"lumber_mill",
	"farm",
	"mine",
	"alchemy_lab",
	"barn",
	"wood_storage",
	"makosza",
	"lada",
	"rod",
	"swarog",
	"perun",
	"weles",
	"altar",
	"tavern",
	"outpost"]

document.getElementById('read').onclick = function() {
	let rawStringData = document.getElementById('rawdata').value
	let rawJsonData = JSON.parse(rawStringData)
	
	let map = rawJsonData.map
	let data = {
		players: {}
	}

	for (var si = 0; si < map.length; si++) {
		let sector = map[si]
		if (!data.players.hasOwnProperty(sector.cache.player)) {
 			data.players[sector.cache.player] = {
 				buildings : {}
 			}
		}
		for (var bi = 0; bi < sector.buildings.length; bi++) {
			let building = sector.buildings[bi]
			if (!data.players[sector.cache.player].buildings.hasOwnProperty(buildingList[building.kind])) {
				data.players[sector.cache.player].buildings[buildingList[building.kind]] = []
			}
			let buildingText = buildingList[building.kind] + " : "
			for (var ui = 0; ui < building.lvl.length; ui++) {
				if (ui !== 0) {
					buildingText += ", "
				}
				buildingText += "Upgrade " + ui + " Level "  + building.lvl[ui] + " + " + building.lvlBonus[ui]
			}
			data.players[sector.cache.player].buildings[buildingList[building.kind]].push(buildingText)
		}
	}

	// calculations done
	// now print
	let resultText = ""
	console.log(data.players)
	for (var pn in data.players) {
		let player = data.players[pn]
		console.log(player)
		let playerText = ""
		for (var bt in player.buildings) {
			let buildingtype = player.buildings[bt]
			for (var uti = 0; uti < buildingtype.length; uti++) {
				playerText += "<span class=\"building\">" + buildingtype[uti] + "</span><br>"
			}
		}

		resultText += "<div><h3>" + pn + "'s buildings</h3>" + playerText + "</div><br>"
	}	
	document.getElementById('results').innerHTML = resultText
	console.log(resultText)
}