<script setup lang="ts">
import { ModalState } from '~~/composables/modal';

const blueViolet = resolveComponent("TailButtonBlueViolet")
const seashell = resolveComponent("TailButtonSeashell")

const modal = useModal()

const { modalState } = defineProps<{
    modalState: ModalState
}>()

function dismiss() {
    modal.value = {
        type: ModalType.None,
        title: "",
        messages: []
    }
}
</script>

<template>
    <div class="fixed inset-0 flex justify-center items-center z-10">
        <div class="p-4 rounded shadow-3xl" :class="modalState.type == ModalType.Error ? 'bg-red' : 'bg-green'">
            <div class="flex justify-end">
                <icon name="ant-design:close-circle-filled" size="2rem" class="hover:cursor-pointer text-white"
                    @click="dismiss()" />
            </div>
            <h1 class="text-8xl font-amatic-sc text-white text-center">
                {{ modalState.title }}
            </h1>
            <br>
            <p v-for="message in modalState.messages" class="text-white text-4xl">
                {{ message }}
            </p>
            <div v-if="modalState.actions">
                <div v-for="action in modalState.actions">
                    <br>
                    <component :is="action.type == ModalActionType.BLUE_VIOLET ? blueViolet : seashell"
                        :title="action.title" @click="() => navigateTo(action.redirectTo)" />
                </div>
            </div>
        </div>
    </div>
</template>