import { defineStore } from "pinia";
import { reactive, watch, computed, ref } from "vue";

export const useContactsStore = defineStore("contacts", () => {
  const contacts = reactive(
    JSON.parse(localStorage.getItem("contacts")) || [
      {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+123 456 789",
      },
      {
        id: 2,
        name: "Jane Sith",
        email: "janesmith@example.com",
        phone: "+987 654 321",
      },
    ]
  );

  const searchQuery = ref("");

  const filteredContacts = computed(() => {
    if (!searchQuery.value) return contacts;

    const searchLower = searchQuery.value.toLowerCase();
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower)
    );
  });

  const filteredContactsCount = computed(() => filteredContacts.value.length);

  const addContact = (contact) => {
    contacts.push(contact);
    return true;
  };

  const updateContact = (updatedContact) => {
    const index = contacts.findIndex(
      (contact) => contact.id === updatedContact.id
    );
    if (index !== -1) {
      contacts[index] = { ...updatedContact };
      return true;
    }
    return false; // Retourne false si aucun contact n'a été trouvé
  };

  const deleteOneById = (id) => {
    const index = contacts.findIndex((item) => item.id == id);
    contacts.splice(index, 1); // Supprime l'élément à l'index trouvé
  };

  watch(
    contacts,
    (newContacts) => {
      localStorage.setItem("contacts", JSON.stringify(newContacts));
    },
    { deep: true }
  );
  return {
    contacts,
    addContact,
    updateContact,
    deleteOneById,
    searchQuery,
    filteredContacts,
    filteredContactsCount,
  };
});
