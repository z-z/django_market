from django.contrib import admin
from django.forms import ModelForm

from catalog.models import Category

class CategoryAdminForm(ModelForm):
	class Meta:
		model = Category
		fields = '__all__'

	def __init__(self, *args, **kwargs):
		super(CategoryAdminForm, self).__init__(*args, **kwargs)

		categories = Category.objects.exclude(id=self.instance.id)
		choices    = [(u'', u'---------')]

		def fill_choises(ch, level=0):
			for choise in ch:
				choice_name = '{0} {1}'.format('-' * level, choise.name)
				choices.append((choise.id, choice_name))
				children = categories.filter(parent=choise.id)
				if(children):
					fill_choises(children, level+1)

		filtered_choices = [ch for ch in categories if ch.parent is None]

		fill_choises(filtered_choices)

		self.fields['parent'].choices = choices


class CategoryAdmin(admin.ModelAdmin):
	form = CategoryAdminForm

	list_filter = ('parent',)

admin.site.register(Category, CategoryAdmin)