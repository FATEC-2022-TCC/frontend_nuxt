<script setup lang="ts">
const isOpen = ref(false)

type Message = {
    owner: "me" | "bot"
    message: string
}
const stack: Array<string> = []
let stackIndex = 0
const messages = reactive(emptyList<Message>())
const myMessage = ref("")

const sessionId = Math.random().toString()

const divRef = ref<HTMLDivElement>()

function scrollDiv() {
    const div = divRef.value
    if (!div) return
    div.scrollTo({ top: div.scrollHeight })
}

function sendMessage() {
    messages.push({
        owner: 'me',
        message: myMessage.value
    })
    stack.push(myMessage.value)
    stackIndex = stack.length
    sendChatbotMessage({
        sessionId: sessionId,
        message: myMessage.value
    }).then(handle({
        onSuccess: ({ message }) => messages.push({
            owner: 'bot',
            message
        })
    }))
    myMessage.value = ""
}

function onKeyUp(key: string) {
    if (key == "ArrowUp") {
        stackIndex--
    } else if (key == "ArrowDown") {
        stackIndex++
    } else return

    if (stackIndex >= stack.length) {
        myMessage.value = ""
        stackIndex = stack.length
        return
    }
    if (stackIndex < 0) {
        stackIndex = 0
        myMessage.value = stack.length ? stack[stackIndex] : ""
        return
    }
    myMessage.value = stack[stackIndex]
}

onUpdated(scrollDiv)

sendChatbotMessage({
    message: "",
    sessionId
}).then(handle({
    onSuccess: ({ message }) => messages.push({
        owner: 'bot',
        message
    })
}))
</script>

<template>
    <div class="fixed rounded left-4 bottom-4 right-4 flex flex-col sm:left-auto sm:w-96">
        <div>
            <img src="/icon.png"
                class="bg-blue-violet shadow-2xl p-2 h-20 object-contain rounded-full m-auto mr-0 hover:cursor-pointer"
                :class="isOpen ? 'animate-none' : 'animate-bounce'" @click="isOpen = !isOpen" />
        </div>
        <div class="mt-2 h-80 border-2 border-blue-violet p-4 rounded bg-white shadow-2xl flex flex-col"
            :class="isOpen ? 'block' : 'hidden'">
            <div id="scroll" class="flex-1 overflow-auto scroll-smooth space-y-2 mb-2" ref="divRef">
                <div v-html="m.message" v-for="m in messages" class="p-2 rounded text-white transition-shadow hover:cursor-pointer"
                    :class="m.owner == 'me' ? ['self-end', 'bg-bondi-blue', 'ml-10'] : ['self-start', 'bg-blue-violet', 'mr-10']">
                </div>
            </div>
            <tail-input-icon @on-key-up="onKeyUp" @on-icon="sendMessage" v-model="myMessage">
                <icon name="ant-design:send-outlined" size="2rem" class="text-blue-violet cursor-pointer" />
            </tail-input-icon>
        </div>
    </div>
</template>

<style scoped>
#scroll::-webkit-scrollbar {
    display: none;
}
</style>