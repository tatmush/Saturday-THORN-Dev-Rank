from django.shortcuts import render

# Create your views here.

def host_event(request):
    return render(request, 'events/hostAhackathon.html')