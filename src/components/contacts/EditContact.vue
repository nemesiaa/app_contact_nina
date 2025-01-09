<script setup>
  import { reactive, onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { useContactsStore } from "@/stores/contacts";

  const router = useRouter();
  const route = useRoute();
  const contactsStore = useContactsStore();

  // Utilisation de reactive pour currentContact
  const currentContact = reactive({
    id: null,
    name: "",
    email: "",
    phone: "",
  });

  // Charger les données du contact à éditer lors du montage du composant
  onMounted(() => {
    // Vérifier si un contact ID existe dans les paramètres de la route
    const contactId = route.params.id;
    if (contactId) {
      // Recherche du contact avec l'id dans le store
      const contact = contactsStore.contacts.find(
        (contact) => contact.id === parseInt(contactId)
      );
      if (contact) {
        // Si le contact est trouvé, on le place dans l'objet currentContact
        currentContact.id = contact.id;
        currentContact.name = contact.name;
        currentContact.email = contact.email;
        currentContact.phone = contact.phone;
      }
    }
  });

  const saveContact = () => {
    contactsStore.updateContact({ ...currentContact });
    router.push({ name: "Dashboard" });
  };
</script>

<template>
  <section class="w-full lg:w-1/3 bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4">Update Contact</h2>
    <form @submit.prevent="saveContact" id="contact-form" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium">Name</label>
        <input
          type="text"
          id="name"
          v-model="currentContact.name"
          placeholder="John Doe"
          class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        />
      </div>
      <div>
        <label for="phone" class="block text-sm font-medium">Phone</label>
        <input
          type="tel"
          id="phone"
          v-model="currentContact.phone"
          placeholder="+123 456 789"
          class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
      >
        Update Contact
      </button>
    </form>
  </section>
</template>
