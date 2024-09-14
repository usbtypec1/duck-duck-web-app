<template>
  <div class="flex justify-between border-b pt-1 pb-3 items-center">
    <div class="flex items-center gap-x-2">
      <div>
        <span>{{ tagNumber }}.&nbsp</span>
      </div>
      <div>
        <div>
          <TagListItemWeightEmoji :weight="tag.weight"/>
          <span class="font-semibold text-md">&nbsp{{ tag.text }}</span>
        </div>
        <div>
          <span class="text-sm">от {{ usernameOrFullName(tag.of_user) }}</span>
        </div>
        <div>
          <span class="text-xs">{{ formattedCreatedAt }}</span>
        </div>
      </div>
    </div>
    <div>
      <Button
        @click="onDeleteTag"
        icon="pi pi-money-bill"
        severity="danger"
        size="small"
        rounded
        text
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tag } from '~/types/tags'
import TagListItemWeightEmoji from '~/components/tags/TagListItemWeightEmoji.vue'
import { usernameOrFullName } from '~/services/users'

const props = defineProps<{ tag: Tag, tagNumber: number }>()

const tagsStore = useTagsStore()
const toast = useToast()

const confirm = useConfirm()

const formattedCreatedAt = useDateFormat(props.tag.created_at, 'DD MMMM YYYY год, HH:mm (UTC)', { locales: 'ru-RU' })

const onDeleteTag = () => {
  confirm.require({
    header: `${props.tag.text}`,
    message: `Вы уверены, что хотите продать награду эту награду?`,
    accept: async () => {
      try {
        await tagsStore.deleteTag(props.tag.id)
        toast.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Награда успешно продана',
          life: 3000,
        })
        await tagsStore.fetchTags()
      } catch (error) {
        console.error(error)
        toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Не удалось удалить тег',
          life: 3000,
        })
      }
    },
    acceptProps: {
      label: 'Продать',
      icon: 'pi pi-money-bill',
      severity: 'danger',
    },
    rejectProps: {
      label: 'Отменить',
      icon: 'pi pi-times',
      severity: 'success',
    },
  })
}
</script>
