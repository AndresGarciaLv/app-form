declare global {
    interface Window {
        grecaptcha: {
            render: (container: HTMLElement, parameters: IRenderParameters) => number
            getResponse: (widgetId: number) => string
            reset: (widgetId: number) => void
        }
    }
}

interface IRenderParameters {
    sitekey: string
    theme?: 'light' | 'dark'
    size?: 'normal' | 'compact' | 'invisible'
    tabindex?: number
    [key: string]: any
}

export { } 