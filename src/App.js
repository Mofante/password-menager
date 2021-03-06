import { useEffect, useState } from "react";
import NewPasswordScreen from "./components/NewPasswordScreen";
import Password from "./components/Password";
import "./style.css";
import generatePassword from "./utils/generatePassword";

function App() {
	const [passwords, setPasswords] = useState(() => {
		const saved = localStorage.getItem("passwords");
		const initValue = JSON.parse(saved);
		return initValue || [];
	});
	const [creatingNewPassword, setCreatingNewPassword] = useState(false);

	function addPassword(newPassword, label) {
		setPasswords((prevPasswords) => {
			return [
				...prevPasswords,
				{
					name: label,
					password: newPassword,
				},
			];
		});
	}

	useEffect(() => {
		localStorage.setItem("passwords", JSON.stringify(passwords));
	}, [passwords]);

	function removePassword(password) {
		setPasswords((prevPasswords) => {
			return prevPasswords.filter((x) => x.password !== password);
		});
	}

	const passwordElements = passwords.map((password) => (
		<Password
			removePassword={() => removePassword(password.password)}
			key={password.password}
			password={password.password}
			name={password.name}
		/>
	));

	return (
		<div className="App">
			<h1 className="title">Your Passwords</h1>
			<div className="scroll-container">
				{passwords.length > 0 && passwordElements}
			</div>
			<button
				className="new-password-button"
				onClick={() => setCreatingNewPassword((prevState) => !prevState)}
			>
				+
			</button>
			{creatingNewPassword && (
				<div
					className="blur"
					onClick={(event) => {
						event.target.className === "blur" &&
							setCreatingNewPassword((prevState) => !prevState);
					}}
				>
					<NewPasswordScreen
						addPassword={addPassword}
						newPassword={generatePassword()}
						closeWindow={() =>
							setCreatingNewPassword((prevState) => !prevState)
						}
					/>
				</div>
			)}
		</div>
	);
}

export default App;
