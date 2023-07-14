<template>
    <div>
        
        
        <v-card class="card" color="secondary">
            <v-img class="img" :src="item.picture" :aspect-ratio="4 / 4" contain></v-img>
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-text>
                Source: {{ item.source }}
                <br>
                Creator: {{ item.creator }}
                <br>
                Category: {{ item.category }}
                <br>
                <v-icon class="icondelete" @click="deleteItem(item)">mdi-delete</v-icon>
                <v-icon class="iconedit" @click="editItem(item)">mdi-pencil</v-icon>
            </v-card-text>

            <v-dialog v-model="dialog" width="auto">
                <template>
                    <!-- <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" @click="">
            New Item
        </v-btn> -->
                </template>
                <ItemComponent :editedIndex="editedIndex" :editedItem="editedItem" @close="close" @save="save" />
            </v-dialog>

        </v-card>
        <v-dialog v-model="dialogDelete" max-width="900px">
            <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete {{ item.name }}?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
  
<script>
import ItemComponent from "@/components/meme/ItemComponent"
import Repository from "@/repository/RepositoryFactory.js";
const memes = Repository.get("meme")



export default {
    name: "MemeComponent",

    components: {
        ItemComponent
    },
    props: {
        item: {
            type: Object,
            default: () => ({
                name: '',
                picture: {},
                category: '',
                source: '',
                creator: '',
                // likes: 0
            })
        }
    },
    data: () => ({
        search: '',
        dialog: false,
        dialogDelete: false,
    }),
    created() {
        console.log(this.item)
    },
    mounted() {


    },

    methods: {
      


        async editItem(item) {
            this.editedIndex = this.memes.indexOf(item)
            this.editedItem = Object.assign({}, item)
            const resp = await fetch(this.editedItem.picture)
            const blob = await resp.blob()
            const file = new File([blob], resp.url.split("/")[5])
            this.editedItem.picture = file
            this.dialog = true
        },
        async save(item) {
            if (this.editedIndex > -1) {
                Object.assign(this.memes[this.editedIndex], this.editedItem)

                const formData = new FormData();
                formData.append('name', this.editedItem.name)
                formData.append('picture', this.editedItem.picture)
                formData.append('category', this.editedItem.category)
                formData.append('source', this.editedItem.source)
                formData.append('creator', this.editedItem.creator)
                formData.append('likes', this.editedItem.likes)
                await memes.put(this.editedItem.id, formData)

            } else {
                console.log(await item.picture)
                const formData = new FormData();
                formData.append('name', item.name)
                formData.append('picture', item.picture)
                formData.append('category', item.category)
                formData.append('source', item.source)
                formData.append('creator', item.creator)
                formData.append('likes', item.likes)
                await this.createMeme(formData)
            }
            await this.getAllMemes()
            this.close()
        },
        

        // Delete Item
        deleteItem(item) {
            this.editedIndex = this.memes.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true

        },
        async deleteItemConfirm() {
            console.log(this.editedItem)
            await memes.delete(this.editedItem.id)
            await this.getAllCategoryMemes()
            this.closeDelete()

        },
        closeDelete() {

            this.dialogDelete = false

        },
        close() {
            this.dialog = false
            this.editedIndex = -1
            this.editedItem = Object.assign({}, this.defaultItem)
        },
    },
    computed: {

    }


}


</script>
  
<style scoped>
.icondelete {
    left: 90%;

}

.iconedit {
    left: 70%;
}
</style>