export const toggleGrayFilter = () => {
    const body = document.querySelector('body')
    if (body) {
        body.classList.toggle('grayFilter')
    }
}