<template>
    <v-card>
        <v-card-title primary-title>
            Comments
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="NewComment">New Comment</v-btn>
        </v-card-title>
        <v-card-text v-for="(item) in editedItem.comments" :key="item.id">
            <v-card color="grey darken-3" class="comment">
                {{ item.creator }}: {{ item.text }}

                <br>
                <v-icon class="icon" @click="like(item.id, 'smik1')" :color="item.likes.includes('smik1') ? 'grey' : 'white'">mdi-thumb-up</v-icon>
                {{ item.likes.length }}
                <v-icon class="icon" @click="dislike(item.id, 'smik1')" :color="item.dislikes.includes('smik1') ? 'grey' : 'white'">mdi-thumb-down</v-icon>
                {{ item.dislikes.length }}
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

    </v-card>
</template>

<script>
import Repository from "@/repository/RepositoryFactory.js";
import AddcommentComponent from "@/components/meme/AddcommentComponent.vue"

const comments = Repository.get('comment')

export default {
    name: "CommentComponent",

    components: {
        AddcommentComponent,
    },
    props: {
        editedItem: {

        }

    },

    data: () => ({
        comments: [],
        dialog: false,
    }),


    methods: {
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
            this.close()
        },
        async createComment(comment) {
            await comments.create(comment)
        },
        close() {
            this.dialog = false
            // this.editedIndex = -1
            // this.editedItem = Object.assign({}, this.defaultItem)
        },
    }
}
</script>

<style scoped>
.comment {
    padding: 12px;
}
</style>