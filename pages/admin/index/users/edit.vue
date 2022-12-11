<script setup lang="ts">
import { User } from '~~/composables/admin/User';

const modal = useModal()
const route = useRoute()
const router = useRouter()

const name = ref("")
const authority = ref("")
const isActive = ref(false)

const email = ref("")
const telephony = ref("")
const identification = ref("")
const address = ref("")
const picture = ref(emptyList<string>())

const response = ref<User | null>(null)

const hasRemoteError = ref(false)
const errors = ref<Errors>({})

interface Errors {
    name?: string,
    authority?: string,
    email?: string,
    telephony?: string,
    identification?: string,
    address?: string
}

const id = route.query["id"]?.toString() ?? ''

if (!id) navigateTo("/admin/users")
else start()

function start() {
    getUser(id).then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: onSuccess(response, response => {
            spread(response, {
                name,
                authority,
                isActive
            })
            spread(response?.privateInfo, {
                email,
                telephony,
                identification,
                address,
                picture: spreadListFromSingle(picture)
            })
        })
    }))
}

function onSave() {
    hasRemoteError.value = false
    if (hasError<Errors>(
        {
            name: lengthValidator(name, "Você precisa adicionar algum nome"),
            authority: lengthValidator(authority, "Você precisa selecionar o tipo de usuário"),
            email: lengthValidator(email, "Você precisa adicionar algum email"),
            telephony: lengthValidator(telephony, "Você precisa adicionar algum telefone para contato"),
            identification: lengthValidator(identification, "Você precisa adicionar algum documento de identificação"),
            address: lengthValidator(address, "Você precisa adicionar algum endereço")
        },
        errors
    )) return

    updateUser({
        id: parseInt(id),
        name: name.value,
        authority: authority.value,
        isActive: isActive.value,
        privateInfo: {
            email: email.value,
            telephony: telephony.value,
            identification: identification.value,
            address: address.value,
            picture: picture.value[0] ?? ""
        }
    }).then(handle({
        onFailure: onFailure(hasRemoteError),
        onNullSucess: () => {
            modal.value = {
                type: ModalType.Success,
                title: "O usuário foi atualizado!",
                messages: [
                    "Para as alterações surtirem efeito, o usuário deverá fazer o login novamente"
                ]
            }
            router.replace("/admin/users")
        }
    }))
}

function onPasswordChangeRequested(password: string) {
    adminUpdateUserPassword({
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
    <tail-loading-page class="flex flex-col gap-4 p-4 pb-32" :has-remote-error="hasRemoteError" :is-loading="!response">
        <h1 class="font-amatic-sc text-6xl">
            Editar usuário
        </h1>
        <tail-input-base placeholder="Nome" v-model="name" :error="errors.name" />
        <tail-select :data="['NORMAL', 'ADMIN']" v-model="authority" :error="errors.authority">
            <option value="">
                Tipo de usuário
            </option>
        </tail-select>
        <div class="flex items-center justify-between">
            <p>O usuário {{ isActive ? '' : 'não' }} está ativo</p>
            <tail-switch v-model="isActive" />
        </div>
        <h1 class="font-amatic-sc text-6xl">
            Informações privadas
        </h1>
        <tail-input-base placeholder="Email" v-model="email" :error="errors.email" />
        <tail-input-base placeholder="Telefone" v-model="telephony" :error="errors.email" />
        <tail-input-base placeholder="Documento de identificação" v-model="identification" :error="errors.email" />
        <tail-input-base placeholder="Endereço" v-model="address" :error="errors.email" />
        <tail-input-base64-file-dialog v-model="picture">
            <tail-button-blue-violet title="Uma foto do usuário" />
        </tail-input-base64-file-dialog>
        <tail-image-handler v-model="picture" v-if="(picture.length && picture[0].length)" />
        <tail-admin-user-password @on-password-change-requested="onPasswordChangeRequested" />
        <tail-fab-save @click="onSave" />
    </tail-loading-page>
</template>