import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from .models import Message, Channel


class ChatConsumer(WebsocketConsumer):
    def fetch_messages(self, data):
        try:
            messages = Channel.objects.get(name=data['channelname']).messages.all()[::-1]
        except:
            messages = Message.objects.get_last_30_messages()
        content = {"command": "messages", "messages": self.messages_to_json(messages)}
        self.send_message(content)

    def new_message(self, data):
        try:
            channel = Channel.objects.get(name=data['channel'])
            message = Message.objects.create(author=data["from"], content=data["message"], channel=channel)
        except:
            #print(data['channel'])
            #channel = Channel.objects.create(name=data["channel"])
            message = Message.objects.create(author=data["from"], content=data["message"])


        content = {"command": "new_message", "message": self.message_to_json(message)}
        return self.send_chat_message(content)

    def messages_to_json(self, messages):
        return [self.message_to_json(message) for message in messages]

    def message_to_json(self, message):
        return {
            "id": message.id,
            "author": message.author,
            "content": message.content,
            "timestamp": str(message.timestamp),
        }

    commands = {"fetch_messages": fetch_messages, "new_message": new_message}

    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "chat_%s" % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data["command"]](self, data)

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat_message", "message": message}
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def chat_message(self, event):
        message = event["message"]
        self.send(text_data=json.dumps(message))
