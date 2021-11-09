from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializers

# Create your views here.


@api_view(["GET"])
def get_routes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },

    ]
    return Response(routes)


@api_view(["GET"])
def get_notes(request):
    notes = Note.objects.all()
    serializer = NoteSerializers(notes, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_note(request, pk):
    notes = Note.objects.get(id=pk)
    serializer = NoteSerializers(notes, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
def update_note(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializers(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)