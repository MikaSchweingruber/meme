from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from api.managers import UserManager
import datetime

# Create your models here.


class UserModel(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(unique=True, max_length=100, default='', primary_key=True)
    ou = models.CharField(max_length=100, default='')
    first_name = models.CharField(max_length=100, default='')
    last_name = models.CharField(max_length=100, default='')
    email = models.EmailField(default='')
    mobile = models.CharField(max_length=100, blank=True, default='')
    phone = models.CharField(max_length=100, default='')
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.username

    


class CategoryModel(models.Model):
    name = models.CharField(max_length=15, default="", blank=False, primary_key=True)

    def __str__(self) -> str:
        return self.name

class MemeModel(models.Model):
    
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, blank=False, default='')
    picture = models.ImageField( blank=False, default='', upload_to='media')
    category = models.ForeignKey(CategoryModel, on_delete=models.CASCADE, related_name='memes')
    source = models.CharField(max_length=100, blank=False, default='')
    creator = models.ForeignKey('UserModel', related_name='memes', on_delete=models.CASCADE, to_field='username')
    likes = models.ManyToManyField('UserModel', related_name='likes', blank=True)
    dislikes = models.ManyToManyField('UserModel', related_name='dislikes', blank=True)
    

    class Meta:
        ordering = ['created']

class CommentModel(models.Model):
    text = models.TextField()
    meme = models.ForeignKey(MemeModel, on_delete=models.CASCADE, related_name='comments')
    creator = models.ForeignKey('UserModel', related_name='comments', on_delete=models.CASCADE, to_field='username')
    likes = models.ManyToManyField('UserModel', related_name='clikes', blank=True)
    dislikes = models.ManyToManyField('UserModel', related_name='cdislikes', blank=True)