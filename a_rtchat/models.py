from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
from django.contrib.sessions.models import Session

# ChatGroup model
class ChatGroup(models.Model):
    group_name = models.CharField(max_length=128, unique=True)

    def __str__(self):
        return self.group_name

# GroupMessage model
class GroupMessage(models.Model):
    group = models.ForeignKey(ChatGroup, related_name='chat_messages', on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.CharField(max_length=300)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.author.username}: {self.body}'

    class Meta:
        ordering = ['-created']

# Model to track online users (using session)
class OnlineUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    last_seen = models.DateTimeField(auto_now=True)
    is_online = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {'Online' if self.is_online else 'Offline'}"

    def update_status(self, status: bool):
        self.is_online = status
        self.save()

# Custom session manager for tracking active users
class ActiveSession(models.Model):
    session_key = models.CharField(max_length=40, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    last_activity = models.DateTimeField(default=now)

    def __str__(self):
        return f"Session for {self.user.username}"

    @classmethod
    def get_online_user_count(cls):
        # Get count of active sessions
        return cls.objects.filter(last_activity__gte=now()).count()
