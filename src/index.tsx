// MIT License

// Copyright (c) 2022 Bahtiyar Ahmidi

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import * as React from 'react'
import { useState, useEffect, FC, CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import useBlockScroll from './useBlockScroll'

type ModalProps = React.ComponentProps<'div'> & {
    mask?: boolean
    maskClosable?: boolean
    blockScroll?: boolean
    rootId?: string
    onShow?: () => void
    onHide?: () => void
}

/**
 *  A custom hook to open and hide modal element
 * @returns Returns a modal component, and a function to toggle its appearance.
 */
export default function useModal() {
    const [show, setShow] = useState(false)

    /**
     * A function that returns a Modal component
     * @param props Modal properties
     * @returns A Modal component, wrap your content with this component
     */
    const Modal: FC<ModalProps> = ({
        children,
        onClick,
        style,
        mask = true,
        maskClosable = true,
        rootId = 'modal-root',
        onShow,
        onHide,
        blockScroll = false,
        className = 'useModal_wrapper',
        ...rest
    }) => {
        if (!show) return null

        const modalStyle: CSSProperties = {
            position: 'fixed',
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

        let root = document.querySelector(`#${rootId}`)
        if (!root) {
            root = document.createElement('div')
            root.id = rootId
            document.body.append(root)
        }

        return createPortal(
            <div
                style={modalStyle}
                onClick={(e) => {
                    maskClosable && e.currentTarget === e.target && toggleModal()
                    onClick?.(e)
                }}
                className={className}
                {...rest}
            >
                {children}
            </div>,
            root,
        )
    }

    /**
     *
     * @returns a function to toggle the appearance of the Modal component
     */
    const toggleModal = () => setShow((prev) => !prev)

    return [Modal, toggleModal] as [FC<ModalProps>, () => void]
}
