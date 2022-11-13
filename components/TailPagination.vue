<script setup lang="ts">
defineProps({
    modelValue: {
        required: true,
        type: Number
    },
    maxPage: {
        required: true,
        type: Number
    },
    minPage: {
        required: false,
        type: Number,
        default: 1
    },
})

function toRender(currentPage: number = 0, minPage: number = 0, maxPage: number = 0): number[] {
    const gap = 2

    function aGoodStart(): number {
        const diff = currentPage - gap
        if (diff <= minPage) return minPage
        return diff
    }

    function aGoodEnd(): number {
        const diff = currentPage + gap
        if (diff >= maxPage) return maxPage
        return diff
    }
    const render: number[] = []
    for (let i = aGoodStart(); i < currentPage; i++) render.push(i)
    for (let i = currentPage; i <= aGoodEnd(); i++) render.push(i)
    return render
}
</script>

<template>
    <ul>
        <li @click="$emit('update:modelValue', minPage)"
            :class="modelValue > minPage ? 'enabled' : 'disabled'">
            &lt&lt
        </li>
        <li @click="if (modelValue > minPage) $emit('update:modelValue', modelValue - 1);"
            :class="modelValue > minPage ? 'enabled' : 'disabled'">
            &lt
        </li>
        <li v-for="num in toRender(modelValue, minPage, maxPage)"
            @click="if (num != modelValue) $emit('update:modelValue', num);"
            class="cursor-pointer"
            :class="num == modelValue ? 'bg-burnt-yellow' : 'bg-blue-violet'">
            {{ num }}
        </li>
        <li @click="if (modelValue < maxPage) $emit('update:modelValue', modelValue + 1);"
            :class="modelValue < maxPage ? 'enabled' : 'disabled'">
            >
        </li>
        <li @click="if (modelValue < maxPage) $emit('update:modelValue', maxPage);"
            :class="modelValue < maxPage ? 'enabled' : 'disabled'">
            >>
        </li>
    </ul>
</template>

<style scoped lang="postcss">
ul {
    @apply flex gap-2 flex-wrap;
}

li {
    @apply rounded p-4 text-white text-sm select-none;
}

.enabled {
    @apply bg-blue-violet cursor-pointer;
}

.disabled {
    @apply bg-gray cursor-not-allowed;
}
</style>