const fs = require("fs");
const path = require("path");

const source = fs.readFileSync(
	__dirname + "/../dictionary/json/jmdict-eng-3.1.0.json"
);
const sourcejson = JSON.parse(source);

const outputjson = Array.from(
	sourcejson.words.map((word) => {
		console.log(
			`Kanji: ${word.kanji[0]?.text || "Kanji Not Found"} \nSpelling: ${
				word.kana[0]?.text || "Kana Not Found"
			}`
		);
		return {
			id: word.id,
			kanji: word.kanji[0]?.text || null,
			kana: word.kana[0]?.text || null,
			meaning: word.sense[0]?.gloss[0]?.text || null,
		};
	})
);
console.log(outputjson);
fs.writeFileSync("dictionary.json", JSON.stringify(outputjson));
