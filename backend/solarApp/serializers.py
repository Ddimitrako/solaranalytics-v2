from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CustomUser
from djstripe.models import Product, Price
from django.conf import settings
import stripe
from djstripe.models import Customer

stripe.api_key = settings.STRIPE_TEST_SECRET_KEY
class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'password1', 'password2', 'email']

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("Passwords must match.")
        return data

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password1']
        )

        # Create Stripe Customer
        stripe_customer = stripe.Customer.create(email=validated_data['email'])

        # Create dj-stripe Customer
        djstripe_customer = Customer.sync_from_stripe_data(stripe_customer)

        # Link dj-stripe Customer to User
        user.customer = djstripe_customer
        user.save()

        return user

class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Price  # Replace with your actual Price model
        fields = ['id', 'unit_amount']  # Include the fields you want from the Price model

class ProductSerializer(serializers.ModelSerializer):
    prices = PriceSerializer(many=True, read_only=True)

    class Meta:
        model = Product  # Replace with your actual Product model
        fields = ['id', 'name', 'description', 'prices']

