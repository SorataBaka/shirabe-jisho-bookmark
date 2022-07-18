import styles from "../styles/Home.module.css";
import { useState, useEffect, useCallback } from "react";

export default function Home() {
	const [kanjiList, setKanjiList] = useState([]);
	const [bookmarkList, setBookmarkList] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [popupActive, setPopupActive] = useState(false);
	// const [filename, setFilename] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(null);

	const handleInputChange = (e) => {
		setSearchQuery(e.target.value);
	};
	const searchKanji = async () => {
		if (searchQuery === "") return;
		const data = await fetch("/api/dictionary?q=" + searchQuery);
		const json = await data.json();
		const kanjilist = json.data.words;
		setKanjiList(kanjilist);
	};
	const handleBookmarking = (newitem) => {
		if (bookmarkList.filter((item) => item.id === newitem.id).length > 0) {
			setBookmarkList(bookmarkList.filter((item) => item.id !== newitem.id));
		} else {
			setBookmarkList([newitem, ...bookmarkList]);
		}
	};
	const handleDownload = async () => {
		if (bookmarkList.length === 0) return;
		const parsedData = Array.from(
			bookmarkList.map((item) => {
				return item.id;
			})
		);
		const response = await fetch("/api/convert", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(parsedData),
		});
		const json = await response.json();
		const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "kanji.shirabe";
		link.click();
	};
	// const popup = (
	// 	<div className={styles.popup}>
	// 		<h1>Enter bookmark name</h1>
	// 		<input
	// 			type="text"
	// 			placeholder="Bookmark"
	// 			className={styles.popupInput}
	// 			value={filename}
	// 			onChange={(e) => setFilename(e.target.value)}
	// 		/>
	// 		<button className={styles.popupButton} onClick={handleDownload}>
	// 			Save
	// 		</button>
	// 	</div>
	// );
	// eslint-disable-next-line
	const handleKeyPresses = useCallback((e) => {
		if (
			e.key === "Backspace" &&
			document.getElementById("input") !== document.activeElement
		) {
			setSelectedIndex(null);
			document.getElementById("input").focus();
		}
		if (e.key === "ArrowDown") {
			if (document.getElementById("input") === document.activeElement)
				document.getElementById("input").blur();
			if (selectedIndex === null) return setSelectedIndex(0);
			if (selectedIndex === kanjiList.length - 1) return setSelectedIndex(0);
			return setSelectedIndex(selectedIndex + 1);
		}
		if (e.key === "ArrowUp") {
			if (document.getElementById("input") === document.activeElement)
				document.getElementById("input").blur();
			if (selectedIndex === null) return setSelectedIndex(kanjiList.length - 1);
			if (selectedIndex === 0) return setSelectedIndex(kanjiList.length - 1);
			return setSelectedIndex(selectedIndex - 1);
		}
		if (e.key === "Enter" && selectedIndex !== null) {
			handleBookmarking(kanjiList[selectedIndex]);
		}
	});
	useEffect(() => {
		window.addEventListener("keydown", handleKeyPresses);
		return () => {
			window.removeEventListener("keydown", handleKeyPresses);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	});

	return (
		<div className={styles.maincontainer}>
			{/* {popupActive && popup} */}
			<div className={styles.selectedlist}>
				<div className={styles.bookmarkListBox}>
					{bookmarkList.length === 0 && (
						<h1 className={styles.warning}>No Bookmark Listed</h1>
					)}
					{bookmarkList.map((item) => {
						return (
							<div
								className={styles.kanjiText}
								key={item.id}
								onClick={() => {
									handleBookmarking(item);
								}}
							>
								<h1 className={styles.kanjiTextDescription}>{item.kanji}</h1>
								<h3 className={styles.kanjiTextDescription}>{item.kana}</h3>
								<h4 className={styles.kanjiTextDescription}>{item.meaning}</h4>
							</div>
						);
					})}
				</div>
				<div className={styles.downloadBox}>
					<button onClick={handleDownload}>Download</button>
				</div>
			</div>
			<div className={styles.dictionarylist}>
				<form onSubmit={(e) => e.preventDefault()} className={styles.inputBar}>
					<input
						type="text"
						name="Input"
						id="input"
						className={styles.inputText}
						placeholder="Search"
						value={searchQuery}
						onChange={handleInputChange}
						autoComplete="off"
					/>
					<input
						type="submit"
						className={styles.searchButton}
						onClick={searchKanji}
					/>
				</form>
				<div className={styles.kanjilist}>
					{kanjiList.length === 0 && (
						<h1 className={styles.warning}>No Kanji Listed</h1>
					)}
					{kanjiList.map((item) => {
						var classNameBuild = styles.kanjiText;
						if (
							bookmarkList.filter((bookmark) => bookmark.id === item.id)
								.length > 0
						)
							classNameBuild = classNameBuild + " " + styles.isBookmarked;
						if (selectedIndex === kanjiList.indexOf(item))
							classNameBuild = classNameBuild + " " + styles.isSelected;
						return (
							<div
								className={classNameBuild}
								key={item.id}
								onClick={() => {
									handleBookmarking(item);
								}}
							>
								<h1 className={styles.kanjiTextDescription}>{item.kanji}</h1>
								<h3 className={styles.kanjiTextDescription}>{item.kana}</h3>
								<h4 className={styles.kanjiTextDescription}>{item.meaning}</h4>
								<h5 className={styles.kanjiTextDescription}>{item.id}</h5>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
