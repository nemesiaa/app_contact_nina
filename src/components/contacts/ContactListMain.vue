<script setup>
  import ContactList from "@/components/contacts/ContactList.vue";
  import { useContactsStore } from "@/stores/contacts";
  const contactsStore = useContactsStore();
  // const contactsCount = contactsStore.contactsCount;
</script>
<template>
  <main class="container mx-auto px-4 mt-6 flex-grow">
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Contact List Section -->
      <section class="w-full lg:w-2/3 bg-white rounded-lg shadow p-6">
        <h2 class="text-xl mb-4 flex justify-between">
          <span class="font-semibold">Contacts</span>
          <span class="text-sm"
            >{{ contactsStore.filteredContactsCount }} item(s)</span
          >
        </h2>
        <div class="flex items-center mb-4">
          <input
            type="text"
            v-model="contactsStore.searchQuery"
            placeholder="Search contacts..."
            class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <ContactList :contacts="contactsStore.filteredContacts" />
      </section>
    </div>
  </main>
</template>
