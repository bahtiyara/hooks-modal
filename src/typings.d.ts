type ModalProps = React.ComponentProps<"div"> & {
    mask?: boolean
    maskClosable?: boolean
    blockScroll?: boolean
    rootId?: string
    onShow?: () => void
    onHide?: () => void
}
