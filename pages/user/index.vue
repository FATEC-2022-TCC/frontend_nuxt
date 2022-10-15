<template>
    <nuxt-layout name="menu">
        <template v-slot:menu>
            <tail-user-menu />
        </template>
        <template v-slot:content>
            <nuxt-page />
        </template>
    </nuxt-layout>
</template>