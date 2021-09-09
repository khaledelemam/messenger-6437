from django.contrib.auth.middleware import get_user
from django.http import HttpResponse, JsonResponse
from messenger_backend.models import Conversation, Message
from rest_framework.views import APIView


class ReadMessages(APIView):
    """ expects {recipientId, conversationId , userId} in body """

    def put(self, request):
        try:
            user = get_user(request)

            if user.is_anonymous :
                return HttpResponse(status=401)

            body = request.data
            conversation_id = body.get("conversationId")
            recipient_id = body.get("recipientId")

            conv = Conversation.find_conversation(user.id, recipient_id)
            if conv is None:
                return JsonResponse({"id" : recipient_id})

           # only search database if the conversation exists to save time
            if conversation_id:
                messages = Message.objects.filter(conversation = conv)
                # make sure that the user who opened the chat is the recipient
                messages.exclude(senderId = user.id).update(isRead = True)


            return JsonResponse({"id" : recipient_id})
        except Exception as e:
            return HttpResponse(status=500)
