<template>
    <nuxt-layout name="menu">
        <template v-slot:menu>
            <tail-admin-menu />
        </template>
        <template v-slot:content>
            <nuxt-page />
        </template>
    </nuxt-layout>
</template>