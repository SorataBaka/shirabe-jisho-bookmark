const fs = require("fs");
const path = require("path");
const dictionary = fs.readFileSync(path.resolve("./pages/api/dictionary.json"));
const dictionaryJson = JSON.parse(dictionary);
const dictionaryMap = new Map(
	dictionaryJson.map((word) => [parseInt(word.id), word])
);
export default function handler(req, res) {
	if (req.method !== "POST")
		return res.status(405).json({ status: 405, message: "Method not allowed" });
	const body = JSON.parse(req.body);
	if (body.length === 0)
		return res.json({
			status: 400,
			message: "Body must not be empty",
		});
	var resultArray = [];
	for (const jishoObject of body) {
		const result = dictionaryMap.get(jishoObject.value);
		if (result) resultArray.push(result);
	}
	return res.json({
		status: 200,
		data: {
			count: resultArray.length,
			words: resultArray,
		},
	});
}
