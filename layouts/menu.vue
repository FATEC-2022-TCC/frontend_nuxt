<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
    <div>
        <div class="fixed inset-0 sm:hidden z-10" :class="isOpen ? 'block' : 'hidden'" @click="isOpen = !isOpen">
            <div class="w-4/5 h-full rounded shadow-2xl bg-white">
                <slot name="menu"></slot>
            </div>
        </div>
        <div class="h-full flex flex-col sm:filter-none sm:pointer-events-auto"
            :class="isOpen ? ['blur', 'pointer-events-none'] : 'filter-none'">
            <header class="h-16 shadow flex items-center p-4">
                <div class="flex flex-1 sm:hidden">
                    <icon
                        name="ant-design:menu-outlined"
                        size="2rem"
                        class="text-blue-violet cursor-pointer hover:text-burnt-yellow"
                        @click="isOpen = !isOpen"
                    />
                </div>
                <img src="/quatro.png" class="h-full object-contain" />
            </header>
            <div class="flex flex-1 self-center w-full lg:w-9/12">
                <div class="shadow hidden sm:flex sm:w-2/5 md:w-2/6 lg:w-3/12 2xl:w-2/12">
                    <slot name="menu"></slot>
                </div>
                <div class="flex-1 shadow">
                    <slot name="content"></slot>
                </div>
            </div>
        </div>
    </div>
</template>