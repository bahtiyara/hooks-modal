import useModal from "../../src"
import "./App.css"

export default function App() {
    const [Modal, toggleModal] = useModal()

    return (
        <div className="app">
            <button onClick={toggleModal}>Open</button>
            <Modal>
                <div className="content">
                    <div>This is modal content</div>
                    <button onClick={toggleModal}>Close</button>
                </div>
            </Modal>
        </div>
    )
}
