<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Alerts'
})
</script>

<script setup lang="ts">
import { toRefs } from 'vue'

const emits = defineEmits(['close'])

const props = defineProps<{
  alertName: String
  type?: String
  message?: String
  title?: String
  aboutLine?: any
}>()

const closeAlert: any = () => {
  emits('close')
}

const { alertName } = toRefs(props)
</script>

<template>
  <div
    v-if="alertName == 'transaction'"
    class="transaction"
    :class="[
      type == 'info'
        ? 'info'
        : type == 'success'
          ? 'success'
          : type == 'attention'
            ? 'attention'
            : 'failed'
    ]"
  >
    <div class="alert">
      <div v-if="type == 'info' || 'attention'">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21.9995 11.9996C21.9995 17.5236 17.5225 21.9996 11.9995 21.9996C6.47651 21.9996 1.99951 17.5236 1.99951 11.9996C1.99951 6.47757 6.47651 1.99957 11.9995 1.99957C17.5225 1.99957 21.9995 6.47757 21.9995 11.9996Z"
            fill="currentColor"
          />
          <path
            d="M12 14.3074C12.6958 14.3074 13.2631 13.7582 13.2631 13.0845V6.90711C13.2631 6.23346 12.6958 5.6842 12 5.6842C11.3042 5.6842 10.7368 6.23346 10.7368 6.90711V13.0845C10.7368 13.7582 11.3042 14.3074 12 14.3074Z"
            fill="white"
          />
          <path
            d="M12.0002 15.8522C11.3106 15.8522 10.7478 16.4055 10.7478 17.0841C10.7478 17.7627 11.3164 18.316 12.0146 18.316C12.7098 18.316 13.2741 17.7627 13.2741 17.0841C13.2741 16.4055 12.7098 15.8522 12.0002 15.8522Z"
            fill="white"
          />
        </svg>
      </div>
      <div v-else-if="type == 'success'">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M22.5264 11.2632C22.5264 16.7872 18.0494 21.2632 12.5264 21.2632C7.00337 21.2632 2.52637 16.7872 2.52637 11.2632C2.52637 5.74118 7.00337 1.26318 12.5264 1.26318C18.0494 1.26318 22.5264 5.74118 22.5264 11.2632Z"
            fill="#12703A"
          />
          <path
            d="M10.761 17C10.4328 17 10.1045 16.8692 9.85383 16.6059L6.37593 12.9532C5.87469 12.4268 5.87469 11.574 6.37593 11.0491C6.87717 10.5227 7.68765 10.5211 8.1889 11.0476L10.761 13.749L16.8111 7.39483C17.3123 6.86839 18.1228 6.86839 18.6241 7.39483C19.1253 7.92127 19.1253 8.77403 18.6241 9.30047L11.6683 16.6059C11.4176 16.8692 11.0893 17 10.761 17Z"
            fill="white"
          />
        </svg>
      </div>
      <div v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4.72251 21.1672C4.70951 21.1672 4.69751 21.1672 4.68351 21.1662C4.36851 21.1502 4.05951 21.0822 3.76551 20.9632C2.31851 20.3752 1.62051 18.7222 2.20751 17.2762L9.52851 4.45025C9.78051 3.99425 10.1625 3.61225 10.6285 3.35425C11.9935 2.59825 13.7195 3.09525 14.4745 4.45925L21.7475 17.1872C21.9095 17.5682 21.9785 17.8782 21.9955 18.1942C22.0345 18.9502 21.7765 19.6752 21.2705 20.2362C20.7645 20.7972 20.0695 21.1282 19.3145 21.1662L4.79451 21.1672H4.72251Z"
            fill="#F5222D"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.1245 10.0208C11.1245 9.53875 11.5175 9.14575 11.9995 9.14575C12.4815 9.14575 12.8745 9.53875 12.8745 10.0208V12.8488C12.8745 13.3318 12.4815 13.7238 11.9995 13.7238C11.5175 13.7238 11.1245 13.3318 11.1245 12.8488V10.0208ZM11.1245 16.2699C11.1245 15.7849 11.5175 15.3899 11.9995 15.3899C12.4815 15.3899 12.8745 15.7799 12.8745 16.2589C12.8745 16.7519 12.4815 17.1449 11.9995 17.1449C11.5175 17.1449 11.1245 16.7519 11.1245 16.2699Z"
            fill="white"
          />
        </svg>
      </div>
      <p class="transaction-description">
        <slot name="description">
          {{ message }}
        </slot>
      </p>
    </div>
    <div class="flex">
      <svg
        @click.prevent="closeAlert"
        :class="[
          type == 'info'
            ? 'text-[#3A57E8]'
            : type == 'success'
              ? 'text-[#12703A]'
              : type == 'attention'
                ? 'text-[#A27229]'
                : 'text-[#F5232E]'
        ]"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.26035 0.26035C0.607482 -0.0867832 1.1703 -0.0867832 1.51743 0.26035L8 6.74292L14.4826 0.26035C14.8297 -0.0867832 15.3925 -0.0867832 15.7397 0.26035C16.0868 0.607482 16.0868 1.1703 15.7397 1.51743L9.25708 8L15.7397 14.4826C16.0868 14.8297 16.0868 15.3925 15.7397 15.7397C15.3925 16.0868 14.8297 16.0868 14.4826 15.7397L8 9.25708L1.51743 15.7397C1.1703 16.0868 0.607482 16.0868 0.26035 15.7397C-0.0867832 15.3925 -0.0867832 14.8297 0.26035 14.4826L6.74292 8L0.26035 1.51743C-0.0867832 1.1703 -0.0867832 0.607482 0.26035 0.26035Z"
          fill="currentColor"
        />
      </svg>
    </div>
  </div>
  <div
    v-else-if="alertName == 'state'"
    class="state"
    :class="[type === 'info' ? 'info' : type === 'success' ? 'success' : 'failed']"
  >
    <div class="state-title">
      <div class="alert">
        <div v-if="type == 'info'">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21.9995 11.9996C21.9995 17.5236 17.5225 21.9996 11.9995 21.9996C6.47651 21.9996 1.99951 17.5236 1.99951 11.9996C1.99951 6.47757 6.47651 1.99957 11.9995 1.99957C17.5225 1.99957 21.9995 6.47757 21.9995 11.9996Z"
              fill="#293DA2"
            />
            <path
              d="M12 14.3074C12.6958 14.3074 13.2631 13.7582 13.2631 13.0845V6.90711C13.2631 6.23346 12.6958 5.6842 12 5.6842C11.3042 5.6842 10.7368 6.23346 10.7368 6.90711V13.0845C10.7368 13.7582 11.3042 14.3074 12 14.3074Z"
              fill="white"
            />
            <path
              d="M12.0002 15.8522C11.3106 15.8522 10.7478 16.4055 10.7478 17.0841C10.7478 17.7627 11.3164 18.316 12.0146 18.316C12.7098 18.316 13.2741 17.7627 13.2741 17.0841C13.2741 16.4055 12.7098 15.8522 12.0002 15.8522Z"
              fill="white"
            />
          </svg>
        </div>
        <div v-else-if="type == 'success'">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M22.5264 11.2632C22.5264 16.7872 18.0494 21.2632 12.5264 21.2632C7.00337 21.2632 2.52637 16.7872 2.52637 11.2632C2.52637 5.74118 7.00337 1.26318 12.5264 1.26318C18.0494 1.26318 22.5264 5.74118 22.5264 11.2632Z"
              fill="#12703A"
            />
            <path
              d="M10.761 17C10.4328 17 10.1045 16.8692 9.85383 16.6059L6.37593 12.9532C5.87469 12.4268 5.87469 11.574 6.37593 11.0491C6.87717 10.5227 7.68765 10.5211 8.1889 11.0476L10.761 13.749L16.8111 7.39483C17.3123 6.86839 18.1228 6.86839 18.6241 7.39483C19.1253 7.92127 19.1253 8.77403 18.6241 9.30047L11.6683 16.6059C11.4176 16.8692 11.0893 17 10.761 17Z"
              fill="white"
            />
          </svg>
        </div>
        <div v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4.72251 21.1672C4.70951 21.1672 4.69751 21.1672 4.68351 21.1662C4.36851 21.1502 4.05951 21.0822 3.76551 20.9632C2.31851 20.3752 1.62051 18.7222 2.20751 17.2762L9.52851 4.45025C9.78051 3.99425 10.1625 3.61225 10.6285 3.35425C11.9935 2.59825 13.7195 3.09525 14.4745 4.45925L21.7475 17.1872C21.9095 17.5682 21.9785 17.8782 21.9955 18.1942C22.0345 18.9502 21.7765 19.6752 21.2705 20.2362C20.7645 20.7972 20.0695 21.1282 19.3145 21.1662L4.79451 21.1672H4.72251Z"
              fill="#F5222D"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.1245 10.0208C11.1245 9.53875 11.5175 9.14575 11.9995 9.14575C12.4815 9.14575 12.8745 9.53875 12.8745 10.0208V12.8488C12.8745 13.3318 12.4815 13.7238 11.9995 13.7238C11.5175 13.7238 11.1245 13.3318 11.1245 12.8488V10.0208ZM11.1245 16.2699C11.1245 15.7849 11.5175 15.3899 11.9995 15.3899C12.4815 15.3899 12.8745 15.7799 12.8745 16.2589C12.8745 16.7519 12.4815 17.1449 11.9995 17.1449C11.5175 17.1449 11.1245 16.7519 11.1245 16.2699Z"
              fill="white"
            />
          </svg>
        </div>
        <div class="alert-title">
          <slot name="alertTitle">
            {{ title }}
          </slot>
        </div>
      </div>
      <div class="flex">
        <svg
          @click.prevent="closeAlert"
          :class="[
            type == 'info'
              ? 'text-[#3A57E8]'
              : type == 'success'
                ? 'text-[#12703A]'
                : 'text-[#F5232E]'
          ]"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.26035 0.26035C0.607482 -0.0867832 1.1703 -0.0867832 1.51743 0.26035L8 6.74292L14.4826 0.26035C14.8297 -0.0867832 15.3925 -0.0867832 15.7397 0.26035C16.0868 0.607482 16.0868 1.1703 15.7397 1.51743L9.25708 8L15.7397 14.4826C16.0868 14.8297 16.0868 15.3925 15.7397 15.7397C15.3925 16.0868 14.8297 16.0868 14.4826 15.7397L8 9.25708L1.51743 15.7397C1.1703 16.0868 0.607482 16.0868 0.26035 15.7397C-0.0867832 15.3925 -0.0867832 14.8297 0.26035 14.4826L6.74292 8L0.26035 1.51743C-0.0867832 1.1703 -0.0867832 0.607482 0.26035 0.26035Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
    <div class="state-response">
      <slot name="description">
        {{ message }}
      </slot>
    </div>
  </div>
</template>

<style scoped>
.transaction {
  @apply flex items-center justify-between max-w-fit gap-x-3;
}

.state {
  @apply grid content-start;
}

.transaction,
.state {
  @apply p-4 w-full animate-flyIn;
}

.state-title {
  @apply flex items-center justify-between gap-3;
}

.alert {
  @apply flex items-center gap-2;
}

.state-response {
  @apply mt-3 max-w-md;
}

.alert-title,
.state-response {
  @apply text-[#262626];
}

.attention {
  @apply border-2 border-[#E8C23A] rounded-xl text-[#A27229] bg-[#FAF0D8];
}

.info {
  @apply border-2 border-[#3A57E8] rounded text-[#293DA2] bg-[#D8DDFA];
}

.success {
  @apply border-2 border-[#01A83A] rounded text-[#12703A] bg-[#CEFFD9];
}

.failed {
  @apply border-2 border-[#F5222D] rounded text-[#A94A13] bg-[#FFE5E5];
}

.transaction-description {
  @apply text-base;
}

.about {
  @apply grid content-start box-border pt-12 px-9 h-[348px] rounded-lg shadow hover:shadow-lg;
}

.about-heading {
  @apply text-white text-[25px] font-semibold mb-6;
}

.about-line {
  @apply flex w-[22%] h-3 mb-9;
}
</style>
