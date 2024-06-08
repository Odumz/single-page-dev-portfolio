import { ref, Ref } from 'vue'

const email_pattern: any = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'

export const stringCheck: any = (value: string, label?: string, length: number = 2) => {
  const hasError: Ref<boolean> = ref(false)
  const message: Ref<string> = ref('')

  if (!value) {
    hasError.value = true
    message.value = `${label || 'Item'} is required`
  } else if (value.length < length) {
    hasError.value = true
    message.value = `${label || 'Item'} is less than ${length} characters`
  } else {
    hasError.value = false
    message.value = ''
  }

  return {
    hasError: hasError.value,
    message: message.value
  }
}

export const maxStringCheck: any = (value: string, label?: string, length: number = 2) => {
  const hasError: Ref<boolean> = ref(false)
  const message: Ref<string> = ref('')

  if (!value) {
    hasError.value = true
    message.value = `${label || 'Item'} is required`
  } else if (value.length > length) {
    console.log('Length of items is ', value.length)
    hasError.value = true
    message.value = `${label || 'Item'} is more than 2000 characters`
  } else {
    hasError.value = false
    message.value = ''
  }

  return {
    hasError: hasError.value,
    message: message.value
  }
}

export const emailCheck: any = (value: string, label?: string) => {
  const hasError: Ref<boolean> = ref(false)
  const message: Ref<string> = ref('')

  if (!value) {
    hasError.value = true
    message.value = `${label || 'Email'} is required`
  } else if (!value.match(email_pattern)) {
    hasError.value = true
    message.value = `${label || 'Email'} must match pattern 'brainadams@gmail.com'`
  } else {
    hasError.value = false
    message.value = ''
  }

  return {
    hasError: hasError.value,
    message: message.value
  }
}
