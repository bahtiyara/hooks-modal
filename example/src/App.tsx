import useModal from "../../src"

export default function App() {
    const [Modal, toggleModal] = useModal()

    return (
        <div className="app">
            <button onClick={toggleModal}>Open</button>
            <Modal>
                <div
                    style={{
                        backgroundColor: "white",
                        width: 400,
                        margin: "auto",
                        marginTop: 48,
                    }}
                >
                    <div>This is modal content</div>
                    <button onClick={toggleModal}>Close</button>
                </div>
            </Modal>
        </div>
    )
}
