<script setup lang="ts">
import { CategoryProjection } from '~~/composables/public/Category';


const modal = useModal()

const picture = ref("")
const name = ref("")
const categoryId = ref(0)
const gender = ref("")
const age = ref("")
const size = ref("")
const about = ref("")

const files = ref<Array<File>>([])
watch(files, async files => {
    const file = files[0]
    if (!file) return
    const base64 = await fileToBase64(file)
    picture.value = base64
})

const categories = ref<Array<CategoryProjection>>([])

interface AddErrors {
    picture?: string,
    name?: string,
    categoryId?: string
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
            picture: lengthValidator(picture, "Precisamos de uma fotinha de perfil"),
            name: lengthValidator(name, "Faltou o nome do animalzinho"),
            categoryId: moreThanZeroValidator(categoryId, "Precisamos da espécie"),
            gender: lengthValidator(gender, "Mas é menininho ou meninha?"),
            age: lengthValidator(age, "Precisamos saber o quão novo ele/ela é "),
            size: lengthValidator(size, "Precisamos saber do tamanho"),
        },
        errors
    )) return

    addAnimal({
        picture: picture.value,
        name: name.value,
        categoryId: categoryId.value,
        gender: gender.value,
        age: age.value,
        size: size.value,
        about: about.value
    }).then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: _ => {
            modal.value = {
                type: ModalType.Success,
                title: "Oba!!",
                messages: [
                    "Seu animalzinho está cadastrado!"
                ]
            }
            navigateTo("/user/animal")
        }
    }))
}

getAllCategoryProjection().then(handle({
    onFailure: onFailure(hasRemoteError),
    onSuccess: onSuccess(categories)
}))
</script>

<template>
    <div class="flex flex-col p-4 pb-32">
        <h1 class="font-amatic-sc text-6xl">
            Novo Animal
        </h1>
        <br>
        <div v-if="!hasRemoteError" class="flex flex-col gap-4">
            <h2 class="font-amatic-sc text-4xl">
                Vamos começar com informações sobre o bichinho
            </h2>
            <div class="flex space-x-2">
                <tail-input-file-dialog v-model="files" class="flex-1" accept="image/*" :error="errors.picture">
                    <tail-button-blue-violet title="Escolha uma foto de perfil para o animalzinho" />
                </tail-input-file-dialog>
                <tail-button-base v-if="picture" class="bg-red" @click="picture = ''">
                    <icon name="ant-design:close-circle-filled" size="2rem"
                        class="m-auto hover:cursor-pointer text-white" />
                </tail-button-base>
            </div>
            <img v-if="picture" :src="picture" class="w-full object-contain" />
            <tail-input-base placeholder="Nome do animalzinho" v-model="name" :error="errors.name" />
            <tail-select 
                :data="categories" 
                v-model="categoryId" 
                :error="errors.categoryId" 
                :visual-transform="category => category.name"
                :value-transform="category => category.id"
            >
                <option value="0">
                    Espécie do animal
                </option>
            </tail-select>
            <tail-select
                :data="['Macho', 'Fêmea']"
                v-model="gender"
                :error="errors.gender"
            >
                <option value="">
                    Gênero do animal
                </option>
            </tail-select>
            <tail-select
                :data="['Pequeno', 'Médio', 'Grande']"
                v-model="size"
                :error="errors.size"
            >
                <option value="">
                    Porte do animal
                </option>
            </tail-select>
            <tail-input-base placeholder="Idade" v-model="age" :error="errors.age" />
            <h1 class="font-amatic-sc text-6xl">
                Sobre o Animalzinho
            </h1>
            <h2 class="font-amatic-sc text-3xl">
                (Essa parte é opcional, mas gostariamos de saber mais sobre o bichinho)
            </h2>
            <wysiwyg-editor v-model="about" />
            <tail-fab-save @click="onSave" />
        </div>
        <tail-error v-else>
            <p>Alguma coisa deu errada.</p>
            <p>Tente novamente mais tarde!</p>
        </tail-error>
    </div>
</template>