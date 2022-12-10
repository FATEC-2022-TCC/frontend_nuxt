<script setup lang="ts">

const modal = useModal()

const name = ref('')
const username = ref('')
const password = ref('')
const repeatedPassword = ref('')

interface SignUpErrors {
    name?: string,
    username?: string,
    email?: string,
    password?: string,
    repeatedPassword?: string,
}

const errors = ref<SignUpErrors>({})
const hasRemoteError = ref(false)

function doSignUp() {
    hasRemoteError.value = false
    if (hasError<SignUpErrors>(
        {
            name: lengthValidator(name, "Digite seu nome completo"),
            username: lengthValidator(username, "Digite um nome de usuário"),
            password: lengthValidator(password, "Digite uma senha de 8 caracteres", 8),
            repeatedPassword: [
                lengthValidator(repeatedPassword, "Digite uma senha de 8 caracteres", 8),
                buildValidator(
                    repeatedPassword,
                    repeated => repeated === password.value,
                    "Por favor, digite a mesma senha"
                )
            ]
        },
        errors
    )) return

    signup({
        name: name.value,
        username: username.value,
        password: password.value
    }).then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: _ => {
            modal.value = {
                title: "Tudo certo!!!",
                messages: [
                    "Você está cadastrado.",
                    "Contate a prefeitura de sua cidade para a validação da conta.",
                    "Caso não o faça nas próximas horas, sua conta será excluída."
                ],
                type: ModalType.Success
            }
            navigateTo("/signin")
        }
    }))
}
</script>

<template>
    <div class="flex flex-col sm:flex-row-reverse min-h-screen">
        <div class="hidden h-auto bg-blue-violet sm:block sm:w-1/2 md:w-3/5"></div>
        <div class="flex h-auto sm:w-1/2 md:w-2/5">
            <div class="m-auto p-4 flex flex-col space-y-4 w-4/5">
                <h1 class="font-amatic-sc text-6xl">
                    Cadastro
                </h1>
                <br>
                <tail-input-base :error="errors.name" placeholder="Nome completo" v-model="name" />
                <tail-input-base :error="errors.username" placeholder="Apelido único" v-model="username" />
                <tail-input-base :error="errors.password" placeholder="Senha" type="password" v-model="password" />
                <tail-input-base :error="errors.repeatedPassword" placeholder="Repetir a senha" type="password"
                    v-model="repeatedPassword" />
                <tail-error v-if="hasRemoteError">
                    <p>Algo deu errado.</p>
                    <p>Tente um nome de usuário diferente.</p>
                    <p>Caso não consiga criar uma conta contate a prefeitura de sua cidade.</p>
                </tail-error>
                <tail-button-blue-violet title="Cadastrar" @click="doSignUp" />
                <br>
                <nuxt-link to="/home" class="flex items-center self-end">
                    <span class="mr-2">
                        Voltar para home
                    </span>
                    <icon name="ant-design:home-filled" size="1.5rem" class="text-burnt-yellow" />
                </nuxt-link>
            </div>
        </div>
    </div>
</template>