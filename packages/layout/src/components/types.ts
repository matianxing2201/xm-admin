import type { Slot, VNode, VNodeChild } from 'vue'

export type VueNode = Slot | VNode | VNodeChild;

export type WithFalse<T> = T | false;