from django.db import models
from pytils.translit import slugify

class Category(models.Model):
	name   = models.CharField(max_length=255)
	code   = models.SlugField(blank=True)
	parent = models.ForeignKey(
		'self',
		on_delete=models.SET_NULL,
		related_name='children',
		blank=True,
		null=True
	)

	def save(self, *args, **kwargs):
		self.code = slugify(self.name)
		super().save(*args, **kwargs)

	def __str__(self):
		return '%s' % (self.name)