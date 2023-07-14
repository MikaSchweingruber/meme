from django.shortcuts import render
from api.models import MemeModel, CategoryModel,  CommentModel, UserModel
from api.serializers import MemeSerializer, CategorySerializer, CommentSerializer
from api.serializers import UserSerializer
from rest_framework import permissions
# from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action



# Create your views here.

class MemeView(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = MemeModel.objects.all()
    serializer_class = MemeSerializer
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = MemeModel.objects.all()
        category_name = self.request.query_params.get('category')
        if category_name is not None:
            queryset = queryset.filter(category=category_name)
        return queryset

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        meme = self.get_object()
        user = UserModel.objects.get(username=request.data["username"])
        try:
            #if user already in dislikes remove him
            if user in meme.dislikes.all():
                meme.dislikes.remove(user)
                
            #if user already in likes remove him and add him again    
            if user in meme.likes.all():
                meme.likes.remove(user)
                meme.save()
                return Response({'status': status.HTTP_200_OK})
              
            meme.likes.add(user)
            meme.save()
            return Response({'status': status.HTTP_200_OK})
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])        
    def dislike(self, request, pk=None):
        meme = self.get_object()
        user = UserModel.objects.get(username=request.data["username"])
        try:
            #if user already in likes remove him    
            if user in meme.likes.all():
                meme.likes.remove(user)

            #if user already in dislikes remove him and add him again
            if user in meme.dislikes.all():
                meme.dislikes.remove(user)
                meme.save()
                return Response({'status': status.HTTP_200_OK})
             
            meme.dislikes.add(user)
            meme.save()
            return Response({'status': status.HTTP_200_OK})
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)



class CommentView(viewsets.ModelViewSet):
    queryset = CommentModel.objects.all()
    serializer_class = CommentSerializer

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        comment = self.get_object()
        user = UserModel.objects.get(username=request.data["username"])
        try:
            #if user already in dislikes remove him
            if user in comment.dislikes.all():
                comment.dislikes.remove(user)
                
            #if user already in likes remove him and add him again    
            if user in comment.likes.all():
                comment.likes.remove(user)
                comment.save()
                return Response({'status': status.HTTP_200_OK})
              
            comment.likes.add(user)
            comment.save()
            return Response({'status': status.HTTP_200_OK})
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])        
    def dislike(self, request, pk=None):
        comment = self.get_object()
        user = UserModel.objects.get(username=request.data["username"])
        try:
            #if user already in likes remove him    
            if user in comment.likes.all():
                comment.likes.remove(user)

            #if user already in dislikes remove him and add him again
            if user in comment.dislikes.all():
                comment.dislikes.remove(user)
                comment.save()
                return Response({'status': status.HTTP_200_OK})
             
            comment.dislikes.add(user)
            comment.save()
            return Response({'status': status.HTTP_200_OK})
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.
    """
    queryset = UserModel.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class CategoryView(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = CategoryModel.objects.all()
    serializer_class = CategorySerializer
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]