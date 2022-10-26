<script setup lang="ts">

const modal = useModal()

const profilePic = ref("")
const name = ref("")
const species = ref("")
const gender = ref("")
const age = ref("")
const size = ref("")
const about = ref("")

const files = ref<Array<File>>([])
watch(files, async files => {
    const file = files[0]
    if (!file) return
    const base64 = await fileToBase64(file)
    profilePic.value = base64
})

interface AddErrors {
    profilePic?: string,
    name?: string,
    species?: string
    gender?: string
    age?: string
    size?: string
}

const hasRemoteError = ref(false)
const errors = ref<AddErrors>({})

function onSave() {
    hasRemoteError.value = false
    if (hasError<AddErrors>(
        {
            profilePic: lengthValidator(profilePic, "Precisamos de uma fotinho de perfil"),
            name: lengthValidator(name, "Faltou o nome do animalzinho"),
            species: lengthValidator(species, "Precisamos da espécie"),
            gender: lengthValidator(gender, "Mas é menininho ou meninha?"),
            age: lengthValidator(age, "Precisamos saber o quão novo ele/ela é "),
            size: lengthValidator(size, "Precisamos daber do tamanho"),
        },
        errors
    )) return

    addAnimal({
        profilePic: profilePic.value,
        name: name.value,
        species: species.value,
        gender: gender.value,
        age: age.value,
        size: size.value,
        about: about.value
    }).then(handle({
        onFailure: error => {
            console.log(JSON.stringify(error))
            hasRemoteError.value = true
        },
        onSuccess: _ => {
            modal.value = {
                type: ModalType.Success,
                title: "Oba!!",
                messages: [
                    "Seu animalzinho está disponível para todos."
                ]
            }
            navigateTo("/user/animal")
        }
    }))
}
</script>

<template>
    <div class="flex flex-col p-4 pb-32">
        <h1 class="font-amatic-sc text-6xl">
            Novo Animal
        </h1>
        <div class="flex flex-col space-y-2">
            <h2 class="font-amatic-sc text-4xl">
                Vamos começar com informações sobre o bichinho
            </h2>
            <div class="flex space-x-2">
                <tail-input-file-dialog v-model="files" class="flex-1" accept="image/*" :error="errors.profilePic">
                    <tail-button-blue-violet title="Escolha uma foto de Perfil para o Animalzinho" />
                </tail-input-file-dialog>
                <tail-button-base v-if="profilePic" class="bg-red" @click="profilePic = ''">
                    <icon name="ant-design:close-circle-filled" size="2rem"
                        class="m-auto hover:cursor-pointer text-white" />
                </tail-button-base>
            </div>
            <img v-if="profilePic" :src="profilePic" class="w-full object-contain" />
            <tail-input-base placeholder="Nome do animalzinho" v-model="name" :error="errors.name" />
            <tail-input-base placeholder="Espécie do bichinho" v-model="species" :error="errors.species" />
            <tail-input-base placeholder="Ele é Macho ou Femea" v-model="gender" :error="errors.gender" />
            <tail-input-base placeholder="Idade" v-model="age" :error="errors.age" />
            <tail-input-base placeholder="Tamanho" v-model="size" :error="errors.size" />
            <br>
            <h1 class="font-amatic-sc text-6xl">
                Sobre o Animalzinho
            </h1>
            <h2 class="font-amatic-sc text-3xl">
                (Essa parte é opcional, mas gostariamos de saber mais sobre o bichinho)
            </h2>
            <br>
            <wysiwyg-editor v-model="about" />
            <br>
        </div>
        <br>
        <tail-error v-if="hasRemoteError">
            <p>Alguma coisa deu errada.</p>
            <p>Tente novamente mais tarde!</p>
        </tail-error>
        <tail-fab-save @click="onSave()" />
    </div>
</template>