<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image'
import { History } from '@tiptap/extension-history';
import { mergeAttributes } from '@tiptap/core'

const editor = ref<Editor | null>(null)
const content = ref("<h1>Seu lindo título aqui</h1>")

onMounted(() => {
    editor.value = new Editor({
        editorProps: {
            attributes: {
                class: 'p-4 border-2 rounded border-2 border-blue-violet focus:border-blue-violet'
            }
        },
        content: content.value,
        extensions: [
            Document,
            Text,
            TextAlign.configure({
                types: ['heading', 'paragraph', 'image']
            }),
            Image.configure({
                allowBase64: true,
                inline: true,
            }),
            Paragraph,
            History,
            Heading.configure({
                levels: [1, 2, 3]
            }).extend({
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
            })
        ],
        onUpdate: props => {
            content.value = props.editor.getHTML()
        }
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

const toggleHeading = (level: Level) => getEditor(editor => {
    editor.chain().toggleHeading({ level }).run()
})

watch(heading, toggleHeading)


type Alignment = "left" | "center" | "right"

const toggleAlignment = (alignment: Alignment) => getEditor(editor => {
    editor.chain().focus().setTextAlign(alignment).run()
})

type UndoOrRedo = "undo" | "redo"

const undoOrRedo = (undoOrRedo: UndoOrRedo) => getEditor(editor => {
    switch (undoOrRedo) {
        case 'redo':
            editor.chain().focus().redo().run()
            break;
        case 'undo':
            editor.chain().focus().undo().run()
            break;
    }
})

const pickImage = () => getEditor(editor => {
    const input = document.createElement("input")
    input.type = "file"
    input.onchange = event => {
        const file = input.files?.item(0)
        if (!file) return
        const reader = new FileReader()
        reader.onload = load => {
            const src = load.target?.result as string
            if (!src) return
            editor.chain().focus().setImage({
                src
            }).run()
            input.remove()
        }
        reader.readAsDataURL(file)
    }
    input.click()
})

</script>

<template>
    <div>
        <br>
        <div class="p-2 rounded border-2 border-burnt-yellow flex items-center">
            <select class="bg-transparent p-2 border-transparent" v-model="heading">
                <option v-for="num in 3" :value="num">
                    H{{num}}
                </option>
            </select>
            <div class="mx-2"></div>
            <icon @click="toggleAlignment('left')" name="ant-design:align-left-outlined" size="2rem"
                class="text-blue-violet cursor-pointer hover:text-burnt-yellow" />
            <icon @click="toggleAlignment('center')" name="ant-design:align-center-outlined" size="2rem"
                class="text-blue-violet cursor-pointer hover:text-burnt-yellow mx-2" />
            <icon @click="toggleAlignment('right')" name="ant-design:align-right-outlined" size="2rem"
                class="text-blue-violet cursor-pointer hover:text-burnt-yellow" />
            <div class="mx-2"></div>
            <icon @click="undoOrRedo('undo')" name="ant-design:undo-outlined" size="2rem"
                class="text-blue-violet cursor-pointer hover:text-burnt-yellow" />
            <icon @click="undoOrRedo('redo')" name="ant-design:redo-outlined" size="2rem"
                class="text-blue-violet cursor-pointer hover:text-burnt-yellow" />
            <div class="mx-2"></div>
            <icon @click="pickImage()" name="ant-design:file-image-filled" size="2rem"
                class="text-blue-violet cursor-pointer hover:text-burnt-yellow" />
        </div>
        <editor-content v-if="editor" :editor="editor" />
        <br>
    </div>
</template>