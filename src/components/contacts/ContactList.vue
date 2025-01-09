<script setup>
  import ContactListItem from "@/components/contacts/ContactListItem.vue";
  const props = defineProps({
    contacts: {
      type: Array,
      required: true,
    },
  });
</script>

<template>
  <ul id="contacts-list" class="divide-y divide-gray-200">
    <!-- Example Contact Item -->
    <ContactListItem
      v-for="contact in contacts"
      :key="contact.id"
      :contact="contact"
    />
  </ul>
</template>
