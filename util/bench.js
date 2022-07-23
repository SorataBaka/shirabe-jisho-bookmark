const fs = require("fs");
const fileRead = fs.readFileSync("./pages/api/dictionary.json");

const fileJson = JSON.parse(fileRead);
const fileMap = new Map(fileJson.map((item) => [parseInt(item.id), item]));

const testInput = [
	{ type: 0, value: 1537770 },
	{ type: 0, value: 1487660 },
	{ type: 0, value: 1311530 },
	{ type: 0, value: 1327720 },
	{ type: 0, value: 1168320 },
	{ type: 0, value: 1590770 },
	{ type: 0, value: 1499330 },
	{ type: 0, value: 1316300 },
	{ type: 0, value: 1548370 },
	{ type: 0, value: 1318610 },
	{ type: 0, value: 1318340 },
	{ type: 0, value: 1154860 },
	{ type: 0, value: 1757350 },
	{ type: 0, value: 1348430 },
	{ type: 0, value: 1532350 },
	{ type: 0, value: 1386460 },
	{ type: 0, value: 1477910 },
	{ type: 0, value: 1351700 },
	{ type: 0, value: 1154330 },
	{ type: 0, value: 1532380 },
	{ type: 0, value: 1586910 },
	{ type: 0, value: 1310730 },
	{ type: 0, value: 1379060 },
	{ type: 0, value: 1310870 },
	{ type: 0, value: 1293700 },
	{ type: 0, value: 1293810 },
	{ type: 0, value: 1293990 },
	{ type: 0, value: 1293850 },
	{ type: 0, value: 1294220 },
	{ type: 0, value: 1293780 },
	{ type: 0, value: 1293940 },
	{ type: 0, value: 1188730 },
	{ type: 0, value: 1294940 },
	{ type: 0, value: 1600790 },
	{ type: 0, value: 1541620 },
	{ type: 0, value: 1541690 },
	{ type: 0, value: 1558670 },
	{ type: 0, value: 1343080 },
	{ type: 0, value: 1558920 },
	{ type: 0, value: 1558760 },
	{ type: 0, value: 1370420 },
	{ type: 0, value: 1371820 },
	{ type: 0, value: 1217730 },
	{ type: 0, value: 1217820 },
	{ type: 0, value: 1390940 },
	{ type: 0, value: 1582310 },
	{ type: 0, value: 1450690 },
	{ type: 0, value: 1592270 },
	{ type: 0, value: 1329300 },
	{ type: 0, value: 1499400 },
	{ type: 0, value: 1409140 },
	{ type: 0, value: 1409760 },
	{ type: 0, value: 1589320 },
	{ type: 0, value: 1336820 },
	{ type: 0, value: 1409540 },
	{ type: 0, value: 1252560 },
	{ type: 0, value: 1408180 },
	{ type: 0, value: 1408220 },
	{ type: 0, value: 1295510 },
	{ type: 0, value: 1360680 },
	{ type: 0, value: 1295530 },
	{ type: 0, value: 2012070 },
	{ type: 0, value: 1195960 },
	{ type: 0, value: 1196030 },
	{ type: 0, value: 1202450 },
	{ type: 0, value: 1202440 },
	{ type: 0, value: 1202880 },
	{ type: 0, value: 1202560 },
	{ type: 0, value: 1202870 },
	{ type: 0, value: 1202760 },
	{ type: 0, value: 1463520 },
	{ type: 0, value: 1231580 },
	{ type: 0, value: 1457440 },
	{ type: 0, value: 1463540 },
	{ type: 0, value: 1374300 },
	{ type: 0, value: 1373860 },
	{ type: 0, value: 1373990 },
	{ type: 0, value: 1559290 },
	{ type: 0, value: 1559380 },
	{ type: 0, value: 1559610 },
	{ type: 0, value: 1305990 },
	{ type: 0, value: 1413890 },
	{ type: 0, value: 1306180 },
	{ type: 0, value: 1390020 },
	{ type: 0, value: 1348460 },
	{ type: 0, value: 1228650 },
	{ type: 0, value: 2269050 },
	{ type: 0, value: 1228690 },
	{ type: 0, value: 1454750 },
];

console.log("Begin JSON Benchmark");
const jsonStart = Date.now();
const filteredArray = [];
for (const input of testInput) {
	const filter = fileJson.filter((item) => item.id == input.value);
	if (filter.length !== 0) filteredArray.push(filter[0]);
}
const jsonEnd = Date.now();

console.log("Begin Map Benchmark");
const mapStart = Date.now();
const filteredMap = [];
for (const input of testInput) {
	const item = fileMap.get(input.value);
	if (item) filteredMap.push(item);
}
const mapEnd = Date.now();

console.log("=====================================");
console.log("JSON Benchmark Time:", jsonEnd - jsonStart);
console.log("JSON Length", fileJson.length);
// console.log("With result: ", filteredArray);
console.log("Filter length: ", filteredArray.length);
console.log("=====================================");
console.log("Map Benchmark Time", mapEnd - mapStart);
console.log("Map Length", fileMap.size);
// console.log("With result: ", filteredMap);
console.log("Filter length: ", filteredMap.length);
console.log("=====================================");
