<script setup lang="ts">
import { User } from '~~/composables/admin/User';

const modal = useModal()
const route = useRoute()
const router = useRouter()

const name = ref("")
const email = ref("")
const authority = ref("")
const isActive = ref(false)
const isValidated = ref(false)

const response = ref<User | null>(null)

const hasRemoteError = ref(false)
const errors = ref<Errors>({})

interface Errors {
    name?: string,
    email?: string,
    authority?: string
}

const id = route.query["id"]?.toString() ?? ''

if (!id) navigateTo("/admin/users")
else start()

function start() {
    getUser(id).then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: onSpreadSuccess(response, { name, email, authority, isActive, isValidated })
    }))
}

function onSave() {
    hasRemoteError.value = false
    if (hasError<Errors>(
        {
            name: lengthValidator(name, "Você precisa adicionar algum nome"),
            email: lengthValidator(email, "Você precisa adicionar algum email"),
            authority: lengthValidator(authority, "Você precisa selecionar o tipo de usuário")
        },
        errors
    )) return

    updateUser({
        id: parseInt(id),
        name: name.value,
        email: email.value,
        authority: authority.value,
        isActive: isActive.value,
        isValidated: isValidated.value
    }).then(handle({
        onFailure: onFailure(hasRemoteError),
        onNullSucess: () => {
            modal.value = {
                type: ModalType.Success,
                title: "O usuário foi atualizado!",
                messages: [
                    "Para as alterações surtirem efeito, o usuário deverá fazer o login novamente",
                    "Caso ele não faça, a sessão ira expirar em 24 horas"
                ]
            }
            router.replace("/admin/users")
        }
    }))
}

function onPasswordChangeRequested(password: string) {
    updateUserPassword({
        id: parseInt(id),
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

    <div class="flex flex-col p-4 pb-32">
        <h1 class="font-amatic-sc text-6xl">
            Editar usuário
        </h1>
        <br>
        <div v-if="response && !hasRemoteError" class="space-y-2">
            <tail-input-base placeholder="Nome" v-model="name" :error="errors.name" />
            <tail-input-base placeholder="Email" v-model="email" :error="errors.email" />
            <tail-select :data="['NORMAL', 'ADMIN']" v-model="authority" :error="errors.authority">
                <option value="">
                    Tipo de usuário
                </option>
            </tail-select>
            <div class="flex items-center justify-between">
                <p>O usuário está {{ isActive ? 'ativo' : 'inativo' }}</p>
                <tail-switch v-model="isActive" />
            </div>
            <div class="flex items-center justify-between">
                <p>O usuário {{ isValidated ? '' : 'não' }} está validado</p>
                <tail-switch v-model="isValidated" />
            </div>
            <tail-admin-user-password @on-password-change-requested="onPasswordChangeRequested" />
        </div>
        <div v-else-if="!hasRemoteError">
            <p>Carregando...</p>
        </div>
        <tail-error v-else>
            <p>Alguma coisa deu errada.</p>
            <p>Tente novamente mais tarde!</p>
        </tail-error>
        <tail-fab-save @click="onSave()" />
    </div>
</template>