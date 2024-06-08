import { defineStore } from 'pinia'
import { reactive, ref, Ref } from 'vue'
import { base_url } from '../config'
// import { deserialize } from '../utils/tokenDeserializer';
import { postData } from '../helper/api';

export const useContactStore = defineStore('job', () => {

  const isRecent: any = reactive({})
  const loading: Ref<boolean> = ref(true)

  const contactForm: any = reactive([])

  interface contactForm {
    name: string
    email: string
    message: string
  }

  const contactDetail: contactForm = reactive({
    name: '',
    email: '',
    message: '',
  })

  const $resetContactForm: any = () => {
    console.log('na me dey clear am')
    contactDetail.name = ''
    contactDetail.email = ''
    contactDetail.message = ''
  }

  const SendDetails: any = async (payload: any) => {
    console.log('I have started to send the message', payload)
    let url: string = `${base_url}/create-job`
    console.log(`the data is ${JSON.stringify(payload)}`)

    const details: any = await postData(url, payload)
    console.log(`the user now now is ${JSON.stringify(details)}`)

    if (details?.status === 200) {
      console.log(`the details has the message ${JSON.stringify(details?.res?.message)}`)
      await $resetContactForm()
      console.log(`the job payload is now ${contactDetail}`)
      return details

    } else {
      console.log(`the user is ${JSON.stringify(details)}`)
      console.log(`the details is ${JSON.stringify(details?.status)}`)
      console.log(`the details is ${JSON.stringify(details?.res?.message)}`)
      return details
    }
  }

  return {
    isRecent,
    loading,
    SendDetails
  }
})
