import useModal from "./useModal"

export default function App() {
	const [Modal, toggleModal] = useModal()

	return (
		<div className="app">
			<div style={{ width: 100, height: 500, backgroundColor: "aqua" }}>
				Card
			</div>
			<button onClick={toggleModal}>Open</button>
			<div style={{ width: 100, height: 500, backgroundColor: "aqua" }}>
				Card
			</div>
			<Modal>
				<div>This is modal content</div>
				<button onClick={toggleModal}>Close</button>
			</Modal>
		</div>
	)
}
