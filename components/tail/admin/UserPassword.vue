<script setup lang="ts">
const emit = defineEmits<{
    (event: 'onPasswordChangeRequested', value: string): void
}>()

const password = ref("")
const repeated = ref("")

interface Errors {
    password?: string,
    repeated?: string
}

const errors = ref<Errors>({})

function onSave() {
    if (hasError<Errors>(
        {
            password: lengthValidator(password, "Digite uma senha de 8 caracteres", 8),
            repeated: [
                lengthValidator(repeated, "Digite uma senha de 8 caracteres", 8),
                buildValidator(
                    repeated,
                    repeated => repeated === password.value,
                    "Por favor, digite a mesma senha"
                )
            ]
        }, errors
    )) return
    emit('onPasswordChangeRequested', password.value)
}
</script>

<template>
    <div class="flex gap-2 flex-col bg-white p-4 rounded border border-blue-violet ">
        <h1 class="text-4xl font-amatic-sc">Alterar senha:</h1>
        <tail-input-base type="password" v-model="password" placeholder="Senha desejada" :error="errors.password" />
        <tail-input-base type="password" v-model="repeated" placeholder="Repetir a senha desejada" :error="errors.repeated" />
        <icon name="ant-design:save-filled" size="3rem"
            class="text-blue-violet hover:text-burnt-yellow hover:cursor-pointer self-end" @click="onSave" />
    </div>
</template>