from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import ChatGroup, GroupMessage
from .forms import ChatmessageCreateForm
@login_required
def chat_view(request):
    chat_group = get_object_or_404(ChatGroup, group_name="newchat")
    chat_messages = chat_group.chat_messages.all()[:30]
    form = ChatmessageCreateForm()

    if request.method == 'POST':
        form = ChatmessageCreateForm(request.POST)
        if form.is_valid():
            message = form.save(commit=False)
            message.author = request.user  # Add this line
            message.group = chat_group
            message.save()
            context = {
                'message': message,
                'user': request.user  # Add this line
            }
            return render(request, 'a_rtchat/partials/chat_message_p.html', context)

    return render(request, 'a_rtchat/chat.html', {'chat_messages': chat_messages, 'form': form, 'user': request.user})  # Add 'user' to the context
