import { Todo } from "../types/todo";

export const saveTodosToStorage = (updatedTodos: Todo[]) => {
    chrome.storage?.local?.set({
        todos: updatedTodos
    }, () => {
        if (chrome.runtime.lastError) {
            console.error('Error saving to chrome storage: ', chrome.runtime.lastError)
        }
    })
}
