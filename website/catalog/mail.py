from django.core.mail import send_mail
import os


def send_custom_mail(subject, message, to_email):
    from_email = os.getenv('EMAIL_HOST_USER', 'style-maps@yandex.ru')

    send_mail(
        subject,
        message,
        from_email,
        [to_email],
        fail_silently=False,
    )


def send_mail_view(request):
    subject = request.GET.get('subject', 0)
    message = request.GET.get('message', 0)
    to_email = request.GET.get('to_email', 0)

    send_custom_mail(subject, message, to_email)
