import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const loader = new GLTFLoader()

export const base64ToGLTF = (base64: string) => base64ToURL(base64).then(url => loader.loadAsync(url))