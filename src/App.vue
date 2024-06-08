<script lang="ts">
import { defineComponent, Ref, ref, reactive } from 'vue'

export default defineComponent({
  name: 'Portfolio'
})
</script>

<script setup lang="ts">
import { useContactStore } from './store/index';
import { emailCheck, stringCheck } from './helper/validator';
import Alert from './components/alert.vue';

const showAlert: Ref<boolean> = ref(false)
const type: Ref<string> = ref('')
const message: Ref<string> = ref('')
const isLoading: Ref<boolean> = ref(false)
const isDisabled: Ref<boolean> = ref(true)

const changeAlertState: any = (alert: any) => {
  // const { type, message } = alert;
  type.value = alert.type
  message.value = alert.message

  showAlert.value = !showAlert.value
  setTimeout(() => {
    showAlert.value = false
  }, 3500)
}

const contactStore: any = useContactStore()

interface Contact {
  name: string
  email: string
  message: string
}

const contact: Contact = {
  name: '',
  email: '',
  message: ''
}

const hasError: any = reactive({
  name: false,
  email: false,
  message: false
})

const hasErrorMsg: any = reactive({
  name: '',
  email: '',
  message: ''
})

const checkError: any = {
  name: async (value: any) => {
    const check: any = await stringCheck(value, 'Name')
    hasError.name = check.hasError
    hasErrorMsg.name = check.message
    hasError.name ? (isDisabled.value = true) : (isDisabled.value = false)
  },
  email: async (value: any) => {
    const check: any = await emailCheck(value, 'Email')
    hasError.email = check.hasError
    hasErrorMsg.email = check.message
    hasError.email ? (isDisabled.value = true) : (isDisabled.value = false)
  },
  message: async (value: any) => {
    const check: any = await stringCheck(value, 'Message')
    hasError.message = check.hasError
    hasErrorMsg.message = check.message
    hasError.message ? (isDisabled.value = true) : (isDisabled.value = false)
  }
}

const submit: any = async () => {
  isLoading.value = true
  let alert: any = {
    type: '',
    message: ''
  }
  // let alertMessage:string;

  const response: any = await contactStore.SendDetails(contact)

  console.log(`response in form is ${JSON.stringify(response)}`)
  if (response?.status > 399) {
    alert.type = 'error'
    alert.message = `${response.message}`
    changeAlertState(alert)
    setTimeout(() => {
      isLoading.value = false
    }, 3000)
  } else if (response?.message) {
    alert.type = 'error'
    alert.message = `${response.message}`
    changeAlertState(alert)
    setTimeout(() => {
      isLoading.value = false
    }, 3000)
  } else if (response?.status == 200) {
    alert.type = 'success'
    alert.message = 'Message sent successfully!'
    changeAlertState(alert)
    setTimeout(() => {
      isLoading.value = false
    }, 3000)
  }
  // emits:('displayAlert', alertMessage)
  isDisabled.value = true
}

</script>

<template>
  <main class="space-grotesk-medium">
    <nav id="logo">
      <a href="/" class="logo space-grotesk-bold">
        adamkeyes
      </a>
      <ul class="menu">
        <li class="menu-items">
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3035 0C5.50583 0 0 5.50583 0 12.3035C0 17.7478 3.52188 22.3463 8.41254 23.9765C9.02771 24.0842 9.2584 23.715 9.2584 23.3921C9.2584 23.0999 9.24302 22.131 9.24302 21.1005C6.15176 21.6696 5.35203 20.347 5.10596 19.6549C4.96755 19.3012 4.36775 18.2092 3.84485 17.917C3.41423 17.6863 2.79905 17.1173 3.82947 17.1019C4.79838 17.0865 5.49045 17.9939 5.72114 18.363C6.82846 20.2239 8.59709 19.701 9.30454 19.3781C9.4122 18.5783 9.73516 18.04 10.0889 17.7325C7.35136 17.4249 4.49079 16.3637 4.49079 11.6576C4.49079 10.3196 4.96755 9.21227 5.7519 8.35102C5.62886 8.04343 5.19824 6.78232 5.87493 5.09058C5.87493 5.09058 6.90535 4.76762 9.2584 6.3517C10.2427 6.07487 11.2885 5.93645 12.3343 5.93645C13.3801 5.93645 14.4259 6.07487 15.4102 6.3517C17.7632 4.75224 18.7936 5.09058 18.7936 5.09058C19.4703 6.78232 19.0397 8.04343 18.9167 8.35102C19.701 9.21227 20.1778 10.3042 20.1778 11.6576C20.1778 16.3791 17.3018 17.4249 14.5643 17.7325C15.0103 18.1169 15.3948 18.8552 15.3948 20.0086C15.3948 21.6542 15.3794 22.9768 15.3794 23.3921C15.3794 23.715 15.6101 24.0995 16.2253 23.9765C18.6676 23.1519 20.79 21.5821 22.2936 19.4882C23.7972 17.3941 24.6063 14.8814 24.6071 12.3035C24.6071 5.50583 19.1012 0 12.3035 0Z" fill="currentColor"/>
          </svg>
        </li>
        <li class="menu-items">
          <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0842 0.230569C12.8876 0.234334 12.7004 0.315057 12.5627 0.455404C12.425 0.59575 12.3479 0.784498 12.348 0.981084V15.247C12.348 15.4461 12.4271 15.637 12.5678 15.7778C12.7085 15.9185 12.8994 15.9975 13.0984 15.9975C13.2975 15.9975 13.4885 15.9185 13.6292 15.7778C13.77 15.637 13.849 15.4461 13.849 15.247V0.981084C13.8491 0.881401 13.8292 0.782702 13.7906 0.69077C13.7521 0.598826 13.6957 0.515494 13.6245 0.445622C13.5534 0.375751 13.469 0.320754 13.3765 0.283831C13.2839 0.246908 13.1848 0.228797 13.0852 0.230569H13.0842ZM24.4403 4.504C24.3423 4.50683 24.2458 4.52877 24.1562 4.5686L17.7153 7.44351C17.5836 7.50305 17.4719 7.59932 17.3934 7.72081C17.315 7.84229 17.2733 7.98382 17.2733 8.12841C17.2733 8.273 17.315 8.41453 17.3934 8.53601C17.4719 8.6575 17.5836 8.75377 17.7153 8.81331L24.1562 11.6974C24.2531 11.741 24.3578 11.7637 24.4638 11.7641C24.6355 11.7636 24.8017 11.7042 24.9348 11.596C25.0681 11.4878 25.1601 11.3372 25.1956 11.1693C25.2313 11.0015 25.2083 10.8265 25.1306 10.6735C25.0528 10.5206 24.925 10.3989 24.7683 10.3287L19.8613 8.12943L24.7683 5.93838C24.9496 5.85681 25.0911 5.70689 25.1622 5.52136C25.2333 5.33581 25.2281 5.12969 25.1478 4.94795C25.0869 4.81235 24.9872 4.69783 24.8612 4.61883C24.7354 4.53982 24.5888 4.49986 24.4403 4.504ZM1.03633 9.73538C1.1409 9.68585 1.2555 9.66117 1.37118 9.66328V9.6643C1.53469 9.66748 1.69269 9.72401 1.82113 9.82524C1.94958 9.92647 2.04144 10.0669 2.08274 10.2251C2.86827 13.2343 4.62979 15.8977 7.09133 17.7984C9.55288 19.699 12.5754 20.7294 15.6853 20.7282C15.8843 20.7282 16.0753 20.8073 16.216 20.9481C16.3568 21.0888 16.4358 21.2798 16.4358 21.4787C16.4358 21.6778 16.3568 21.8687 16.216 22.0095C16.0753 22.1502 15.8843 22.2292 15.6853 22.2292C8.60258 22.2292 2.41083 17.4473 0.63092 10.6014C0.601975 10.4894 0.599323 10.3722 0.62317 10.259C0.647017 10.1458 0.696718 10.0396 0.768389 9.94876C0.840061 9.85793 0.931763 9.7849 1.03633 9.73538Z" fill="currentColor"/>
          </svg>
        </li>
        <li class="menu-items">
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5513 3.3042C4.41165 3.3042 3.48447 4.23017 3.48447 5.36833C3.48447 6.50724 4.41165 7.4338 5.5513 7.4338C6.68872 7.4338 7.61408 6.50724 7.61408 5.36833C7.61408 4.23017 6.68872 3.3042 5.5513 3.3042ZM3.76655 8.99818V20.4515H7.32916L7.33051 8.99818H3.76655ZM9.56465 8.99713V20.4503L13.1192 20.4517L13.1206 14.7845C13.1206 13.3298 13.3739 11.8429 15.2535 11.8429C17.1044 11.8429 17.1044 13.5976 17.1044 14.879V20.4503L20.6629 20.449V14.1689C20.6629 11.3348 20.1456 8.71224 16.3929 8.71224C14.6304 8.71224 13.4769 9.70851 13.0247 10.5618H12.9747L12.9747 8.99713H9.56465ZM22.4355 24H1.98187C1.00598 24 0.212036 23.223 0.212036 22.268V1.73068C0.212036 0.776376 1.00598 0 1.98187 0H22.4355C23.4151 0 24.212 0.776376 24.212 1.73068V22.268C24.212 23.223 23.4151 24 22.4355 24Z" fill="currentColor"/>
          </svg>
        </li>
        <li class="menu-items">
          <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.4924 2.70559C22.6363 3.08495 21.7166 3.34128 20.7497 3.45713C21.7474 2.8602 22.4937 1.92069 22.8495 0.813926C21.9122 1.37065 20.8864 1.76253 19.8167 1.97251C19.0973 1.20443 18.1445 0.69532 17.1061 0.524252C16.0678 0.353184 15.002 0.529703 14.0743 1.02642C13.1465 1.52314 12.4087 2.31225 11.9754 3.27125C11.5421 4.23025 11.4375 5.30548 11.6779 6.33C9.77873 6.23465 7.92084 5.74102 6.22479 4.88116C4.52875 4.02131 3.03246 2.81444 1.83302 1.33888C1.42291 2.04633 1.18709 2.86656 1.18709 3.74011C1.18663 4.52652 1.38029 5.30086 1.75087 5.99446C2.12147 6.68806 2.65753 7.27947 3.3115 7.7162C2.55306 7.69207 1.81137 7.48714 1.14813 7.11846V7.17998C1.14805 8.28293 1.52957 9.35193 2.22795 10.2056C2.92633 11.0593 3.89855 11.645 4.97965 11.8635C4.27608 12.0539 3.53844 12.0819 2.82243 11.9455C3.12745 12.8946 3.72161 13.7244 4.52172 14.3191C5.32183 14.9136 6.28785 15.2431 7.28452 15.2613C5.59261 16.5896 3.50311 17.3099 1.35216 17.3067C0.971148 17.3069 0.590452 17.2846 0.212036 17.2402C2.39538 18.644 4.93694 19.389 7.53263 19.386C16.3194 19.386 21.123 12.1085 21.123 5.79685C21.123 5.59179 21.1178 5.38469 21.1086 5.17962C22.0429 4.50393 22.8494 3.66721 23.4903 2.70867L23.4924 2.70559Z" fill="currentColor"/>
          </svg>
        </li>
      </ul>
    </nav>
    <section class="landing">
      <img src="https://res.cloudinary.com/odumz/image/upload/v1717767167/projects/spdp-profile-image_f4wmqf.png" alt="spdp profile picture" class="hidden xl:flex absolute object-cover h-[45rem] -top-16 -right-9 xl:-right-2">
      <img src="https://res.cloudinary.com/odumz/image/upload/v1717829481/projects/spdp-profile-image-mobile_u0tazd.png" alt="spdp profile picture" class="md:hidden absolute object-cover h-[23.9375rem] -top-24 right-20 z-10">
      <img src="https://res.cloudinary.com/odumz/image/upload/v1717833477/projects/spdp-profile-image-tab_ut2ljp.png" alt="spdp profile picture" class="hidden md:flex xl:hidden absolute object-cover h-[37.5rem] -top-24 right-0">
      <img src="https://res.cloudinary.com/odumz/image/upload/v1717767487/projects/spdp-landing-ring-vector_cnenjd.png" alt="spdp ring vector" class="absolute object-cover top-8 md:top-6 xl:top-[3.875rem] -left-40 -mx-4 md:-mx-8 lg:-mx-20 xl:-mx-[10.3125rem]">
      <img src="https://res.cloudinary.com/odumz/image/upload/v1717773833/projects/cursor_x4dlpf.png" alt="spdp circle vector" class="absolute object-cover w-[8.0625rem] h-[8.0625rem] top-[10.125rem] md:top-[23.625rem] xl:top-[28.125rem] -right-20 xl:right-[30%]" height="720" width="445">
      <div class="h-full">
        <h1 class="space-grotesk-bold md:hidden xl:flex">
          Nice to meet you!
        </h1>
        <h1 class="space-grotesk-bold md:hidden xl:flex">
          I'm
          <span>
            Adam Keyes
          </span>
          .
        </h1>
        <h1 class="space-grotesk-bold hidden md:flex xl:hidden">
          Nice to <br >meet you! I'm
        </h1>
        <h1 class="space-grotesk-bold hidden md:flex xl:hidden">
          <span>
            Adam Keyes
          </span>
          .
        </h1>
        <p class="mt-5 md:mt-[3.75rem] xl:mt-[2.6875rem]">
          Based in the UK, I'm a front-end developer passionate about building accessible web apps that users love.
        </p>
        <a href="#contact" class="btn mt-6 md:mt-[2.125rem] xl:mt-[4.125rem]">
          Contact me
        </a>
      </div>
    </section>
    <hr class="w-full text-[#979797] mt-[5rem] md:mt-[3.75rem] xl:mt-[13.6875rem]">
    <section class="skills">
      <img src="https://res.cloudinary.com/odumz/image/upload/v1717767165/projects/spdp-ring-vector_xqn7m6.png" alt="spdp ring vector" class="absolute object-cover top-[33.75rem] md:top-96 xl:top-[15.8125rem] right-0 -mx-[10.3125rem] transform rotate-180">
      <div class="skill-item">
        <h2 class="space-grotesk-bold">
          HTML
        </h2>
        <p class="skill-item__text">
          4 Years Experience
        </p>
      </div>
      <div class="skill-item">
        <h2 class="space-grotesk-bold">
          CSS
        </h2>
        <p class="skill-item__text">
          4 Years Experience
        </p>
      </div>
      <div class="skill-item">
        <h2 class="space-grotesk-bold">
          JAVASCRIPT
        </h2>
        <p class="skill-item__text">
          4 Years Experience
        </p>
      </div>
      <div class="skill-item">
        <h2 class="space-grotesk-bold">
          ACCESSIBILITY
        </h2>
        <p class="skill-item__text">
          4 Years Experience
        </p>
      </div>
      <div class="skill-item">
        <h2 class="space-grotesk-bold">
          VUE
        </h2>
        <p class="skill-item__text">
          4 Years Experience
        </p>
      </div>
      <div class="skill-item">
        <h2 class="space-grotesk-bold">
          SASS
        </h2>
        <p class="skill-item__text">
          4 Years Experience
        </p>
      </div>
    </section>
    <hr class="md:hidden w-full text-[#979797] mb-10 md:mb-[3.25rem] xl:mb-[4.5rem]">
    <section class="projects">
      <header>
        <h1 class="space-grotesk-bold">
          Projects
        </h1>
        <a href="#contact" class="btn">
          Contact me
        </a>
      </header>
      <div class="projects-container mt-20">
        <div class="project-item">
          <div class="project-item__image group">
            <img src="https://res.cloudinary.com/odumz/image/upload/v1717767168/projects/spdp-portfolio-portfolio_gofokn.png" alt="spdp pjt portfolio" class="">
            <div class="project-item__btns group-hover:grid">
              <button class="btn">
                VIEW PROJECT
              </button>
              <button class="btn">
                VIEW CODE
              </button>
            </div>
          </div>
          <h3 class="space-grotesk-bold mt-5 text-white">
            DESIGN PORTFOLIO
          </h3>
          <p class="project-item__description">
            <span>HTML</span><span>CSS</span>
          </p>
        </div>
        <div class="project-item">
          <div class="project-item__image group">
            <img src="https://res.cloudinary.com/odumz/image/upload/v1717767166/projects/spdp-pjt-landing_eazcfu.png" alt="spdp pjt landing" class="">
            <div class="project-item__btns group-hover:grid">
              <button class="btn">
                VIEW PROJECT
              </button>
              <button class="btn">
                VIEW CODE
              </button>
            </div>
          </div>
          <h3 class="space-grotesk-bold mt-5 text-white">
            E-LEARNING LANDING PAGE
          </h3>
          <p class="project-item__description">
            <span>HTML</span><span>CSS</span>
          </p>
        </div>
        <div class="project-item">
          <div class="project-item__image group">
            <img src="https://res.cloudinary.com/odumz/image/upload/v1717767165/projects/spdp-pjt-todo_pyqcs8.png" alt="spdp pjt todo" class="">
            <div class="project-item__btns group-hover:grid">
              <button class="btn">
                VIEW PROJECT
              </button>
              <button class="btn">
                VIEW CODE
              </button>
            </div>
          </div>
          <h3 class="space-grotesk-bold mt-5 text-white">
            TODO WEB APP
          </h3>
          <p class="project-item__description">
            <span>HTML</span><span>CSS</span><span>JAVASCRIPT</span>
          </p>
        </div>
        <div class="project-item">
          <div class="project-item__image group">
            <img src="https://res.cloudinary.com/odumz/image/upload/v1717767166/projects/spdp-pjt-entertainment_od4trg.png" alt="spdp pjt entertainment" class="">
            <div class="project-item__btns group-hover:grid">
              <button class="btn">
                VIEW PROJECT
              </button>
              <button class="btn">
                VIEW CODE
              </button>
            </div>
          </div>
          <h3 class="space-grotesk-bold mt-5 text-white">
            ENTERTAINMENT WEB APP
          </h3>
          <p class="project-item__description">
            <span>HTML</span><span>CSS</span><span>JAVASCRIPT</span>
          </p>
        </div>
        <div class="project-item">
          <div class="project-item__image group">
            <img src="https://res.cloudinary.com/odumz/image/upload/v1717767166/projects/spdp-pjt-game_bgmp1h.png" alt="spdp pjt game" class="">
            <div class="project-item__btns group-hover:grid">
              <button class="btn">
                VIEW PROJECT
              </button>
              <button class="btn">
                VIEW CODE
              </button>
            </div>
          </div>
          <h3 class="space-grotesk-bold mt-5 text-white">
            MEMORY GAME
          </h3>
          <p class="project-item__description">
            <span>HTML</span><span>CSS</span><span>JAVASCRIPT</span>
          </p>
        </div>
        <div class="project-item">
          <div class="project-item__image group">
            <img src="https://res.cloudinary.com/odumz/image/upload/v1717767167/projects/spdp-pjt-gallery_fe7rg3.png" alt="spdp pjt portfolio" class="">
            <div class="project-item__btns group-hover:grid">
              <button class="btn">
                VIEW PROJECT
              </button>
              <button class="btn">
                VIEW CODE
              </button>
            </div>
          </div>
          <h3 class="space-grotesk-bold mt-5 text-white">
            ART GALLERY SHOWCASE
          </h3>
          <p class="project-item__description">
            <span>HTML</span><span>CSS</span><span>JAVASCRIPT</span>
          </p>
        </div>
      </div>
    </section>
    <section class="footer">
      <div class="footer-contact" id="contact">
      <div
        class="fixed top-12 right-10 z-30 grid place-content-center"
        :class="[showAlert ? '' : 'hidden']"
      >
        <Alert
          @close="showAlert = false"
          alertName="transaction"
          :type="type"
          :message="message"
        />
      </div>
        <img src="https://res.cloudinary.com/odumz/image/upload/v1717767165/projects/spdp-ring-vector_xqn7m6.png" alt="spdp ring vector" class="absolute object-cover top-[410px] md:top-[31.25rem] xl:top-[15.8125rem] -left-40">
        <header>
          <h1>
            Contact
          </h1>
          <p class="w-full md:w-3/5 mt-5 xl:mt-9 text-center xl:text-left">
            I would love to hear about your project and how I could help. Please fill in the form, and I'll get back to you as soon as possible.
          </p>
        </header>
        <form>
          <div class="relative grid content-start">
            <input type="text" v-model="contact.name" @blur.prevent="checkError.name(contact.name)" @keyup.prevent="checkError.name(contact.name)" class="bg-transparent outline-none border-b pb-4" :class="[hasError?.name ? 'border-[#FF6F5B]' : 'border-[#979797]']" placeholder="NAME">
            <svg v-if="hasError.name" class="absolute justify-self-end bottom-3 animate-flyIn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11.5" stroke="#FF6F5B"/>
              <rect x="11" y="6" width="2" height="9" rx="1" fill="#FF6F5B"/>
              <rect x="11" y="17" width="2" height="2" rx="1" fill="#FF6F5B"/>
            </svg>
            <p class="absolute top-12 text-[.75rem] leading-4 tracking-[-0.0106rem] text-[#FF6F5B] justify-self-end animate-flyIn">{{ hasErrorMsg?.name }}</p>
          </div>
          <div class="relative grid content-start">
            <input type="email" v-model="contact.email" @blur.prevent="checkError.email(contact.email)" @keyup.prevent="checkError.email(contact.email)" class="bg-transparent outline-none border-b pb-4" :class="[hasError?.email ? 'border-[#FF6F5B]' : 'border-[#979797]']" placeholder="EMAIL">
            <svg v-if="hasError.email" class="absolute justify-self-end bottom-3 animate-flyIn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11.5" stroke="#FF6F5B"/>
              <rect x="11" y="6" width="2" height="9" rx="1" fill="#FF6F5B"/>
              <rect x="11" y="17" width="2" height="2" rx="1" fill="#FF6F5B"/>
            </svg>
            <p class="absolute top-12 text-[.75rem] leading-4 tracking-[-0.0106rem] text-[#FF6F5B] justify-self-end animate-flyIn">{{ hasErrorMsg?.email }}</p>
          </div>
          <div class="relative grid content-start">
            <textarea cols="50" rows="5" v-model="contact.message" @blur.prevent="checkError.message(contact.message)" @keyup.prevent="checkError.message(contact.message)" class="bg-transparent outline-none border-b pb-4" :class="[hasError.message ? 'border-[#FF6F5B]' : 'border-[#979797]']" placeholder="MESSAGE"></textarea>
            <svg v-if="hasError.message" class="absolute justify-self-end bottom-3 animate-flyIn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11.5" stroke="#FF6F5B"/>
              <rect x="11" y="6" width="2" height="9" rx="1" fill="#FF6F5B"/>
              <rect x="11" y="17" width="2" height="2" rx="1" fill="#FF6F5B"/>
            </svg>
            <p class="absolute top-[9.375rem] text-[.75rem] leading-4 tracking-[-0.0106rem] text-[#FF6F5B] justify-self-end animate-flyIn">{{ hasErrorMsg?.message }}</p>
          </div>
          <button @click.prevent="submit" :class="[isLoading ? 'cursor-progress opacity-65' : '']" class="btn justify-self-end" :isDisabled="isDisabled">
            SEND MESSAGE
          </button>
        </form>
      </div>
      <hr class="w-full text-[#979797] mt-[5.4375rem] md:mt-[5.75rem]">
      <nav class="mb-10 md:mb-[5.75rem]">
        <a href="#logo" class="logo">
          adamkeyes
        </a>
        <ul class="menu">
          <li class="menu-items">
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3035 0C5.50583 0 0 5.50583 0 12.3035C0 17.7478 3.52188 22.3463 8.41254 23.9765C9.02771 24.0842 9.2584 23.715 9.2584 23.3921C9.2584 23.0999 9.24302 22.131 9.24302 21.1005C6.15176 21.6696 5.35203 20.347 5.10596 19.6549C4.96755 19.3012 4.36775 18.2092 3.84485 17.917C3.41423 17.6863 2.79905 17.1173 3.82947 17.1019C4.79838 17.0865 5.49045 17.9939 5.72114 18.363C6.82846 20.2239 8.59709 19.701 9.30454 19.3781C9.4122 18.5783 9.73516 18.04 10.0889 17.7325C7.35136 17.4249 4.49079 16.3637 4.49079 11.6576C4.49079 10.3196 4.96755 9.21227 5.7519 8.35102C5.62886 8.04343 5.19824 6.78232 5.87493 5.09058C5.87493 5.09058 6.90535 4.76762 9.2584 6.3517C10.2427 6.07487 11.2885 5.93645 12.3343 5.93645C13.3801 5.93645 14.4259 6.07487 15.4102 6.3517C17.7632 4.75224 18.7936 5.09058 18.7936 5.09058C19.4703 6.78232 19.0397 8.04343 18.9167 8.35102C19.701 9.21227 20.1778 10.3042 20.1778 11.6576C20.1778 16.3791 17.3018 17.4249 14.5643 17.7325C15.0103 18.1169 15.3948 18.8552 15.3948 20.0086C15.3948 21.6542 15.3794 22.9768 15.3794 23.3921C15.3794 23.715 15.6101 24.0995 16.2253 23.9765C18.6676 23.1519 20.79 21.5821 22.2936 19.4882C23.7972 17.3941 24.6063 14.8814 24.6071 12.3035C24.6071 5.50583 19.1012 0 12.3035 0Z" fill="currentColor"/>
            </svg>
          </li>
          <li class="menu-items">
            <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0842 0.230569C12.8876 0.234334 12.7004 0.315057 12.5627 0.455404C12.425 0.59575 12.3479 0.784498 12.348 0.981084V15.247C12.348 15.4461 12.4271 15.637 12.5678 15.7778C12.7085 15.9185 12.8994 15.9975 13.0984 15.9975C13.2975 15.9975 13.4885 15.9185 13.6292 15.7778C13.77 15.637 13.849 15.4461 13.849 15.247V0.981084C13.8491 0.881401 13.8292 0.782702 13.7906 0.69077C13.7521 0.598826 13.6957 0.515494 13.6245 0.445622C13.5534 0.375751 13.469 0.320754 13.3765 0.283831C13.2839 0.246908 13.1848 0.228797 13.0852 0.230569H13.0842ZM24.4403 4.504C24.3423 4.50683 24.2458 4.52877 24.1562 4.5686L17.7153 7.44351C17.5836 7.50305 17.4719 7.59932 17.3934 7.72081C17.315 7.84229 17.2733 7.98382 17.2733 8.12841C17.2733 8.273 17.315 8.41453 17.3934 8.53601C17.4719 8.6575 17.5836 8.75377 17.7153 8.81331L24.1562 11.6974C24.2531 11.741 24.3578 11.7637 24.4638 11.7641C24.6355 11.7636 24.8017 11.7042 24.9348 11.596C25.0681 11.4878 25.1601 11.3372 25.1956 11.1693C25.2313 11.0015 25.2083 10.8265 25.1306 10.6735C25.0528 10.5206 24.925 10.3989 24.7683 10.3287L19.8613 8.12943L24.7683 5.93838C24.9496 5.85681 25.0911 5.70689 25.1622 5.52136C25.2333 5.33581 25.2281 5.12969 25.1478 4.94795C25.0869 4.81235 24.9872 4.69783 24.8612 4.61883C24.7354 4.53982 24.5888 4.49986 24.4403 4.504ZM1.03633 9.73538C1.1409 9.68585 1.2555 9.66117 1.37118 9.66328V9.6643C1.53469 9.66748 1.69269 9.72401 1.82113 9.82524C1.94958 9.92647 2.04144 10.0669 2.08274 10.2251C2.86827 13.2343 4.62979 15.8977 7.09133 17.7984C9.55288 19.699 12.5754 20.7294 15.6853 20.7282C15.8843 20.7282 16.0753 20.8073 16.216 20.9481C16.3568 21.0888 16.4358 21.2798 16.4358 21.4787C16.4358 21.6778 16.3568 21.8687 16.216 22.0095C16.0753 22.1502 15.8843 22.2292 15.6853 22.2292C8.60258 22.2292 2.41083 17.4473 0.63092 10.6014C0.601975 10.4894 0.599323 10.3722 0.62317 10.259C0.647017 10.1458 0.696718 10.0396 0.768389 9.94876C0.840061 9.85793 0.931763 9.7849 1.03633 9.73538Z" fill="currentColor"/>
            </svg>
          </li>
          <li class="menu-items">
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5513 3.3042C4.41165 3.3042 3.48447 4.23017 3.48447 5.36833C3.48447 6.50724 4.41165 7.4338 5.5513 7.4338C6.68872 7.4338 7.61408 6.50724 7.61408 5.36833C7.61408 4.23017 6.68872 3.3042 5.5513 3.3042ZM3.76655 8.99818V20.4515H7.32916L7.33051 8.99818H3.76655ZM9.56465 8.99713V20.4503L13.1192 20.4517L13.1206 14.7845C13.1206 13.3298 13.3739 11.8429 15.2535 11.8429C17.1044 11.8429 17.1044 13.5976 17.1044 14.879V20.4503L20.6629 20.449V14.1689C20.6629 11.3348 20.1456 8.71224 16.3929 8.71224C14.6304 8.71224 13.4769 9.70851 13.0247 10.5618H12.9747L12.9747 8.99713H9.56465ZM22.4355 24H1.98187C1.00598 24 0.212036 23.223 0.212036 22.268V1.73068C0.212036 0.776376 1.00598 0 1.98187 0H22.4355C23.4151 0 24.212 0.776376 24.212 1.73068V22.268C24.212 23.223 23.4151 24 22.4355 24Z" fill="currentColor"/>
            </svg>
          </li>
          <li class="menu-items">
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.4924 2.70559C22.6363 3.08495 21.7166 3.34128 20.7497 3.45713C21.7474 2.8602 22.4937 1.92069 22.8495 0.813926C21.9122 1.37065 20.8864 1.76253 19.8167 1.97251C19.0973 1.20443 18.1445 0.69532 17.1061 0.524252C16.0678 0.353184 15.002 0.529703 14.0743 1.02642C13.1465 1.52314 12.4087 2.31225 11.9754 3.27125C11.5421 4.23025 11.4375 5.30548 11.6779 6.33C9.77873 6.23465 7.92084 5.74102 6.22479 4.88116C4.52875 4.02131 3.03246 2.81444 1.83302 1.33888C1.42291 2.04633 1.18709 2.86656 1.18709 3.74011C1.18663 4.52652 1.38029 5.30086 1.75087 5.99446C2.12147 6.68806 2.65753 7.27947 3.3115 7.7162C2.55306 7.69207 1.81137 7.48714 1.14813 7.11846V7.17998C1.14805 8.28293 1.52957 9.35193 2.22795 10.2056C2.92633 11.0593 3.89855 11.645 4.97965 11.8635C4.27608 12.0539 3.53844 12.0819 2.82243 11.9455C3.12745 12.8946 3.72161 13.7244 4.52172 14.3191C5.32183 14.9136 6.28785 15.2431 7.28452 15.2613C5.59261 16.5896 3.50311 17.3099 1.35216 17.3067C0.971148 17.3069 0.590452 17.2846 0.212036 17.2402C2.39538 18.644 4.93694 19.389 7.53263 19.386C16.3194 19.386 21.123 12.1085 21.123 5.79685C21.123 5.59179 21.1178 5.38469 21.1086 5.17962C22.0429 4.50393 22.8494 3.66721 23.4903 2.70867L23.4924 2.70559Z" fill="currentColor"/>
            </svg>
          </li>
        </ul>
      </nav>
    </section>
  </main>
</template>

<style scoped>
main {
  @apply relative grid content-start bg-spdp-black cursor-default;
}

nav {
  @apply relative z-10 grid justify-items-center md:flex items-center justify-center md:justify-between gap-y-5 mt-10 px-4 md:px-8 lg:px-20 xl:px-[10.3125rem];
}

.logo {
  @apply hover:text-spdp-green transition-all duration-300 ease-in-out text-[1.5rem] md:text-[2rem];
}

.menu {
  @apply flex items-center gap-x-8;
}

.menu-items {
  @apply hover:text-spdp-green cursor-pointer transition-all duration-300 ease-in-out;
}

.landing {
  @apply relative grid content-start px-4 md:px-8 lg:px-20 xl:px-[10.3125rem] max-w-fit overflow-x-clip;
}

.landing > div {
  @apply relative grid content-start justify-items-center md:justify-items-start mt-[20.6875rem] md:mt-[5.625rem] xl:mt-[7.9375rem] gap-y-1 overflow-x-hidden;
}

.landing > div > h1 > span {
  @apply underline underline-offset-8 md:underline-offset-[.9375rem] xl:underline-offset-[1.125rem] decoration-spdp-green;
}

.landing > div > p {
  @apply text-spdp-ash mt-10 md:mt-[3.75rem] md:w-[55%] xl:w-2/5 text-center md:text-left;
}

.skills {
  @apply relative grid content-start grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-10 md:mt-[3.25rem] xl:mt-[4.5rem] gap-y-6 md:gap-y-[3.25rem] xl:gap-y-[3.625rem] px-4 md:px-8 lg:px-20 xl:px-[10.3125rem] overflow-hidden;
}

.skill-item {
  @apply grid content-start pt-[.875rem];
}

.skill-item__text {
  @apply text-spdp-ash;
}

.projects {
  @apply grid content-start my-20 md:my-[6.25rem] xl:my-[8.75rem] px-4 md:px-8 lg:px-20 xl:px-[10.3125rem];
}

.projects > header {
  @apply flex justify-between items-center
}

.projects-container {
  @apply grid content-start grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-[3.75rem] xl:gap-y-[4.375rem] md:gap-x-6 xl:gap-x-[1.875rem]
}

.projects-item {
  @apply grid content-start justify-items-start;
}

.project-item__image {
  @apply relative
}

.project-item__btns {
  @apply absolute hidden content-center justify-items-center gap-y-5 md:gap-y-9 xl:gap-y-12 bg-black h-full w-full top-0 bg-opacity-75 animate-flyInSide;
}

.project-item__description {
  @apply flex items-center gap-x-[1.125rem] text-spdp-ash mt-2;
}

.footer {
  @apply grid content-start justify-center bg-spdp-gray pt-[3.75rem] xl:pt-[5.25rem] px-4 md:px-8 lg:px-20 xl:px-[10.3125rem];
}

.footer-contact {
  @apply relative grid xl:flex justify-between items-start w-full;
}

.footer-contact > header {
  @apply grid content-start justify-items-center xl:justify-items-start;
}

.footer-contact > form {
  @apply grid content-start gap-y-8 mt-[3.125rem]
}
</style>
