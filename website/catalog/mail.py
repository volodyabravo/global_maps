from django.core.mail import send_mail


def send_mail_view(request):
    subject = request.GET.get('subject', 0)
    message = request.GET.get('message', 0)
    from_email = request.GET.get('from_email', 0)
    to_email = request.GET.get('to_email', 0)

    send_mail(
        subject,
        message,
        from_email,
        [to_email],
        fail_silently=False,
    )
