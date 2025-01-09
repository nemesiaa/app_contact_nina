<script setup>
  import { useContactsStore } from "@/stores/contacts";
  import { useRouter } from "vue-router";
  import { reactive } from "vue";

  const router = useRouter();

  const contactsStore = useContactsStore();
  const currentContact = reactive({
    id: null,
    name: "",
    email: "",
    phone: "",
  });
  const saveContact = () => {
    currentContact.id = Date.now();
    contactsStore.addContact({ ...currentContact });
    router.push({ name: "Dashboard" });
  };
</script>

<template>
  <section class="w-full lg:w-1/3 bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4">Add Contact</h2>
    <form @submit.prevent="saveContact" id="contact-form" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium">Name</label>
        <input
          type="text"
          id="name"
          v-model="currentContact.name"
          placeholder="John Doe"
          class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium">Email</label>
        <input
          type="email"
          id="email"
          v-model="currentContact.email"
          placeholder="johndoe@example.com"
          class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label for="phone" class="block text-sm font-medium">Phone</label>
        <input
          type="tel"
          id="phone"
          v-model="currentContact.phone"
          placeholder="+123 456 789"
          pattern="^\+?[0-9]+$"
          title="Le numéro de téléphone peut commencer par + suivi de chiffres uniquement."
          required
          class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
      >
        Save Contact
      </button>
    </form>
  </section>
</template>
