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
	const body = req.body;
	if (!body.length === 0)
		return res.json({
			status: 400,
			message: "Body must not be empty",
		});
	const resultArray = Array.from(
		body.map((id) => {
			const idInterger = parseInt(id);
			if (dictionaryMap.has(idInterger))
				return {
					type: 0,
					value: idInterger,
				};
		})
	);
	const shirabeForm = {
		ShirabeJisho: {
			Bookmarks: {
				list: resultArray,
			},
		},
	};
	return res.json(shirabeForm);
}
