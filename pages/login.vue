<script setup lang="ts">
import { login } from '~~/api';

const cookieToken = useCookie('token')
const router = useRouter()

const username = ref("")
const password = ref("")

async function doLogin() {
    const response = await login(
        {
            username: username.value,
            password: password.value
        }
    )
    response.when({
        onSuccess: token => {
            console.log("login success: " + token)
            cookieToken.value = token
            router.push("/user")
        },
        onFailure: error => {
            console.log("login error: " + JSON.stringify(error))
        }
    })

}
</script>

<template>

</template>