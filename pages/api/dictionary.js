const fs = require("fs");
const path = require("path");
const wanakana = require("wanakana");
const dictionary = fs.readFileSync(path.resolve("./pages/api/dictionary.json"));
const dictionaryJson = JSON.parse(dictionary);
export default function handler(req, res) {
	const queries = req.query;
	const searchQuery = queries.q || undefined;
	if (!searchQuery)
		return res.json({
			status: 400,
			message: "No search query provided",
		});
	const converted = wanakana.isRomaji(searchQuery)
		? wanakana.toKana(searchQuery)
		: searchQuery;
	const searchResult = dictionaryJson.filter(
		(word) =>
			word.kanji === searchQuery ||
			word.kana === converted ||
			word.id === searchQuery
	);
	return res.json({
		status: 200,
		data: {
			count: searchResult.length,
			words: searchResult,
		},
	});
}
