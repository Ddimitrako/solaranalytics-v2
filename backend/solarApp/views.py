
import stripe
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer, ProductSerializer

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import NotAuthenticated
from rest_framework.permissions import IsAuthenticated

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from django.conf import settings
from djstripe.models import Product, Price
import requests

GOOGLE_API_KEY = settings.GOOGLE_API_KEY
from .buildingInsightsExample import buildingInsightsExample
import os
stripe.api_key = settings.STRIPE_TEST_SECRET_KEY
DOMAIN_NAME =settings.DOMAIN_NAME
@api_view(['GET'])
def test_endpoint(request):
    return Response({"message": "This is a test endpoint!"})

class UserRegistrationAPIView(APIView):
    @swagger_auto_schema(
        request_body=UserRegistrationSerializer

    )
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginAPIView(APIView):

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING, description='Username'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='Password')
            }
        )
    )
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout_api(request):
    # Check if the user is authenticated
    if request.user.is_authenticated:
        # Check if the user has a token
        if hasattr(request.user, 'auth_token'):
            request.user.auth_token.delete()
            return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "No token to logout"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        raise NotAuthenticated("Authentication credentials were not provided")


#The below endpoint query the Product created in the Stripe portal
class CheckoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # products = Product.objects.all()
        products = Product.objects.all().prefetch_related('prices')

        for product in products:
            print(f"Product Name: {product.name}, Description: {product.description}")
            for price in product.prices.all():
                print(f"Price: {price.unit_amount}")
        serializer = ProductSerializer(products, many=True)
        return Response({
            "products": serializer.data,
            "STRIPE_PUBLIC_KEY": settings.STRIPE_TEST_PUBLIC_KEY
        }, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_checkout_session(request):

    try:

        session = stripe.checkout.Session.create(
            ui_mode='embedded',
            line_items=[
                {
                    'price': request.data.get('price_id', 'price_1OHqYbGx9FF6Jx6unSgDOyDG'),
                    'quantity': 1,
                },
            ],
            mode='payment',
            return_url=DOMAIN_NAME + '/return?session_id={CHECKOUT_SESSION_ID}',
            automatic_tax={'enabled': True},
        )
    except Exception as e:
        return Response({'error': str(e)}, status=400)

    return Response({'clientSecret': session.client_secret})

@api_view(['GET'])
def session_status(request):
    session_id = request.query_params.get('session_id')
    if not session_id:
        return Response({'error': 'Session ID is required'}, status=400)

    session = stripe.checkout.Session.retrieve(session_id)
    return Response({'status': session.status, 'customer_email': session.customer_details.email})



@api_view(['GET'])
@swagger_auto_schema(
    operation_description="Get Building Insights",
    manual_parameters=[
        openapi.Parameter('latitude', in_=openapi.IN_QUERY, description="Latitude", type=openapi.TYPE_STRING),
        openapi.Parameter('longitude', in_=openapi.IN_QUERY, description="Longitude", type=openapi.TYPE_STRING),
    ],
    responses={200: openapi.Response('Response', openapi.Schema(
        type=openapi.TYPE_OBJECT,  # Change this if you know the response structure
    ))}
)

def getBuildingInsights(request):

    lat = request.query_params.get('latitude')
    lon = request.query_params.get('longitude')
    url = f"https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude={lat}&location.longitude={lon}8&requiredQuality=HIGH&key={GOOGLE_API_KEY}"

    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    if response.status_code != 200:
        return Response(response.json(), status=response.status_code)

    return Response(response.json())

def annualProduction(dcToAcDerate,initialAcKwhPerYear, efficiencyDepreciationFactor, year):
    """
    Calculate the annual production of an energy system given the initial production,
    an annual efficiency depreciation factor, and the year since installation.

    :param initialAcKwhPerYear: Initial annual AC production in kWh.
    :param efficiencyDepreciationFactor: The yearly percentage decrease in efficiency.
    :param year: The year since installation.
    :return: The estimated annual production for the given year.
    """
    return dcToAcDerate *initialAcKwhPerYear * ((1 - efficiencyDepreciationFactor) ** year)

def LifetimeProductionAcKwhFunc(
        dcToAcDerate,
        yearlyEnergyDcKwh,
        efficiencyDepreciationFactor,
        installationLifeSpan):
    return (
            dcToAcDerate *
            yearlyEnergyDcKwh *
            (1 - pow(
                efficiencyDepreciationFactor,
                installationLifeSpan)) /
            (1 - efficiencyDepreciationFactor))

def billCostModel(kwh):
    return kwh*0,17900

def annualUtilityBillEstimate(yearlyKWhEnergyConsumption,
    initialAcKwhPerYear,efficiencyDepreciationFactor,
    year, costIncreaseFactor,discountRate):
    annualProductionResult = annualProduction(dcToAcDerate,initialAcKwhPerYear, efficiencyDepreciationFactor, year)
    result = billCostModel(yearlyKWhEnergyConsumption - annualProductionResult) * pow(costIncreaseFactor, year) /  pow(discountRate, year)
    return result

def lifetimeUtilityBill(
    yearlyKWhEnergyConsumption,
    initialAcKwhPerYear,
    efficiencyDepreciationFactor,
    installationLifeSpan,
    costIncreaseFactor,
    discountRate):
  bill = [0] * installationLifeSpan # is creating a list called bill with a length equal to installationLifeSpan and value of 0
  for year in range(installationLifeSpan):
    bill[year] = annualUtilityBillEstimate(
      yearlyKWhEnergyConsumption,
      initialAcKwhPerYear,
      efficiencyDepreciationFactor,
      year,
      costIncreaseFactor,
      discountRate)
  return bill

def lifetimeBillWithoutPV(monthlyBill,costIncreaseFactor,discountRate,installationLifeSpan):
    return  (
    monthlyBill * 12 *
    (1 - pow(costIncreaseFactor / discountRate, installationLifeSpan)) /
    (1 - costIncreaseFactor / discountRate))
@api_view(['GET'])
def calculatePVprofit(request):
    panelsCount = 0
    yearlyEnergyDcKwh = 8284.498 #

    billCostModel = 0.17900           # billCostModel(): Your model for determining the cost, in local currency, paid by a household for using a given number of kWh.
    costIncreaseFactor = 1.022  # The factor by which the cost of electricity increases annually.
    dcToAcDerate = 0.85         #convertion rate
    discountRate= 1.04          #(4 % annual increase) for US locations.
    efficiencyDepreciationFactor= 0.995 #(0.5% annual decrease) for US locations #How much the efficiency of the solar panels declines each year.
    incentives = 0              #Include any monetary incentives to install solar panels given by government entities in your area.
    installationCostModel = 0   # Your method for estimating the cost of installing solar in local currency for a given installationSize.
    installationLifeSpan = 20   # the solar api uses 20 years
    # kWhConsumptionModelval = 2400       #Annualy consumption return of kWhConsumptionModel
    monthlyBill = 200*billCostModel
    monthlyKWhEnergyConsumption = 200

    ##calculations for 20 panels EQ 5KW potentila
    # "panelsCount": 20,
    # "yearlyEnergyDcKwh": 8284.498,
    # TODO step 1 find the yearly kwh consumption
    yearlyKWhEnergyConsumption= 2400

    #TODO step 2
    annualKWhEnergyConsumption = monthlyKWhEnergyConsumption * 12

    # TODO step 3 Calculate the annual solar energy AC production
    initialAcKwhPerYear = yearlyEnergyDcKwh * dcToAcDerate

    ## TODO step 4
    #pass

    #TODO step 5 Calculate  the lifetime solar energy production
    LifetimeProductionAcKwh = LifetimeProductionAcKwhFunc(dcToAcDerate,yearlyEnergyDcKwh,efficiencyDepreciationFactor,installationLifeSpan)
    print(f"lifetime Production in Kwh: {LifetimeProductionAcKwh} KWH")

    # TODO step Calculate  the lifetime Utility Bill
    lifetimeUtilityBillresult =lifetimeBillWithoutPV(monthlyBill,costIncreaseFactor,discountRate,installationLifeSpan)
    print(f"lifetime Utility Bill for {installationLifeSpan} years: {lifetimeUtilityBillresult} Euros")

    # TODO step  Calculate  Installation Cost
    installationCost = 10000 #localInstallationCostModel(installationSize)

    # lifetimeUtilityBillresult =lifetimeUtilityBill(
    # yearlyKWhEnergyConsumption,
    # initialAcKwhPerYear,
    # efficiencyDepreciationFactor,
    # installationLifeSpan,
    # costIncreaseFactor,
    # discountRate)
    # print(lifetimeUtilityBillresult)
    return Response({'LifetimeProductionAcKwh':LifetimeProductionAcKwh }, status=200)