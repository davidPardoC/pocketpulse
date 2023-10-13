from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Category, Expense


class CategoryModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class CategorySerializer(serializers.Serializer):
    name = serializers.CharField(min_length=2, max_length=100)

    def create(self, validated_data):
        user = self.context.get('request').user
        category = Category.objects.create(**validated_data, created_by=user)
        return category


class ExpenseModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'


class CreateExpenseSerializer(serializers.Serializer):
    amount = serializers.FloatField(min_value=0.0)
    name = serializers.CharField(min_length=2, max_length=100)
    category = serializers.IntegerField()

    def validate(self, attrs):
        category = Category.objects.get(pk=attrs['category'])
        user = self.context.get('request').user
        attrs['category'] = category
        attrs['created_by'] = user
        return attrs

    def create(self, validated_data):
        expense = Expense.objects.create(**validated_data)
        return expense


class UpdateExpenseSerializer(serializers.Serializer):
    amount = serializers.FloatField(min_value=0.0)
    name = serializers.CharField(min_length=2, max_length=100)
    category = serializers.IntegerField()

    def validate(self, attrs):
        category = Category.objects.get(pk=attrs['category'])
        attrs['category'] = category
        return attrs

    def create(self, validated_data):
        expense = Expense.objects.create(**validated_data)
        return expense
