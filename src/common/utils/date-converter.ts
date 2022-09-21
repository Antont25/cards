export const dateConverter = (data: string | Date) => {
    return new Date(data).toLocaleDateString('ru-RU')

}
export const timeConverter = (data: string | Date) => {
    return new Date(data).toLocaleTimeString()
}