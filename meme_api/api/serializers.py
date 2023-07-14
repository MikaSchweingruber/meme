from rest_framework import serializers
from api.models import MemeModel, CategoryModel, CommentModel, UserModel


# from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = [
            'username',
            'ou',
            'first_name',
            'last_name',
            'email',
            'mobile',
            'phone',
            'is_staff',
            'is_active',
            'date_joined'
            
        ]

# class UserSerializer(serializers.ModelSerializer):
#    # snippets = serializers.PrimaryKeyRelatedField(many=True, queryset=Snippet.objects.all())
    

#     class Meta:
#         model = User
#         fields = ['id', 'username']

class CommentSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = CommentModel
        fields = ['id', 'text', 'creator','meme','likes', 'dislikes' ]

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = CategoryModel
        fields = ['name']

class MemeSerializer(serializers.ModelSerializer):
    #owner = serializers.ReadOnlyField(source='owner.username')
    #category = serializers.StringRelatedField(many=False)
    #creator = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    

    class Meta:
        model = MemeModel
        fields = ['id', 'name', 'picture', 'category','source', 'creator', 'likes', 'dislikes', 'comments']


