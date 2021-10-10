from __future__ import absolute_import, unicode_literals
from celery import shared_task
from datetime import datetime


@shared_task(name="generate_maps")
def generate_maps():
    pass
# todo create generation puppeteer code
