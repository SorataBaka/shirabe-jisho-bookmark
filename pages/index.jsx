import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

export default function Home() {
	const [kanjiList, setKanjiList] = useState([]);
	const [bookmarkList, setBookmarkList] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [popupActive, setPopupActive] = useState(false);
	const [filename, setFilename] = useState("");
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
			setBookmarkList([...bookmarkList, newitem]);
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
	const popup = (
		<div className={styles.popup}>
			<h1>Enter bookmark name</h1>
			<input
				type="text"
				placeholder="Bookmark"
				className={styles.popupInput}
				value={filename}
				onChange={(e) => setFilename(e.target.value)}
			/>
			<button className={styles.popupButton} onClick={handleDownload}>
				Save
			</button>
		</div>
	);
	return (
		<div className={styles.maincontainer}>
			{popupActive && popup}
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
						return (
							<div
								className={
									bookmarkList.filter((bookmark) => bookmark.id === item.id)
										.length > 0
										? styles.isBookmarked + " " + styles.kanjiText
										: styles.kanjiText
								}
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
