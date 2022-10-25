<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image'
import HardBreak from '@tiptap/extension-hard-break'
import { History } from '@tiptap/extension-history';
import { mergeAttributes } from '@tiptap/core'

const editor = ref<Editor | null>(null)

const { modelValue } = defineProps({
    error: String,
    modelValue: String
})

const emit = defineEmits<{
    (e: 'update:modelValue', content: string): void
}>()

onMounted(() => {
    editor.value = new Editor({
        editorProps: {
            attributes: {
                class: 'flex flex-col p-4 border-2 rounded border-2 border-blue-violet focus:border-blue-violet'
            }
        },
        content: modelValue,
        extensions: [
            Document,
            Text,
            TextAlign.configure({
                types: ['heading', 'paragraph', 'image']
            }),
            Image.extend({
                renderHTML({ node, HTMLAttributes }) {
                    const textAlign: string = node.attrs["textAlign"] ?? "left"
                    const alignments: Record<string, string> = {
                        "left": "self-start",
                        "center": "self-center",
                        "right": "self-end",
                        "justify": "self-center"
                    }
                    const classes = `object-contain ${alignments[textAlign] ?? ''}`
                    console.log(classes)
                    return [
                        'img',
                        mergeAttributes(
                            this.options.HTMLAttributes,
                            HTMLAttributes,
                            { class: classes }
                        )
                    ]
                }
            }).configure({
                allowBase64: true
            }),
            Paragraph,
            History,
            Heading.extend({
                levels: [1, 2, 3],
                renderHTML({ node, HTMLAttributes }) {
                    const level = this.options.levels.includes(node.attrs.level)
                        ? node.attrs.level
                        : this.options.levels[0]
                    const classes: Record<number, string> = {
                        1: 'text-6xl font-amatic-sc',
                        2: 'text-4xl font-amatic-sc',
                        3: 'text-2xl font-amatic-sc',
                    }
                    return [
                        `h${level}`,
                        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                            class: `${classes[level]}`,
                        }),
                        0
                    ]
                }
            }),
            HardBreak.configure({
                keepMarks: true
            })
        ],
        onCreate: props => emit("update:modelValue", props.editor.getHTML()),
        onUpdate: props => emit("update:modelValue", props.editor.getHTML())
    })
})

onBeforeUnmount(() => {
    editor.value?.destroy()
    editor.value = null
})

function getEditor(callback: (editor: Editor) => void) {
    const local = editor.value as (Editor | null)
    if (!local) return
    callback(local)
}

type Level = 1 | 2 | 3

const heading = ref<Level>(1)

const toggleHeading = (level: Level) => getEditor(
    editor => editor.commands.toggleHeading({ level })
)

watch(heading, toggleHeading)


type Alignment = "left" | "center" | "right" | "justify"

const toggleAlignment = (alignment: Alignment) => getEditor(
    editor => editor.commands.setTextAlign(alignment)
)

type UndoOrRedo = "undo" | "redo"

const undoOrRedo = (undoOrRedo: UndoOrRedo) => getEditor(editor => {
    switch (undoOrRedo) {
        case 'redo':
            editor.commands.redo()
            break;
        case 'undo':
            editor.commands.undo()
            break;
    }
})

const files = ref<Array<File>>([])

const toggleFile = (files: Array<File>) => getEditor(editor => {
    const file = files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = load => {
        const src = load.target?.result as string
        if (!src) return
        editor.commands.setImage({ src })
    }
    reader.readAsDataURL(file)
})

watch(files, toggleFile)

const toggleParagraph = () => getEditor(editor => editor.commands.setParagraph())

const toggleLineBreak = () => getEditor(editor => editor.commands.setHardBreak())
</script>

<template>
    <div>
        <div class="p-2 rounded border-2 border-burnt-yellow flex flex-wrap">
            <icon @click="toggleParagraph()" name="bi:paragraph" size="2rem"
                class="text-blue-violet cursor-pointer hover:text-burnt-yellow" />
            <select class="bg-transparent border-transparent text-blue-violet text-2xl" v-model="heading">
                <option v-for="num in 3" :value="num">
                    H{{ num }}
                </option>
            </select>
            <icon @click="toggleLineBreak()" name="ci:line-break" size="2rem"
                class="text-blue-violet cursor-pointer hover:text-burnt-yellow" />
            <div class="mx-2"></div>
            <icon @click="toggleAlignment('left')" name="bi:justify-left" size="2rem"
                class="text-blue-violet cursor-pointer hover:text-burnt-yellow" />
            <icon @click="toggleAlignment('center')" name="bi:text-center" size="2rem"
                class="text-blue-violet cursor-pointer hover:text-burnt-yellow mx-2" />
            <icon @click="toggleAlignment('right')" name="bi-justify-right" size="2rem"
                class="text-blue-violet cursor-pointer hover:text-burnt-yellow" />
            <icon @click="toggleAlignment('justify')" name="bi:justify" size="2rem"
                class="text-blue-violet cursor-pointer hover:text-burnt-yellow" />
            <div class="mx-2"></div>
            <icon @click="undoOrRedo('undo')" name="ant-design:undo-outlined" size="2rem"
                class="text-blue-violet cursor-pointer hover:text-burnt-yellow" />
            <icon @click="undoOrRedo('redo')" name="ant-design:redo-outlined" size="2rem"
                class="text-blue-violet cursor-pointer hover:text-burnt-yellow" />
            <div class="mx-2"></div>
            <tail-input-file-dialog v-model="files" accept="image/*">
                <icon name="ant-design:file-image-filled" size="2rem"
                    class="text-blue-violet cursor-pointer hover:text-burnt-yellow" />
            </tail-input-file-dialog>
        </div>
        <editor-content v-if="editor" :editor="editor" />
        <p v-if="error" class="ml-2 text-red">
            {{ error }}
        </p>
        <br>
    </div>
</template>