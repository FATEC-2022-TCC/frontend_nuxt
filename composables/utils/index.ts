export const fileToBase64 = (file: File): Promise<string> => new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = load => {
        const result = load.target?.result as string ?? ""
        resolve(result)
    }
    reader.readAsDataURL(file)
})