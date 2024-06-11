import pandas as pd
from geopy.distance import distance
from geopy.geocoders import Nominatim
from geopy.geocoders import GoogleV3
#geolocator = Nominatim(user_agent="geoapiExercises")
geolocator=GoogleV3(api_key='AIzaSyDIV99R-fZTaw2rP5T6kz9uMWirsokoFkI')
def nearby(user_location):
    location = geolocator.reverse(str(user_location[0])+","+str(user_location[1]))
    address=location.raw['address_components']
    city = None
    for component in address:
        if 'locality' in component['types']:
            city = component['long_name']
            break
    city=city.upper()
    print('city is--> ',city)
    '''print('address is--->  ',address)
    if 'village' in address:
        city=address['village']
        city=city.upper()
        print('city is---> ',city)
    else:
        city=address['city']
        city=city.upper()
        print('city is---> ',city)'''
    df=pd.read_csv('SalesData_WithAddress_April2024_Updated (1).csv')
    
    arr=df[df['CITY']==city][['LAT','LONGITUDE']].dropna().values.tolist()
    
    res=[]
    for i in arr:
        if distance(i,user_location).km<=1  :
            
                
            res.append(i)
    
    ans=[]
    if res:
       for i in res:
            d={
              'lat':i[0],
              'lng':i[1]
            }
            ans.append(d)
    return ans
#print(nearby((35.252183,-79.2816681)))