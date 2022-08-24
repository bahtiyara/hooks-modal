import { useState, useEffect, FC, ComponentProps, CSSProperties } from "react"
import { createPortal } from "react-dom"
import useBlockScroll from "./useBlockScroll"

type ModalProps = ComponentProps<"div"> & {
    onShow?: () => void
    onHide?: () => void
    mask?: boolean
    maskClosable?: boolean
    rootId?: string
    blockScroll?: boolean
}

/**
 *
 * @returns Returns a modal component, and a function to toggle its appearance.
 */
export default function useModal() {
    const [show, setShow] = useState(false)

    const Modal: FC<ModalProps> = ({
        children,
        onClick,
        style,
        mask = true,
        maskClosable = true,
        rootId = "modal-root",
        onShow,
        onHide,
        blockScroll = false,
        className = "react_useModal_container",
        ...rest
    }) => {
        if (!show) return null

        const modalStyle: CSSProperties = {
            position: "fixed",
            zIndex: 100,
            top: 0,
            left: 0,
            ...(mask && { bottom: 0, right: 0 }),
            ...style,
        }

        useEffect(() => {
            onShow?.()
            return () => onHide?.()
        }, [])

        useBlockScroll(blockScroll)

        return createPortal(
            <div
                style={modalStyle}
                onClick={(e) => {
                    maskClosable &&
                        e.currentTarget === e.target &&
                        toggleModal()
                    onClick?.(e)
                }}
                className={className}
                {...rest}
            >
                {children}
            </div>,
            document.querySelector(`#${rootId}`)!
        )
    }

    const toggleModal = () => setShow((prev) => !prev)

    return [Modal, toggleModal] as [FC<ModalProps>, () => void]
}
