export function loadOrRefreshDarkMode() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        return true
    } else {
        document.documentElement.classList.remove('dark')
        return false
    }
}

export function chooseLightMode() {
    localStorage.theme = 'light'

    loadOrRefreshDarkMode()
}

export function chooseDarkMode() {
    localStorage.theme = 'dark'

    loadOrRefreshDarkMode()
}