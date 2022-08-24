import React, { FC, ComponentProps } from "react"
import useModal from "../../src"

export default function useMyModal() {
    const [Modal, toggleModal] = useModal()

    type ModalProps = ComponentProps<typeof Modal>

    const MyModal: FC<ModalProps> = ({ children, ...rest }) => (
        <Modal {...rest} style={{ backgroundColor: "royalblue" }}>
            {children}
        </Modal>
    )

    return [MyModal, toggleModal] as [React.FC<ModalProps>, () => void]
}
