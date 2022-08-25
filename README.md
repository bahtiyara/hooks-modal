# useModal
A super light and easy-to-use react custom hook to implement modals using `Portals`.
&nbsp;

### Basic Usage
Install:
```bash
$ npm i react-use-modal
```
Add root div:
```HTML
<!-- index.html -->
<body>
    <div id="root"></div>

    <!-- Add this 👇 -->
    <div id="modal-root"></div>
</body>
```
Use:
```jsx
import useModal from 'react-use-modal'

function App() {
    const [Modal, toggleModal] = useModal()

    return (
        <div>
            <button onClick={toggleModal}>Open Modal</button>
            <Modal>
                This is modal content, you can put anything here

                You can also put a button to close the modal

                <button onClick={toggleModal}>Close Modal</button>
            </Modal>
        </div>
    )
}
```
&nbsp;

### Multiple Modals
You can have as many modals as you want.
```jsx
const [ModalA, toggleModalA] = useModal()
const [ModalB, toggleModalB] = useModal()

return (
    <div>
        // Openers
        <button onClick={toggleModalA}>Open Modal A</button>
        <button onClick={toggleModalB}>Open Modal B</button>

        // Modal A
        <ModalA>
            <button onClick={toggleModalA}>Close Modal A</button>
        </ModalA>

        // Modal B
        <ModalB>
            <button onClick={toggleModalB}>Close Modal B</button>
        </ModalB>
    </div>
)
```
&nbsp;

### Support Context
`Modal` is not blocking its children from receiving any context:
```jsx
import { AppContext } from './AppContext'
import ModalContent from './ModalContent'

function App() {
    const [Modal, toggleModal] = useModal()

    return (
        <AppContext.Provider>
            <button onClick={toggleModal}>Open Modal</button>

            <Modal>
                <ModalContent />
            </Modal>
        </AppContext.Provider>
    )
}
```
Then in `ModalContent` component you can use context:
```jsx
import { useContext } from 'react'
import { AppContext } from './AppContext'

function ModalContent () {
    const { language } = useContext(AppContext)

    return (
        // Render something using context...
    )
}
```
&nbsp;

### Props
`Modal` inherits any props from `HTMLDivElement`, on top of that, it also provides several very useful props, these are all optional:
| Name           |    Type    |                                                                                                                                                                                                  Description |            Default |
| -------------- | :--------: | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -----------------: |
| `mask`         | `boolean`  | When this is set to true, modal will fill the entire screen by setting both `bottom` and `right` css properties to `0`, and this will block the user interacting with the elements that is behind the modal. |             `true` |
| `maskClosable` | `boolean`  |                                                                       When this is set to true, user can close the modal by clicking the modal background (All of the empty space that is not its children). |             `true` |
| `blockScroll`  | `boolean`  |                        When this is set to true, HTML body cannot be scrolled when modal is opened, `NOTE: scroll bar for the body can still be seen, so the page layout will not twitch on Windows devices` |            `false` |
| `className`    |  `string`  |                              Every modal element has this className by default, it's useful if you want to simply adjust the style globally. Still, you can pass a className to overwrite the default value. | `useModal_wrapper` |
| `rootId`       |  `string`  |                                                                                                                                           The id of the HTML element that Portal will render the modal into. |       `modal-root` |
| `onShow`       | `()=>void` |                                                                                                                                                                       Do something when the modal is opened. |        `undefined` |
| `onHide`       | `()=>void` |                                                                                                                                                                       Do something when the modal is closed. |        `undefined` |
&nbsp;

### Set Prop Values Globally
If you want to use certain values to props globally in your project, you can wrap this hook with your own custom hook, and set the values there:
```jsx
import React, { FC, ComponentProps } from "react"
import useModal from "react-use-modal"

export default function useMyModal() {
    const [Modal, toggleModal] = useModal()

    type ModalProps = ComponentProps<typeof Modal>

    const MyModal: FC<ModalProps> = ({
        children,
        blockScroll,
        ...rest 
    }) => {
        // Add prop values globally
        return (
            <Modal {...rest} blockScroll={true}>
                {children}
            </Modal>
        )
    }

    return [MyModal, toggleModal] as [FC<ModalProps>, () => void]
}
```
&nbsp;
Hope you enjoy ! ;)