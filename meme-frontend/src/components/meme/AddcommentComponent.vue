<template>
    <v-card>
        <v-card-title primary-title>
            <span class="text-h5">New Comment</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col >
                        <v-text-field v-model="editedItem.text" label="Text"></v-text-field>
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


       

    </v-card>
</template>

<script>
import Repository from "@/repository/RepositoryFactory.js";



export default {
    name: "AddcommentComponent",
    props: {
        meme: {}

    },

    data: () => ({
        editedItem: {}


    }),
    created() {
        this.$set(this.editedItem, 'meme', this.meme);
        this.editedItem.creator = this.$store.getters.username
    },
    computed: {

    },
    methods: {

    }
}
</script>

<style scoped></style>