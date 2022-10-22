export enum ModalActionType {
    BLUE_VIOLET,
    SEASHELL
}

export interface ModalAction {
    title: string,
    redirectTo: string,
    type: ModalActionType
}

export enum ModalType {
    Error,
    Success,
    None
}

export interface ModalState {
    type: ModalType,
    title: string,
    messages: string[],
    actions?: ModalAction[]
}

export const useModal = () => useState<ModalState>('modal', () => ({
    type: ModalType.None,
    title: "",
    messages: []
}))