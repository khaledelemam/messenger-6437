from . import utils
from .conversation import Conversation
from .user import User
from django.db import models


class Membership(utils.CustomModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    date_joined = models.DateField()