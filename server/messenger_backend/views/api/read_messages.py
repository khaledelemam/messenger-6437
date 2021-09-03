from django.contrib.auth.middleware import get_user
from django.http import HttpResponse, JsonResponse
from messenger_backend.models import Conversation, Message
from online_users import online_users
from rest_framework.views import APIView


class ReadMessages(APIView):
    """ expects {recipientId, conversationId , userId} in body """

    def put(self, request):
        try:
            user = get_user(request)

            if user.is_anonymous:
                return HttpResponse(status=401)

            body = request.data
            conversation_id = body.get("conversationId")
            recipient_id = body.get("recipientId")
            sender_id = body.get("userId")
           
           # only search database if the conversation exists to save time
            if conversation_id:
                conv = Conversation.find_conversation(sender_id, recipient_id)
                messages = Message.objects.filter(conversation = conv)
                for message in messages:
                    # make sure that the user who opened the chat is the recipient
                    if message.senderId != sender_id:
                        message.isRead = True
                        message.save()


            return JsonResponse({"id" : recipient_id})
        except Exception as e:
            return HttpResponse(status=500)
