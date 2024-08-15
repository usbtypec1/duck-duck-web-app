<template>
  <section class="px-4 py-5 flex flex-col gap-y-2">
    <div class="border-b border-gray-200 pb-2">
      <p class="font-semibold">Секретное сообщение:</p>
      <p v-html="theme.secret_message_template_text"></p>
    </div>
    <div class="border-b border-gray-200 pb-2">
      <p class="font-semibold">Секретное медиа:</p>
      <p v-html="theme.secret_media_template_text"></p>
    </div>
    <div class="border-b border-gray-200 pb-2">
      <p class="font-semibold">Кнопка просмотра секретного сообщения:</p>
      <p>{{ theme.secret_message_view_button_text }}</p>
    </div>
    <div class="border-b border-gray-200 pb-2">
      <p class="font-semibold">Кнопка удаления секретного сообщения:</p>
      <p>{{ theme.secret_message_delete_button_text }}</p>
    </div>
    <div class="border-b border-gray-200 pb-2">
      <p class="font-semibold">Текст подтверждения прочтения:</p>
      <p v-html="theme.secret_message_read_confirmation_text"></p>
    </div>
    <div class="border-b border-gray-200 pb-2">
      <p class="font-semibold">Текст подтверждения удаления:</p>
      <p>{{ theme.secret_message_deleted_confirmation_text }}</p>
    </div>
    <div class="border-b border-gray-200 pb-2">
      <p class="font-semibold">Текст предупреждения удаленного сообщения:</p>
      <p>{{ theme.secret_message_deleted_text }}</p>
    </div>
    <div>
      <p class="font-semibold">Текст предупреждения отсутствующего сообщения:</p>
      <p>{{ theme.secret_message_missing_text }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Theme } from '~/types/themes'

const props = defineProps<{ theme: Theme }>()
</script>
