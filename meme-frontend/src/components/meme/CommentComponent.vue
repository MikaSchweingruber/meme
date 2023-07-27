<template>
    <v-card>
        <v-card-title primary-title>
            Comments
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="NewComment">New Comment</v-btn>
        </v-card-title>
        <v-card-text v-for="(item) in editedItem.comments" :key="item.id"> 
            
        <!-- <v-card-text v-for="(item) in newItem" :key="item.id"> -->
            <v-card color="grey darken-3" class="comment">
                {{ item.creator }}: {{ item.text }}

                <br>
                <v-icon class="icon" @click="like(item.id, username)"
                    :color="item.likes.includes(username) ? 'grey' : 'white'">mdi-thumb-up</v-icon>
                {{ item.likes.length }}
                <v-icon class="icon" @click="dislike(item.id, username)"
                    :color="item.dislikes.includes(username) ? 'grey' : 'white'">mdi-thumb-down</v-icon>
                {{ item.dislikes.length }}
                <v-icon class="icondelete" @click="deleteItem(item)">mdi-delete</v-icon>

            </v-card>

        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="$emit('close')">
                Close
            </v-btn>
        </v-card-actions>
        <v-dialog max-width="600px" v-model="dialog">
            <AddcommentComponent :meme="editedItem.id" @close="close" @save="save" />
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="900px">
            <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete &nbsp;"<span style="color: rgb(161, 164, 159);">{{ editedComment.text }}</span>"&nbsp; from  &nbsp;<span style="color: rgb(161, 164, 159);">{{ editedComment.creator }}</span>?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm(editedComment)">Yes</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-card>
</template>

<script>
import Repository from "@/repository/RepositoryFactory.js";
import AddcommentComponent from "@/components/meme/AddcommentComponent.vue"

const comments = Repository.get('comment')
const memes = Repository.get('meme')

export default {
    name: "CommentComponent",

    components: {
        AddcommentComponent,
    },
    props: {
        editedItem: {

        },




    },

    data: () => ({
        comments: [],
        memes: [],
        dialog: false,
        dialogDelete: false,
        idEditedItem: null,
        username: '',
        editedComment: {
        },
        newItem : null,
        editedIndex: -1,
    }),
    created() {
        this.getAllMemes()
        
        this.addItemToNewVariable(this.editedItem.id)
        this.username = this.$store.getters.username
    },
   

    methods: {
        async getAllMemes() {
            let response = await memes.all()
            this.memes = response.data
            console.log(this.memes)
        },
        addItemToNewVariable(itemId) {
            const selectedItem = this.memes.find(item => item.id === itemId);

            if (selectedItem) {
                this.newItem = { selectedItem };
                console.log(this.newItem)
                console.log(12)
            }
        },
        async like(comment_id, username) {
            await comments.like(comment_id, username)
            // await $emit('get')
        },
        async dislike(comment_id, username) {
            await comments.dislike(comment_id, username)
            // $emit('get')
        },
        async NewComment() {
            this.dialog = true
        },
        async save(item) {
            const formData = new FormData();
            formData.append('meme', item.meme)
            formData.append('text', item.text)
            formData.append('creator', item.creator)
            await this.createComment(formData)
            await this.close()
            location.reload() //VORÜBERGEHEND
            // this.$emit('reload', this.editedItem)
            // await this.getAllMemes()
            // console.log(this.memes(editedItem.id))
            // this.editedItem = Object.assign({}, this.memes(editedItem.id))



        },
        async createComment(comment) {
            await comments.create(comment)
        },
        async close() {
            this.dialog = false
            this.$emit('getmemes')

        },
        deleteItem(item) {
            this.editedIndex = this.editedItem.comments.indexOf(item)

            this.editedComment = Object.assign({}, item)
            this.dialogDelete = true
        },
        async deleteItemConfirm(item) {
            console.log(item)
            await comments.delete(item.id)
            await this.getAllMemes()
            this.closeDelete()
        },
        closeDelete() {
            this.dialogDelete = false
        },

    }
}
</script>

<style scoped>
.comment {
    padding: 12px;
}
</style>