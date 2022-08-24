import { useEffect } from "react"

export default function useBlockScroll(condition = true) {
    useEffect(() => {
        if (!condition) return

        // 1. Create css
        const styleEl = document.createElement("style")
        styleEl.innerHTML =
            ".scroll-disabled { position: fixed; width: 100%; overflow-y: auto }"
        document.head.appendChild(styleEl)

        // 2. Save scroll top, add class
        const { body, documentElement } = document
        let { scrollTop } = document.documentElement

        scrollTop = documentElement.scrollTop
        body.style.top = `-${scrollTop}px`
        body.classList.add("scroll-disabled")

        // 3. Restore scroll position, remove class
        return () => {
            styleEl.remove()
            body.classList.remove("scroll-disabled")
            documentElement.scrollTop = scrollTop
            body.style.removeProperty("top")
        }
    }, [])
}
