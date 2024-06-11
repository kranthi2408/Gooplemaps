from flask import Flask,jsonify,request
from flask_cors import CORS
from main import nearby
app=Flask(__name__)
CORS(app)

@app.route('/',methods=['POST'])
def hello():
    if request.method=='POST':
        data=request.get_json()
        lat=data['lat']
        lng=data['lng']
        print('data is--> ',data)
        arr=nearby((lat,lng))
        print('arr is--> ',arr)
        return jsonify(arr)

if __name__=='__main__':
    app.run(debug=True)