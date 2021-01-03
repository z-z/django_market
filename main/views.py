from django.shortcuts import render
from django.http import HttpResponse
from catalog.models import Category

import json

# Create your views here.
def index(request):
	return render(request, 'index.html')