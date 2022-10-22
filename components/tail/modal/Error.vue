<script setup lang="ts">
import { ModalState } from '~~/composables/modal';

const blueViolet = resolveComponent("TailButtonBlueViolet")
const seashell = resolveComponent("TailButtonSeashell")

const modal = useModal()

defineProps<{
    modalState: ModalState
}>()

function dismiss() {
    modal.value = {
        title: "",
        messages: []
    }
}

function dismissTo(to: string) {
    dismiss()
    navigateTo(to)
}
</script>

<template>
    <tail-modal-base>
        <div class="p-4 rounded shadow-3xl bg-red">
            <div class="flex justify-end">
                <icon name="ant-design:close-circle-filled" size="2rem" class="hover:cursor-pointer text-white"
                    @click="dismiss()" />
            </div>
            <h1 class="text-8xl font-amatic-sc text-white text-center">
                {{ modalState.title }}
            </h1>
            <br>
            <p v-for="message in modalState.messages" class="text-white text-4xl text-center">
                {{ message }}
            </p>
            <div v-if="modalState.actions" v-for="action in modalState.actions">
                <br>
                <tail-button-blue-violet v-if="action.type == ModalActionType.BLUE_VIOLET"
                    @click="() => dismissTo(action.redirectTo)" :title="action.title" />
                <tail-button-seashell v-if="action.type == ModalActionType.SEASHELL"
                    @click="() => dismissTo(action.redirectTo)" :title="action.title" />
            </div>
        </div>
    </tail-modal-base>
</template>