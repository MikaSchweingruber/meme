<template>
    <v-card max-width="600px">


        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="Item.name" label="Meme Name"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                        <v-file-input v-model="Item.picture" label="Picture" accept="image/*"></v-file-input>

                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-select v-model="Item.category" :items="categoryOptions" :item-text="formatCategoryOption"
                            label="Category" outlined></v-select>

                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="Item.source" label="Source"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="Item.creator" label="Creator"></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="likesAsNumber" label="Likes"></v-text-field>
                    </v-col> -->

                </v-row>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="$emit('close')">
                Cancel
            </v-btn>
            <v-btn color="primary" @click="$emit('save', Item)">
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {
    name: "FormComponent",
    props: ['Item'],
    data: () => ({
        selectedFile: null,
        selectedCategory: null,
        categoryOptions: [],

    }),
    mounted() {
        axios.get('http://127.0.0.1:8000/api/categories/')
            .then(response => {
                this.categoryOptions = response.data;
            })
            .catch(error => {
                console.log(error);
            });
    },


    async created() {
        const picture = this.Item.picture
        this.Item.picture=[]
        const resp = await axios.get(picture)
        const file = new File([resp.data], resp.config.url.split("/")[5], { type: resp.headers["content-type"] })
        this.Item.picture=file
    },
    // computed: {
    //     likesAsNumber: {
    //         get() {
    //             return Number(this.Item.likes);
    //         },
    //         set(value) {
    //             if (!isNaN(value)) {
    //                 this.Item.likes = value;
    //             }
    //         }
    //     }
    // },
    methods: {
        formatCategoryOption(option) {
            return option[1]; // Rückgabe des Wertes (value) aus dem Schlüssel-Wert-Paar
        },
        async getImageFile(url) {
            const response = await fetch(url)
            const blob = await response.blob()
            // return new File([blob], 'image.jpg', { type:  })

        }
    }
}
</script>

<style scoped></style>