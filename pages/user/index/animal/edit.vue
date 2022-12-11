<script setup lang="ts">
import { CategoryProjection } from '~~/composables/public/Category';
import { AnimalResponse } from '~~/composables/user/Animal';

const route = useRoute()
const modal = useModal()

const picture = ref(emptyList<string>())
const name = ref("")
const categoryId = ref(0)
const gender = ref("")
const age = ref("")
const size = ref("")
const description = ref("")

const categories = ref(emptyList<CategoryProjection>())

interface Errors {
    picture?: string,
    name?: string,
    categoryId?: string
    gender?: string
    age?: string
    size?: string
}

const response = ref<AnimalResponse | null>(null)

const hasRemoteError = ref(false)
const isLoading = ref(true)
const errors = ref<Errors>({})

const id = route.query["id"]?.toString() ?? ''

if (!id) navigateTo("/user")
else start()

function start() {
    getAllCategoryProjection().then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: onSuccess(categories)
    }))

    getAnimal(id).then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: onSuccess(response, response => {
            spread(response, {
                picture: spreadListFromSingle(picture),
                name,
                gender,
                age,
                size,
                description      
            })
            categoryId.value = response?.category.id ?? 0
        }),
        finally() {
            isLoading.value = false
        }
    }))
}

function onSave() {
    hasRemoteError.value = false
    if (hasError<Errors>(
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

    updateAnimal({
        id: parseInt(id),
        picture: picture.value[0],
        name: name.value,
        categoryId: categoryId.value,
        gender: gender.value,
        age: age.value,
        size: size.value,
        description: description.value
    }).then(handle({
        onFailure: onFailure(hasRemoteError),
        onNullSucess: () => {
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
</script>

<template>
    <tail-loading-page class="flex flex-col gap-4 p-4 pb-32" :is-loading="isLoading" :has-remote-error="hasRemoteError">
        <h1 class="font-amatic-sc text-6xl">
            Atualizar seu animal
        </h1>
        <h2 class="font-amatic-sc text-4xl">
            Vamos começar com informações sobre o bichinho
        </h2>
        <div class="flex gap-4">
            <tail-input-base64-file-dialog v-model="picture" class="flex-1" accept="image/*" :error="errors.picture">
                <tail-button-blue-violet title="Escolha uma foto de perfil para o animalzinho" />
            </tail-input-base64-file-dialog>
            <tail-button-base v-if="picture.length" class="bg-red" @click="picture = []">
                <icon name="ant-design:close-circle-filled" size="2rem"
                    class="m-auto hover:cursor-pointer text-white" />
            </tail-button-base>
        </div>
        <img v-if="picture.length" :src="picture[0]" class="w-full object-contain" />
        <tail-input-base placeholder="Nome do animalzinho" v-model="name" :error="errors.name" />
        <tail-input-area placeholder="Uma breve descrição do seu animal (opcional)" v-model="description" />
        <tail-select :data="categories" v-model="categoryId" :error="errors.categoryId"
            :visual-transform="category => category.name" :value-transform="category => category.id">
            <option value="0">
                Espécie do animal
            </option>
        </tail-select>
        <tail-select :data="['Macho', 'Fêmea']" v-model="gender" :error="errors.gender">
            <option value="">
                Gênero do animal
            </option>
        </tail-select>
        <tail-select :data="['Pequeno', 'Médio', 'Grande']" v-model="size" :error="errors.size">
            <option value="">
                Porte do animal
            </option>
        </tail-select>
        <tail-input-base placeholder="Idade" v-model="age" :error="errors.age" />
        <tail-fab-save @click="onSave" />
    </tail-loading-page>
</template>