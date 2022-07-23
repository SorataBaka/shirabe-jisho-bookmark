const fs = require("fs");
const path = require("path");
const dictionary = fs.readFileSync(path.resolve("./pages/api/dictionary.json"));
const dictionaryJson = JSON.parse(dictionary);
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
		const filtered = dictionaryJson.filter((item) => {
			if (item.id === jishoObject.value) console.log(true);
			return parseInt(item.id) == jishoObject.value;
		});
		if (filtered.length !== 0) resultArray.push(filtered[0]);
	}
	return res.json({
		status: 200,
		data: {
			count: resultArray.length,
			words: resultArray,
		},
	});
}
