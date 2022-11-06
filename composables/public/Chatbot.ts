export interface ChatbotRequest {
    sessionId: string,
    message: string
}

export interface ChatbotResponse {
    message: string,
    date: string
}