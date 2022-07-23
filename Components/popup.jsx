import styles from "../styles/Home.module.css";
import { useState } from "react";
export default function Popup() {
	const [filename, setFilename] = useState("");
	return (
		<div className={styles.popup}>
			<h1>Enter bookmark name</h1>
			<input
				type="text"
				placeholder="Bookmark"
				className={styles.popupInput}
				value={filename}
				onChange={(e) => setFilename(e.target.value)}
			/>
			<button className={styles.popupButton}>Save</button>
		</div>
	);
}
