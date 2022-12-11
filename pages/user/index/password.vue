<script setup lang="ts">
const modal = useModal()
const hasRemoteError = ref(false)

function onPasswordChangeRequested(password: string) {
    userUpdatePassword({
        password
    }).then(handle({
        onFailure: onFailure(hasRemoteError),
        onNullSucess: () => {
            modal.value = {
                type: ModalType.Success,
                title: "A senha foi atualizada"
            }
        }
    }))
}
</script>

<template>
     <tail-loading-page class="flex flex-col gap-4 p-4 pb-32" :has-remote-error="hasRemoteError">
        <h1 class="font-amatic-sc text-6xl self-start">
            Gerenciar senha
        </h1>
        <tail-admin-user-password @on-password-change-requested="onPasswordChangeRequested"/>
    </tail-loading-page>
</template>