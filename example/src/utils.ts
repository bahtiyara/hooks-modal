export function classNames(...args: any[]): string {
    const classes = []

    for (let i = 0; i < arguments.length; i++) {
        const arg = arguments[i]
        if (!arg) continue

        const hasOwn = {}.hasOwnProperty,
            argType = typeof arg

        if (argType === "string" || argType === "number") {
            classes.push(arg)
            continue
        }

        if (Array.isArray(arg)) {
            if (arg.length) {
                const inner = classNames.apply(null, arg)
                if (inner) {
                    classes.push(inner)
                }
            }
            continue
        }

        if (argType === "object") {
            if (arg.toString === Object.prototype.toString) {
                for (const key in arg) {
                    if (hasOwn.call(arg, key) && arg[key]) {
                        classes.push(key)
                    }
                }
            } else {
                classes.push(arg.toString())
            }
            continue
        }
    }

    return classes.join(" ")
}
