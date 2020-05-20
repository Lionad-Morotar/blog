export const COMPONENT_NAME = 'Code-Block-Runner'

export default function get(handle) {
    while (handle.$options.name !== COMPONENT_NAME || !handle) {
        handle = handle.$parent
    }
    return handle
}