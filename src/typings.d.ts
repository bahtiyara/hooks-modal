/// <reference types="vite/client" />

type ModalProps = React.ComponentProps<"div"> & {
    onShow?: () => void
    onHide?: () => void
    mask?: boolean
    maskClosable?: boolean
    rootId?: string
    blockScroll?: boolean
}
