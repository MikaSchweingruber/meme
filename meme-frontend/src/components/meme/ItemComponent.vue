<template>
    <v-card>
        <v-card-title primary-title>
            <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.name" label="Meme Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-file-input v-model="editedItem.picture" label="Picture" accept="image/*"></v-file-input>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-select v-model="editedItem.category" :items="categoryOptions" item-text="name" item-value="name"
                            label="Category" outlined></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.source" label="Source (link or person)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.creator" label="Creator"></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="$emit('close')">
                Cancel
            </v-btn>
            <v-btn color="primary" @click="$emit('save', editedItem)">
                
                Save
            </v-btn>
           
        </v-card-actions>

        <!-- <FormComponent :Item="editedItem" @save="$emit('save', editedItem)" @close="$emit('close')"></FormComponent> -->
        
        
        <!-- <p> {{ editedIndex }}</p>
        <p> {{ editedItem }}</p>
        <br>
        <p>{{ categoryOptions }}</p> -->


    </v-card>
</template>

<script>
import Repository from "@/repository/RepositoryFactory.js";

const categories = Repository.get("category")

export default {
    name: "ItemComponent",
    props: {
        editedIndex: {
            type: Number,
        },
        editedItem: {
            type: Object,
            default: () => ({
                name: '',
                picture: {},
                category: '',
                source: '',
                creator: '',
                // likes: 3,
                // dislikes: 0
            })
        }
    },

    data: () => ({
        selectedFile: null,
        selectedCategory: null,
        categoryOptions: [],


    }),
    created() {
        this.getAllCategories()
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },


    },
    methods: {
        async getAllCategories() {
            const response = await categories.all()
            this.categoryOptions = response.data
        }
    }
}
</script>

<style scoped></style>