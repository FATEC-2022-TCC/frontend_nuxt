<script setup lang="ts">
import { CategoryProjection } from '~~/composables/public/Category';

const modal = useModal()

const name = ref("")
const description = ref("")
const gender = ref("")
const size = ref("")
const categoryId = ref(0)
const picture = ref(new Array<string>())
const images = ref(new Array<string>())

const categories = ref<Array<CategoryProjection>>([])

interface Errors {
    name?: string,
    description?: string,
    gender?: string,
    size?: string,
    categoryId?: string,
    picture?: string,
    images?: string,
}

const hasRemoteError = ref(false)
const errors = ref<Errors>({})

function onSave() {
    hasRemoteError.value = false
    if (hasError<Errors>(
        {
            name: lengthValidator(name, "Você precisa adicionar algum nome"),
            description: lengthValidator(description, "Você precisa adicionar alguma descrição"),
            gender: lengthValidator(gender, "Você precisa adicionar um gênero"),
            size: lengthValidator(size, "Você precisa adicionar o porte do animal"),
            categoryId: moreThanZeroValidator(categoryId, "Precisamos da espécie"),
            picture: lengthValidator(picture, "Você deve inserir uma foto de perfil"),
            images: lengthValidator(images, "Você precisa inserir ao menos uma imagem")
        },
        errors
    )) return

    addAdoption({
        name: name.value,
        description: description.value,
        gender: gender.value,
        size: size.value,
        categoryId: categoryId.value,
        picture: picture.value[0],
        images: images.value,
    }).then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: _ => {
            modal.value = {
                type: ModalType.Success,
                title: "Oba, a nova adoção foi inserida no sistema!",
                messages: [
                    "Ela ainda não está disponível aos usuários",
                    "Você deve edita-la e torna-la visível"
                ]
            }
            navigateTo("/admin/adoption")
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
            Nova adoção
        </h1>
        <br>
        <div v-if="!hasRemoteError" class="flex flex-col gap-4">
            <h2 class="font-amatic-sc text-4xl">
                Precisamos de algumas informações sobre a nova adoção
            </h2>
            <tail-input-base placeholder="Nome" v-model="name" :error="errors.name" />
            <tail-input-area placeholder="Uma breve descrição" v-model="description" :error="errors.description" />
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
            <tail-input-base64-file-dialog :error="errors.picture" v-model="picture">
                <tail-button-blue-violet title="Uma foto de perfil" />
            </tail-input-base64-file-dialog>
            <tail-image-handler v-model="picture" v-if="picture.length" />
            <tail-input-base64-file-dialog multiple :error="errors.images" v-model="images">
                <tail-button-blue-violet title="Escolha mais algumas fotos para aumentar as chances de adoção" />
            </tail-input-base64-file-dialog>
            <tail-image-handler v-model="images" v-if="images.length" />
        </div>
        <tail-error v-else>
            <p>Alguma coisa deu errada.</p>
            <p>Tente novamente mais tarde!</p>
        </tail-error>
        <tail-fab-save @click="onSave()" />
    </div>
</template>